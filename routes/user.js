/*global Validator*/
/*global ValidationSystem*/

var express = require('express');
var router = module.exports = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms,
    statistics = src.statistics;

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

    user.username = user.username.toLowerCase();
    user.mobilePhoneNumber = String(user.mobilePhoneNumber).toPhoneNumber();
    user.phoneNumber = String(user.phoneNumber).toPhoneNumber();

    function registerUser() {
        var username = user.username;
        Promise.all([
            (('user/active/' + username) in kfs(), kfs()),
            (('user/inactive/' + username) in kfs(), kfs()),
        ]).then(function(exists) {
            if (exists[0] || exists[1]) {
                return utils.resEndByCode(res, 10);
            }
            var validationCode = utils.generateRandomCode(4);
            var userConfirmingKey = 'user/confirming/' + username;
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
        }, function(err) {
            console.error(err);
            utils.resEndByCode(res, 5);
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
    var username = String(req.body.username || '').toLowerCase();
    var validationCode = req.body.validationCode;
    kfs('user/confirming/' + username, function(err, data) {
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
        utils.generateId('user').then(function(userId) {
            data.user.id = userId;
            data.user.balance = 0;
            data.user.userType = "laboratory";
            data.user.timeStamp = Date.now();
            kfs('user/inactive/' + username, data.user, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                new kfs('user/confirming/' + username, function(err) {
                    if (err) {
                        console.error(err);
                        return utils.resEndByCode(res, 5);
                    }
                    utils.resEndByCode(res, 0);
                    statistics.dailyCount('userRegister');
                });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/login', function(req, res, next) {
    var username = String(req.body.username || '').toLowerCase();
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    kfs('user/active/' + username, function(err, user) {
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
        var accessKey = access.generateUserAccessKey(user, remoteIp, rememberMe);
        var userInfo = getUserInfo(user);
        utils.resEndByCode(res, 0, {
            accessKey,
            userInfo
        });
        if (userInfo.userType === 'administrator') {
            statistics.dailyCount('adminLogin');
        }
        else {
            statistics.dailyCount('userLogin');
        }
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/refresh', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    kfs('user/active/' + username, function(err, user) {
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
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var action = req.params.action;
    if (action !== 'account' && action !== 'password') {
        return next();
    }
    kfs('user/active/' + username, function(err, user) {
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
            newUser.username = user.username.toLowerCase();
            newUser.password = user.password;
            newUser.balance = user.balance;
            newUser.userType = user.userType;
            newUser.timeStamp = user.timeStamp;
        }
        else if (action === 'password') {
            var oldPassword = req.body.oldPassword;
            var newPassword = req.body.newPassword;

            var newPasswordValidator = new Validator()
                .field('newPassword', newPassword, [
                    ValidationSystem.validators.notEmpty(),
                    ValidationSystem.validators.minLength(4),
                ]);
            if (!newPasswordValidator.isValid()) {
                return utils.resEndByCode(res, 80, {
                    errors: newPasswordValidator.getErrors()
                });
            }

            if (oldPassword !== user.password) {
                return utils.resEndByCode(res, 40);
            }
            newUser = user;
            newUser.password = newPassword;
        }
        sms.allowanceCheck(newUser.mobilePhoneNumber, 'vericodeusrupd').then(function() {
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
        }, function() {
            utils.resEndByCode(res, 120);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/edit/confirm', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    if (username !== String(req.body.username || '').toLowerCase()) {
        return utils.resEndByCode(res, 50);
    }
    var validationCode = req.body.validationCode;
    kfs('user/confirming/' + username, function(err, data) {
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
        kfs('user/active/' + username, data.user, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            new kfs('user/confirming/' + username, function(err) {
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
});

////////////////////////////////////////////////////////////////////////////////

router.post('/restorePassword', function(req, res, next) {
    var username = String(req.body.username || '').toLowerCase();
    var mobilePhoneNumber = String(req.body.mobilePhoneNumber).toPhoneNumber();
    sms.allowanceCheck(mobilePhoneNumber, 'passrecovery').then(function() {
        var userKey = '/user/active/' + username;
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
            statistics.dailyCount('userRestorePassword');
        });
    }, function() {
        utils.resEndByCode(res, 120);
    });
});

////////////////////////////////////////////////////////////////////////////////

function getUserInfo(user) {
    if (user.userType === 'laboratory') {
        return {
            userType: user.userType,
            username: user.username,
            labName: user.labName,
            mobilePhoneNumber: user.mobilePhoneNumber,
            phoneNumber: user.phoneNumber,
            address: user.address,
            postalCode: user.postalCode,
            websiteAddress: user.websiteAddress,
            balance: user.balance,
            timeStamp: user.timeStamp,
        };
    }
    else if (user.userType === 'administrator') {
        return {
            userType: user.userType,
            username: user.username,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            accessLevel: user.accessLevel,
        };
    }
    return {};
}
