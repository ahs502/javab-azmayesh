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
    var email = req.body.email || '';
    var message = req.body.message || '';
    var feedback = {
        email,
        message
    };

    var feedbackValidator = new Validator(feedback)
        .field('email', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.email()
        ])
        .field('message', [
            ValidationSystem.validators.notEmpty()
        ]);
    if (!feedbackValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: feedbackValidator.getErrors()
        });
    }

    //TODO: Do something about this feedback:
    console.log('FEEDBACK:', email);
    console.log(message);
    utils.resEndByCode(res, 0);
});

////////////////////////////////////////////////////////////////////////////////
