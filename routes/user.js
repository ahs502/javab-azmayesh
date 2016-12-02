var express = require('express');
var router = module.exports = express.Router();

var src = require("../src"),
    kfs = src.kfs,
    access = src.access;

var https = require('https');
var querystring = require('querystring');

////////////////////////////////////////////////////////////////////////////////

var confirmationExpiresAfter = 10; // Hours

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
        var accessKey = access.generateAccessKey(user, remoteIp);
        resEndByCode(res, 0, {
            accessKey,
            userInfo: getUserInfo(user)
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/refresh', function(req, res, next) {
    var userInfo = decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return resEndByCode(res, 5);
        }
        if (!user) {
            return resEndByCode(res, 51);
        }
        resEndByCode(res, 0, {
            userInfo: getUserInfo(user)
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/edit/:action', function(req, res, next) {
    var userInfo = decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    var action = req.params.action;
    console.log(req.params)
    if (action !== 'account' && action !== 'password') {
        return next();
    }
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return resEndByCode(res, 5);
        }
        if (!user) {
            return resEndByCode(res, 51);
        }
        var newUser;
        if (action === 'account') {
            newUser = req.body.newAccount;
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.passwordAgain = user.passwordAgain;
            newUser.acceptRules = user.acceptRules;
        }
        else if (action === 'password') {
            var oldPassword = req.body.oldPassword,
                newPassword = req.body.newPassword;
            if (oldPassword !== user.password) {
                return resEndByCode(res, 40);
            }
            newUser = user;
            newUser.password = newUser.passwordAgain = newPassword;
        }
        var validationCode = '123456'; //TODO: Generate a simple validation code ...
        kfs('user/_confirming_/' + username, {
            user: newUser,
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

////////////////////////////////////////////////////////////////////////////////

router.post('/edit/confirm', function(req, res, next) {
    var userInfo = decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    if (username !== req.body.username) {
        return resEndByCode(res, 50);
    }
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
        kfs('user/' + username, data.user, function(err) {
            if (err) {
                console.error(err);
                return resEndByCode(res, 5);
            }
            resEndByCode(res, 0, {
                userInfo: getUserInfo(data.user)
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

function resEndByCode(res, code, data) {
    data = data || {};
    data.code = code;
    return res.status(200).json(data).end();
}

function decodeUserInfo(req, res) {
    var accessData = access.decodeRequest(req);
    if (accessData.invalid) {
        resEndByCode(res, 100);
        return null;
    }
    if (accessData.expired) {
        resEndByCode(res, 101);
        return null;
    }
    var userInfo = accessData.userInfo;
    if (!userInfo) {
        resEndByCode(res, 50);
        return null;
    }
    return userInfo;
}

function getUserInfo(user) {
    return {
        username: user.username,
        labName: user.labName,
        mobilePhoneNumber: user.mobilePhoneNumber,
        phoneNumber: user.phoneNumber,
        address: user.address,
        postalCode: user.postalCode,
        websiteAddress: user.websiteAddress,
    };
}
