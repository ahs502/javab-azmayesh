var express = require('express');
var router = module.exports = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms,
    statistics = src.statistics;

////////////////////////////////////////////////////////////////////////////////

router.post('/getAllLaboratories', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    kfs('user/', function(err, allUserKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        allUserKeys = allUserKeys.filter(userKey => userKey.slice(0, 16) !== 'user/confirming/');
        Promise.all(allUserKeys.map(userKey => kfs(userKey)))
            .then(function(allUsers) {
                allUsers = allUsers.filter(user => user && user.userType === 'laboratory');
                allUsers.forEach(user => {
                    delete user.password;
                });
                utils.resEndByCode(res, 0, {
                    laboratories: allUsers
                });
            }, function(err) {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/editLaboratory', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labUsername = req.body.labUsername;
    var labData = req.body.labData;
    var userKey = 'user/' + labUsername;
    kfs(userKey, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        user.labName = labData.labName;
        user.mobilePhoneNumber = labData.mobilePhoneNumber;
        user.phoneNumber = labData.phoneNumber;
        user.address = labData.address;
        user.postalCode = labData.postalCode;
        user.websiteAddress = labData.websiteAddress;
        user.balance = labData.balance;
        kfs(userKey, user, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/removeLaboratory', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labUsername = req.body.labUsername;
    var userKey = 'user/' + labUsername;
    new kfs(userKey, function(err) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        utils.resEndByCode(res, 0);
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/sendDummySms', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var phoneNumber = req.body.phoneNumber;
    var message = req.body.message;
    sms.simplySendSms(phoneNumber, message).then(function() {
        utils.resEndByCode(res, 0);
    }, function(err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    });
});

////////////////////////////////////////////////////////////////////////////////
