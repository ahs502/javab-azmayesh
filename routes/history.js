var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    // access = src.access,
    sms = src.sms;

var path = require("path");

////////////////////////////////////////////////////////////////////////////////

router.post('/generate/otp', function(req, res, next) {
    var nationalCode = req.body.nationalCode;
    var mobilePhoneNumber = String(req.body.mobilePhoneNumber).toPhoneNumber();
    var patientKey = 'patient/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!patient) {
            return utils.resEndByCode(res, 51);
        }
        if (patient.numbers.indexOf(mobilePhoneNumber) < 0) {
            return utils.resEndByCode(res, 60);
        }
        var otp = utils.generateRandomCode(6);
        var requestCode = utils.generateRandomCode(10);
        utils.generateId('otp').then(otpId => {
            var otpKey = 'otp/' + otpId;
            var otpData = {
                nationalCode,
                mobilePhoneNumber,
                otp,
                requestCode,
                used: false
            };
            kfs(otpKey, otpData, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                sms.send.otpGenerated([otpKey, patientKey], otpData, patient);
                utils.resEndByCode(res, 0, {
                    otpId,
                    requestCode
                });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/find/history', function(req, res, next) {
    var nationalCode = req.body.nationalCode;
    var otpId = req.body.otpId;
    var requestCode = req.body.requestCode;
    var otp = req.body.otp;
    var otpKey = 'otp/' + otpId;
    kfs(otpKey, function(err, otpData) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!otpData || otpData.used || otpData.nationalCode != nationalCode ||
            otpData.requestCode != requestCode || otpData.otp != otp) {
            return utils.resEndByCode(res, 40);
        }
        otpData.used = true;
        kfs(otpKey, otpData, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            var patientKey = 'patient/' + nationalCode;
            kfs(patientKey, function(err, patient) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                if (!patient) {
                    return utils.resEndByCode(res, 71);
                }
                var posts = patient.posts || {};
                Promise.all(Object.keys(posts).map(key => kfs(posts[key])))
                    .then(function(postsData) {
                        var history = postsData.filter(postData => postData);
                        history.forEach(postData => {
                            postData.filesCount = (postData.files && postData.files.length) || 0;
                            delete postData.files;
                        });
                        // var remoteIp = req.ip;
                        // var accessKey = access.generatePatientAccessKey(patient, remoteIp);
                        utils.resEndByCode(res, 0, {
                            // accessKey,
                            patientInfo: {
                                nationalCode: patient.nationalCode,
                                fullName: patient.fullName
                            },
                            history
                        });
                    }, function(err) {
                        console.error(err);
                        utils.resEndByCode(res, 5);
                    });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/load/answer', function(req, res, next) {
    var nationalCode = req.body.nationalCode;
    var postCode = req.body.postCode;
    var patientKey = 'patient/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!patient) {
            return utils.resEndByCode(res, 71);
        }
        var posts = patient.posts || {};
        var postKey = posts[postCode];
        if (!postKey) {
            return utils.resEndByCode(res, 72);
        }
        kfs(postKey, function(err, post) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            if (!post) {
                return utils.resEndByCode(res, 73);
            }
            var files = (post.files || []).map(file => {
                return {
                    serverName: file.serverName,
                    type: file.type
                };
            });
            console.log(post.timeStamp)
            console.log(post.timeStamp.toDate())
            utils.resEndByCode(res, 0, {
                patientName: patient.fullName,
                labName: post.labName,
                labUsername: post.username,
                postDate: String(post.timeStamp).toDate(),
                notes: post.notes,
                files
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
