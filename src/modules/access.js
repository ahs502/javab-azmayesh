var config = require("../../config");

var utils = require("./utils");

var Cryptr = require('cryptr'),
    cryptr = new Cryptr(config.cryptr_key);

////////////////////////////////////////////////////////////////////////////////

module.exports = {

    generateUserAccessKey,
    decodeUserAccessKey,
    decodeUserRequest,
    decodeUserInfo,

    // generatePatientAccessKey,
    // decodePatientAccessKey,
    // decodePatientRequest,
    // decodePatientInfo,

};

////////////////////////////////////////////////////////////////////////////////

function generateUserAccessKey(user, remoteIp) {
    var accessKeyData = {
        expiresAt: Date.now() + config.user_access_key_expires_after * 60 * 60 * 1000,
        userInfo: {
            username: user.username,
            userType: user.userType,
            labName: user.labName, // for laboratory type users only
            fullName: user.fullName, // for administrator type users only
            //...
        },
        remoteIp
    };
    return cryptr.encrypt(JSON.stringify(accessKeyData));
}

function decodeUserAccessKey(accessKey, remoteIp) {
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

function decodeUserRequest(req) {
    var accessKey = ((req || {}).headers || {})['x-access-token'];
    var remoteIp = req.ip;
    return decodeUserAccessKey(accessKey, remoteIp);
}

function decodeUserInfo(req, res, expectedUserType) {
    var accessData = decodeUserRequest(req);
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
    if (expectedUserType && userInfo.userType !== expectedUserType) {
        utils.resEndByCode(res, 52);
        return null;
    }
    return userInfo;
}

////////////////////////////////////////////////////////////////////////////////

// function generatePatientAccessKey(patient, remoteIp) {
//     var accessKeyData = {
//         expiresAt: Date.now() + config.patient_access_key_expires_after * 60 * 60 * 1000,
//         patientInfo: {
//             nationalCode: patient.nationalCode,
//             //...
//         },
//         remoteIp
//     };
//     return cryptr.encrypt(JSON.stringify(accessKeyData));
// }

// function decodePatientAccessKey(accessKey, remoteIp) {
//     try {
//         var accessKeyData = JSON.parse(cryptr.decrypt(accessKey));
//         if (!accessKeyData || accessKeyData.remoteIp != remoteIp) throw 'Invalid access key.';
//         return {
//             invalid: false,
//             expired: Date.now() > accessKeyData.expiresAt,
//             patientInfo: accessKeyData.patientInfo
//         };
//     }
//     catch (err) {
//         return {
//             invalid: true
//         };
//     }
// }

// function decodePatientRequest(req) {
//     var accessKey = ((req || {}).headers || {})['x-access-token'];
//     var remoteIp = req.ip;
//     return decodePatientAccessKey(accessKey, remoteIp);
// }

// function decodePatientInfo(req, res) {
//     var accessData = decodePatientRequest(req);
//     if (accessData.invalid) {
//         utils.resEndByCode(res, 100);
//         return null;
//     }
//     if (accessData.expired) {
//         utils.resEndByCode(res, 101);
//         return null;
//     }
//     var patientInfo = accessData.patientInfo;
//     if (!patientInfo) {
//         utils.resEndByCode(res, 70);
//         return null;
//     }
//     return patientInfo;
// }
