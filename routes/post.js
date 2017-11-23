var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms,
    email = src.email,
    telegram = src.telegram,
    statistics = src.statistics;

// var path = require("path");

////////////////////////////////////////////////////////////////////////////////

router.post('/load/all', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    try {
        var year = parseInt(req.body.year, 10);
        var months = [].concat(req.body.months);
        if (!(year < 2000 && year > 1000)) throw "Invalid year: " + year;
        if (months.reduce(function(invalid, month) {
                return invalid || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) < 0;
            }, false)) throw "Invalid months: " + months;
    }
    catch (err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    }
    var postCollections = months.map(month => 'post/' + username + '/' + year + '/' + month + '/');
    Promise.all(postCollections.map(postCollectionKey => kfs(postCollectionKey)))
        .then(function(postCollectionKeys) {
            var postPacks = {}; // { '1396/1': ['post/username/1396/1/678', ...], ... }
            var promises = [];
            for (var i = 0; i < postCollections.length; i++) {
                let postPackKey = postCollections[i].slice(('post/' + username + '/').length, -1);
                postPacks[postPackKey] =
                    postCollectionKeys[i].sort((p1, p2) =>
                        Number(p2.slice(postCollections[i].length) -
                            Number(p1.slice(postCollections[i].length)))); // First is the newest!
                promises.push((function(postPackKey) {
                    return Promise.all(postPacks[postPackKey].map(pack => kfs(pack)))
                        .then(function(posts) {
                            var encodedPosts = posts.map(post =>
                                post.nationalCode + // 10 : 0-10
                                ('00' + String((post.files && post.files.length) || 0)).slice(-2) + // 2 : 10-12
                                post.postCode + // 4 : 12-16
                                String(post.timeStamp) // 13 : 16-29
                            ).join('|');
                            postPacks[postPackKey] = encodedPosts;
                        });
                })(postPackKey));
            }
            Promise.all(promises)
                .then(function() {
                    utils.resEndByCode(res, 0, {
                        postPacks // { '1396/1': "abcd|efgh|ijkl", ... }
                    });
                }, function(err) {
                    console.error(err);
                    utils.resEndByCode(res, 5);
                });
        }, function(err) {
            console.error(err);
            utils.resEndByCode(res, 5);
        });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/load/one', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    // var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var postCode = req.body.postCode;
    var patientKey = 'patient/data/' + nationalCode;
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
                    name: file.name,
                    size: file.size,
                    type: file.type
                };
            });
            utils.resEndByCode(res, 0, {
                fullName: patient.fullName,
                nationalCode: patient.nationalCode,
                numbers: patient.numbers,
                email: patient.email,
                postCode: post.postCode,
                timeStamp: post.timeStamp,
                notes: post.notes,
                files
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/delete/one', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    // var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var postCode = req.body.postCode;
    var patientKey = 'patient/data/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!patient) {
            return utils.resEndByCode(res, 71);
        }
        patient.posts = patient.posts || {};
        var postKey = patient.posts[postCode];
        if (!postKey) {
            return utils.resEndByCode(res, 72);
        }
        delete patient.posts[postCode];
        kfs(patientKey, patient, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            new kfs(postKey, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                sms.send.deleteAnswer([patientKey, postKey], patient, postCode);
                patient.email && email.send(patient.email,
                    "نتایج آزمایش شما از سامانه حذف شدند",
                    "باسمه تعالی\n" +
                    patient.fullName + " عزیز، سلام!\n" +
                    "نتایج آزمایش شما به شماره آزمایش " +
                    postCode +
                    " توسط آزمایشگاه از سامانه حذف شدند.",
                    "<div style=\"direction: rtl; text-align: -webkit-right !important; text-align: right !important;\">" +
                    "<h3>باسمه تعالی</h3>" +
                    "<p><strong>" + patient.fullName + "</strong> عزیز، سلام!</p>" +
                    "<p>نتایج آزمایش شما به شماره آزمایش " +
                    "<strong>" + postCode + "</strong>" +
                    " توسط آزمایشگاه از سامانه حذف شدند.</p>" +
                    "</div>");
                telegram.sendMessage(patient.numbers, "نتایج آزمایش شما به شماره آزمایش " + postCode + " توسط آزمایشگاه از سامانه حذف شدند.");
                utils.resEndByCode(res, 0);
                statistics.dailyCount('deleteAnswer');
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/update/one', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    // var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var postCode = req.body.postCode;
    var postData = req.body.postData;
    var patientKey = 'patient/data/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!patient) {
            return utils.resEndByCode(res, 71);
        }
        sms.allowanceCheck(patient.numbers, 'sendans').then(function() {
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
                post.files = (post.files || []).concat((postData.files || []).map(file => {
                    return {
                        serverName: file.serverName,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                }));
                post.notes = postData.notes;
                kfs(postKey, post, function(err) {
                    if (err) {
                        console.error(err);
                        return utils.resEndByCode(res, 5);
                    }
                    var answerUrl = config.protocol + '://' + config.domain + '/#/answer?p=' + patient.nationalCode + '&n=' + post.postCode;
                    sms.send.updateAnswer([patientKey, postKey], patient, post, answerUrl);
                    patient.email && email.send(patient.email,
                        "نتایج آزمایش شما به روز رسانی شدند",
                        "باسمه تعالی\n" +
                        patient.fullName + " عزیز، سلام!\n" +
                        "نتایج آزمایش شما به روز رسانی شدند و هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.\n" +
                        "شماره آزمایش: " + post.postCode + "\n" /*+ post.labName*/ +
                        "می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:\n" +
                        answerUrl,
                        "<div style=\"direction: rtl; text-align: -webkit-right !important; text-align: right !important;\">" +
                        "<h3>باسمه تعالی</h3>" +
                        "<p><strong>" + patient.fullName + "</strong> عزیز، سلام!</p>" +
                        "<p>نتایج آزمایش شما به روز رسانی شدند و هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.</p>" +
                        "<p>شماره آزمایش: <strong>" + post.postCode + "</strong></p>" /*+ post.labName*/ +
                        "<p>می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:</p>" +
                        "<a style=\"font-size: 120%;\" href=\"" + answerUrl + "\">نتایج من در سامانه جواب آزمایش</a>" +
                        "</div>");
                    telegram.sendMessage(patient.numbers, 'نتایج آزمایش شما به روز رسانی شدند و هم اکنون در سامانه «جواب آزمایش» در دسترس هستند. می توانید از طریق لینک زیر آن را مشاهده کنید:')
                        .then(() => telegram.sendMessage(patient.numbers, answerUrl));
                    utils.resEndByCode(res, 0);
                    statistics.dailyCount('updateAnswer');
                });
            });
        }, function() {
            utils.resEndByCode(res, 120);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
