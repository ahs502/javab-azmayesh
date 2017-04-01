/*global Validator*/
/*global ValidationSystem*/

var express = require('express');
var router = module.exports = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms;

var https = require('https');
var querystring = require('querystring');

////////////////////////////////////////////////////////////////////////////////

router.post('/register', function(req, res, next) {
    var userData = req.body.userData || {};
    var user = {
        labName: userData.labName,
        mobilePhoneNumber: userData.mobilePhoneNumber,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        postalCode: userData.postalCode,
        websiteAddress: userData.websiteAddress,
        username: userData.username,
        password: userData.password
    };

    var userValidator = new Validator(user)
        .field('labName', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(5)
        ])
        .field('mobilePhoneNumber', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.mobilePhoneNumber()
        ])
        .field('phoneNumber', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.phoneNumber()
        ])
        .field('address', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(10)
        ])
        .field('postalCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.integer(),
            ValidationSystem.validators.length(10)
        ])
        .field('websiteAddress', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.minLength(5),
            ValidationSystem.validators.url()
        ])
        .field('username', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.username(),
            ValidationSystem.validators.minLength(4)
        ])
        .field('password', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(4)
        ]);
    if (!userValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: userValidator.getErrors()
        });
    }

    user.mobilePhoneNumber = String(user.mobilePhoneNumber).toPhoneNumber();
    user.phoneNumber = String(user.phoneNumber).toPhoneNumber();

    function registerUser() {
        var username = user.username;
        ('user/' + username) in kfs(function(err, exists) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            if (exists) {
                return utils.resEndByCode(res, 10);
            }
            var validationCode = utils.generateRandomCode(4);
            var userConfirmingKey = '/user/confirming/' + username;
            var userConfirmingData = {
                user,
                validationCode,
                timeStamp: Date.now()
            };
            kfs(userConfirmingKey, userConfirmingData, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                sms.send.validationCodeForRegisteration([userConfirmingKey], user, validationCode);
                utils.resEndByCode(res, 0);
            });
        });
    }

    if (!config.google_recaptcha) {
        registerUser();
        return;
    }

    var recaptcha = req.body.recaptcha;
    var remoteIp = req.ip; //req.headers['x-real-ip'] || req.connection.remoteAddress; //TODO: It works with Nginx, how about no proxy mode ?
    var dataVerify = {
        secret: config.google_recaptcha_secret_key,
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
            return utils.resEndByCode(res, 5);
        }
        responseVerify.setEncoding('utf8');
        var resultVerify = '';
        responseVerify.on('data', function(chunk) {
            resultVerify += chunk;
        });
        responseVerify.on('end', function() {
            resultVerify = JSON.parse(resultVerify);
            if (resultVerify.success !== true) {
                return utils.resEndByCode(res, 11);
            }

            registerUser();

        });
        responseVerify.on('error', function(err) {
            console.log('reCAPTCHA Response Error: ' + JSON.stringify(err, null, 4));
            return utils.resEndByCode(res, 5);
        });
    });
    requestVerify.on('error', function(err) {
        console.log('reCAPTCHA Request Error: ' + JSON.stringify(err, null, 4));
        return utils.resEndByCode(res, 5);
    });
    requestVerify.write(postDataVerify);
    requestVerify.end();
});

////////////////////////////////////////////////////////////////////////////////

