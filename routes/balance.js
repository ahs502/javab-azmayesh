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
    zarinpal = src.zarinpal,
    statistics = src.statistics;

////////////////////////////////////////////////////////////////////////////////

router.post('/submit/c2cReceiptCode', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var labName = userInfo.labName;
    var c2cReceiptCode = req.body.c2cReceiptCode;

    var c2cReceiptCodeValidator = new Validator({
            c2cReceiptCode
        })
        .field('c2cReceiptCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(4),
            ValidationSystem.validators.integer()
        ]);
    if (!c2cReceiptCodeValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: c2cReceiptCodeValidator.getErrors()
        });
    }

    utils.generateId('c2cReceiptCode').then(function(id) {
        var receiptKey = 'balance/c2c/new/' + id;
        var receiptData = {
            id,
            c2cReceiptCode,
            username,
            labName,
            timeStamp: Date.now()
        };
        kfs(receiptKey, receiptData, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.get('/zarinpal/labCharge/:username/:chargeAmount', function(req, res, next) {
    var username = req.params.username;
    var chargeAmount = req.params.chargeAmount;
    var appUrl = config.protocol + '://' + config.domain;

    var chargeAmountValidator = new Validator({
            chargeAmount
        })
        .field('chargeAmount', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(4),
            ValidationSystem.validators.integer()
        ]);
    if (!chargeAmountValidator.isValid()) {
        return res.redirect(appUrl);
    }

    kfs('user/active/' + username, function(err, userData) {
        if (err || !userData || userData.userType !== 'laboratory') {
            return res.redirect(appUrl);
        }
        zarinpal.gotoPayment(res,'user charge',
            'تأمین اعتبار برای ' + userData.labName,
            chargeAmount, userData.mobilePhoneNumber, null, null, {
                userData
            }); //TODO: Add email when it's been provided.
    });
});

////////////////////////////////////////////////////////////////////////////////
