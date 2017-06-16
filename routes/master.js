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

router.post('/send/feedback', function(req, res, next) {
    var mobilePhoneNumber = req.body.mobilePhoneNumber || '';
    var message = req.body.message || '';
    var feedback = {
        mobilePhoneNumber,
        message
    };

    var feedbackValidator = new Validator(feedback)
        .field('mobilePhoneNumber', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.mobilePhoneNumber()
        ])
        .field('message', [
            ValidationSystem.validators.notEmpty()
        ]);
    if (!feedbackValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: feedbackValidator.getErrors()
        });
    }

    utils.generateId('feedback').then(function(id) {
        feedback.id = id;
        feedback.timeStamp = Date.now();
        var feedbackNewKey = 'feedback/new/' + id;
        kfs(feedbackNewKey, feedback, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////
