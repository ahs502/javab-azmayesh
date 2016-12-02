var Cryptr = require('cryptr'),
    cryptr = new Cryptr('0123456789InTheNameOfGod9876543210');

////////////////////////////////////////////////////////////////////////////////

var accessKeyExpiresAfter = 20; // Hours

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    generateAccessKey,
    decodeAccessKey,
    decodeRequest,
};

////////////////////////////////////////////////////////////////////////////////

function generateAccessKey(user, remoteIp) {
    var accessKeyData = {
        expiresAt: Date.now() + accessKeyExpiresAfter * 60 * 60 * 1000,
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
