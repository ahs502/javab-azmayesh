var express = require('express');
var router = module.exports = express.Router();

var src = require("../src"),
    kfs = src.kfs;

var https = require('https');
var querystring = require('querystring');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('0123456789InTheNameOfGod9876543210');

////////////////////////////////////////////////////////////////////////////////

var confirmationExpiresAfter = 10; // Hours
var accessKeyExpiresAfter = 20; // Hours

////////////////////////////////////////////////////////////////////////////////

router.post('/register', function(req, res, next) {
    var userData = req.body.userData;
    var username = userData.username;
    var recaptcha = req.body.recaptcha;
    var remoteIp = req.ip; //req.headers['x-real-ip'] || req.connection.remoteAddress; //TODO: It works with Nginx, how about no proxy mode ?
    var dataVerify = {
        secret: '6LexDAwUAAAAAP7U7z8YEIcI006D8KGajx3WtR31',
        response: recaptcha,
        remoteip: remoteIp
    };
    var postDataVerify = querystring.stringify(dataVerify);
    var options = {
        hostname: 'www.google.com',
        port: 443,
        path: '/recaptcha/api/siteverify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postDataVerify.length
        }
    };
    var requestVerify = https.request(options, function(responseVerify) {
        if (responseVerify.statusCode != 200) {
            return resEndByCode(res, 5);
        }
        responseVerify.setEncoding('utf8');
        var resultVerify = '';
        responseVerify.on('data', function(chunk) {
            resultVerify += chunk;
        });
        responseVerify.on('end', function() {
            resultVerify = JSON.parse(resultVerify);
            if (resultVerify.success !== true) {
                return resEndByCode(res, 11);
            }

            //TODO: Validate user data ...

            var user = userData; //TODO: Extract user from userData ...

            ('user/' + username) in kfs(function(err, exists) {
                if (err) {
                    console.error(err);
                    return resEndByCode(res, 5);
                }
                if (exists) {
                    return resEndByCode(res, 10);
                }
                var validationCode = '123456'; //TODO: Generate a simple validation code ...
                kfs('/user/_confirming_/' + username, {
                    user,
                    validationCode,
                    timeStamp: new Date()
                }, function(err) {
                    if (err) {
                        console.error(err);
                        return resEndByCode(res, 5);
                    }
                    //TODO: Send verificationCode by SMS ...
                    resEndByCode(res, 0);
                });
            });

        });
        responseVerify.on('error', function(err) {
            console.log('reCAPTCHA Response Error: ' + JSON.stringify(err, null, 4));
            return resEndByCode(res, 5);
        });
    });
    requestVerify.on('error', function(err) {
        console.log('reCAPTCHA Request Error: ' + JSON.stringify(err, null, 4));
        return resEndByCode(res, 5);
    });
    requestVerify.write(postDataVerify);
    requestVerify.end();
});

////////////////////////////////////////////////////////////////////////////////

router.post('/register/confirm', function(req, res, next) {
    var username = req.body.username;
    var validationCode = req.body.validationCode;
    kfs('/user/_confirming_/' + username, function(err, data) {
        if (err) {
            console.error(err);
            return resEndByCode(res, 5);
        }
        if (!data) {
            return resEndByCode(res, 30);
        }
        if (data.timaStamp > new Date((new Date).setHours((new Date).getHours() + confirmationExpiresAfter))) {
            return resEndByCode(res, 31);
        }
        if (validationCode != data.validationCode) {
            return resEndByCode(res, 32);
        }
        //TODO: Instead of registering the user (below code), add it to the MustBeManuallyVerified list ...
        kfs('user/' + username, data.user, function(err) {
            if (err) {
                console.error(err);
                return resEndByCode(res, 5);
            }
            resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return resEndByCode(res, 5);
        }
        if (!user) {
            return resEndByCode(res, 40);
        }
        if (user.password != password) {
            return resEndByCode(res, 40);
        }
        var remoteIp = req.ip;
        var accessKey = generateAccessKey(user, remoteIp);
        resEndByCode(res, 0, {
            accessKey,
            userInfo: {
                username: user.username,
                //...
            }
        });
    });
});

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

function resEndByCode(res, code, data) {
    data = data || {};
    data.code = code;
    return res.status(200).json(data).end();
}