router.post('/register/confirm', function(req, res, next) {
    var username = req.body.username;
    var validationCode = req.body.validationCode;
    utils.generateId('user').then(function(userId) {
        kfs('/user/confirming/' + username, function(err, data) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            if (!data) {
                return utils.resEndByCode(res, 30);
            }
            if (data.timeStamp > Date.now() + config.confirmation_expires_after * 3600 * 1000) {
                return utils.resEndByCode(res, 31);
            }
            if (validationCode != data.validationCode) {
                return utils.resEndByCode(res, 32);
            }
            data.user.id = userId;
            data.user.timeStamp = Date.now();

            //TODO: Instead of registering the user (below code), add it to the MustBeManuallyVerified list ...
            kfs('user/' + username, data.user, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                utils.resEndByCode(res, 0);
            });

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
            return utils.resEndByCode(res, 5);
        }
        if (!user) {
            return utils.resEndByCode(res, 40);
        }
        if (user.password != password) {
            return utils.resEndByCode(res, 40);
        }
        var remoteIp = req.ip;
        var accessKey = access.generateUserAccessKey(user, remoteIp);
        utils.resEndByCode(res, 0, {
            accessKey,
            userInfo: getUserInfo(user)
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/refresh', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!user) {
            return utils.resEndByCode(res, 51);
        }
        utils.resEndByCode(res, 0, {
            userInfo: getUserInfo(user)
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/edit/:action', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    var action = req.params.action;
    if (action !== 'account' && action !== 'password') {
        return next();
    }
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!user) {
            return utils.resEndByCode(res, 51);
        }
        var newUser;
        if (action === 'account') {
            newUser = req.body.newAccount;

            var newUserValidator = new Validator(newUser)
                .field('labName', [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.minLength(5)
                ])
                .field('mobilePhoneNumber', [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.mobilePhoneNumber()
                ])
                .field('phoneNumber', [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.phoneNumber()
                ])
                .field('address', [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.minLength(10)
                ])
                .field('postalCode', [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.integer(),
                    ValidationSystem.validators.length(10)
                ])
                .field('websiteAddress', [
                    ValidationSystem.validators.notRequired(),
                    ValidationSystem.validators.minLength(5),
                    ValidationSystem.validators.url()
                ]);
            if (!newUserValidator.isValid()) {
                return utils.resEndByCode(res, 80, {
                    errors: newUserValidator.getErrors()
                });
            }

            newUser.mobilePhoneNumber = String(newUser.mobilePhoneNumber).toPhoneNumber();
            newUser.phoneNumber = String(newUser.phoneNumber).toPhoneNumber();
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.timeStamp = user.timeStamp;
        }
        else if (action === 'password') {
            var newPassword = req.body.newPassword;

            var newPasswordValidator = new ValidationSystem()
                .field('newPassword', newPassword, [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.minLength(4),
                ]);
            if (!newPasswordValidator.isValid()) {
                return utils.resEndByCode(res, 80, {
                    errors: newPasswordValidator.getErrors()
                });
            }

            newUser = user;
            newUser.password = newPassword;
        }
        var validationCode = utils.generateRandomCode(4);
        var userConfirmingKey = 'user/confirming/' + username;
        var userConfirmingData = {
            user: newUser,
            validationCode,
            timeStamp: Date.now()
        };
        kfs(userConfirmingKey, userConfirmingData, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            sms.send.validationCodeForUpdatingAccount([userConfirmingKey], newUser, validationCode);
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/edit/confirm', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    if (username !== req.body.username) {
        return utils.resEndByCode(res, 50);
    }
    var validationCode = req.body.validationCode;
    kfs('/user/confirming/' + username, function(err, data) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!data) {
            return utils.resEndByCode(res, 30);
        }
        if (data.timeStamp > Date.now() + config.confirmation_expires_after * 3600 * 1000) {
            return utils.resEndByCode(res, 31);
        }
        if (validationCode != data.validationCode) {
            return utils.resEndByCode(res, 32);
        }

        //TODO: Instead of registering the user (below code), add it to the MustBeManuallyVerified list ...
        kfs('user/' + username, data.user, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0, {
                userInfo: getUserInfo(data.user)
            });
        });

    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/restorePassword', function(req, res, next) {
    var username = req.body.username;
    var mobilePhoneNumber = String(req.body.mobilePhoneNumber).toPhoneNumber();
    var userKey = '/user/' + username;
    kfs(userKey, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!user) {
            return utils.resEndByCode(res, 51);
        }
        if (mobilePhoneNumber != user.mobilePhoneNumber) {
            return utils.resEndByCode(res, 60);
        }
        sms.send.passwordRecovery([userKey], user);
        utils.resEndByCode(res, 0);
    });
});

////////////////////////////////////////////////////////////////////////////////

function getUserInfo(user) {
    return {
        username: user.username,
        labName: user.labName,
        mobilePhoneNumber: user.mobilePhoneNumber,
        phoneNumber: user.phoneNumber,
        address: user.address,
        postalCode: user.postalCode,
        websiteAddress: user.websiteAddress,
        timeStamp: user.timeStamp,
    };
}
