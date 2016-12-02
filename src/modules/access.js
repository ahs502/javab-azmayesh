var config = require("../../config");

var utils = require("./utils");

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('0123456789InTheNameOfGod9876543210');

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    generateAccessKey,
    decodeAccessKey,
    decodeRequest,
    decodeUserInfo,
};

////////////////////////////////////////////////////////////////////////////////

function generateAccessKey(user, remoteIp) {
    var accessKeyData = {
        expiresAt: Date.now() + config.access_key_expires_after * 60 * 60 * 1000,
        userInfo: {
            username: user.username,
            //...
        },
        remoteIp
    };
    return cryptr.encrypt(JSON.stringify(accessKeyData));
}

function decodeAccessKey(accessKey, remoteIp) {
    try {
        var accessKeyData = JSON.parse(cryptr.decrypt(accessKey));
        if (!accessKeyData || accessKeyData.remoteIp != remoteIp) throw 'Invalid access key.';
        return {
            invalid: false,
            expired: Date.now() > accessKeyData.expiresAt,
            userInfo: accessKeyData.userInfo
        };
    }
    catch (err) {
        return {
            invalid: true
        };
    }
}

function decodeRequest(req) {
    var accessKey = ((req || {}).headers || {})['x-access-token'];
    var remoteIp = req.ip;
    return decodeAccessKey(accessKey, remoteIp);
}

function decodeUserInfo(req, res) {
    var accessData = decodeRequest(req);
    if (accessData.invalid) {
        utils.resEndByCode(res, 100);
        return null;
    }
    if (accessData.expired) {
        utils.resEndByCode(res, 101);
        return null;
    }
    var userInfo = accessData.userInfo;
    if (!userInfo) {
        utils.resEndByCode(res, 50);
        return null;
    }
    return userInfo;
}
