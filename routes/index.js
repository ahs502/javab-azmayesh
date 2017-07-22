var express = require('express');
var router = express.Router();

var path = require("path");
var fs = require("fs-extra");
var querystring = require('querystring');

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    zarinpal = src.zarinpal,
    statistics = src.statistics;

////////////////////////////////////////////////////////////////////////////////

router.get('/', function(req, res, next) {
    try {
        statistics.dailyCount('index');
        fs.readFile(path.join(__dirname, '../app/public/index.html'), function(error, indexHtml) {
            if (error) {
                console.error(error);
                return next();
            }
            indexHtml = String(indexHtml || '');

            var replacements = {
                '__APP_SOURCES_MINIFIED_INDICATOR__': config.minified_app_sources ? '.min' : '',
            };
            Object.keys(replacements).forEach(function(key) {
                indexHtml = indexHtml.replace(new RegExp(key, 'g'), replacements[key]);
            });

            res
                .header('Content-Type', 'text/html; charset=UTF-8')
                .status(200)
                .send(indexHtml)
                .end();
        });
    }
    catch (error) {
        console.error(error);
        next();
    }
});

////////////////////////////////////////////////////////////////////////////////

router.get('/config', function(req, res, next) {
    var data = 'app.constant("Config",' + JSON.stringify(config.client_config) + ');';
    res
        .header('Content-Type', 'application/javascript')
        .send(data)
        .status(200)
        .end();
});

////////////////////////////////////////////////////////////////////////////////

router.get('/android-manifest.json', function(req, res, next) {
    try {
        fs.readFile(path.join(__dirname, '../app/public/android-manifest.json'), function(error, androidManifest) {
            if (error) {
                console.error(error);
                return next();
            }
            androidManifest = String(androidManifest || '');
            res
                .header('Content-Type', 'application/manifest+json')
                .status(200)
                .send(androidManifest)
                .end();
        });
    }
    catch (error) {
        console.error(error);
        next();
    }
});

////////////////////////////////////////////////////////////////////////////////

router.get('/zarinpal/callback', function(req, res, next) {
    const authority = req.query.Authority;
    const status = req.query.Status;
    const baseUrl = config.protocol + '://' + config.domain;
    (status !== 'OK' ? Promise.reject() :
        kfs('balance/zarinpal/authorities/' + authority)
        .then(paymentKey => {
            return kfs(paymentKey).then(paymentData => {
                const amount = paymentData.amount;
                return zarinpal.getReferenceId(authority, amount)
                    .then(referenceId => {
                        switch (paymentData.transactionType) {

                            case 'user charge':
                                const userKey = 'user/active/' + paymentData.data.userData.username;
                                return kfs(userKey)
                                    .then(userData => {
                                        userData.balance += Number(amount);
                                        return kfs(userKey, userData);
                                    })
                                    .then(() => {
                                        paymentData.verified = true;
                                        paymentData.referenceId = referenceId;
                                        return kfs(paymentKey, paymentData);
                                    })
                                    .then(() => ({
                                        title: 'تأیید پرداخت',
                                        message: 'پرداخت شما با موفقیت انجام شد! شماره پیگیری: ' + referenceId,
                                        ok: 'خیلی هم عالی!'
                                    }));

                            default:
                                return Promise.reject('Un supported transaction type.');
                        }
                    }, reason => ({
                        title: 'عدم تأیید پرداخت',
                        message: 'پرداخت شما از طرف سایت پذیرنده تأیید نشد: \n' + JSON.stringify(reason)
                    }));
            });
        }))
    .catch(() => ({
            title: 'خطا در بازگشت به سایت پذیرنده',
            message: 'عملیات بازگشت به سایت پذیرنده با خطا مواجه شد.'
        }))
        .then(startupMessage => res.redirect(baseUrl + '/#/start?init=' +
            querystring.escape(JSON.stringify({
                startupMessage
            }))));
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
