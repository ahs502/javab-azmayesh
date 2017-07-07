/*global Validator*/
/*global ValidationSystem*/

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

var path = require("path");
var formidable = require('formidable');

////////////////////////////////////////////////////////////////////////////////

router.post('/file/upload', function(req, res, next) {
    var accessData = access.decodeUserRequest(req);
    if (accessData.invalid || accessData.expired) {
        return res.status(401).end();
    }
    // var userInfo = accessData.userInfo;
    // var username = userInfo.username;
    utils.generateId('uploaded-file').then(function(fileId) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                console.log('Upload error : ', err);
                res.status(500).json({
                    innerException: err
                }).end();
            }
        });
        form.on('fileBegin', function(name, file) {
            // Set actual file path on server
            file.path = path.join(config.upload_path, String(fileId));
        });
        form.on('file', function(name, file) {
            console.log('Uploading : ', file.name, 'FileId : ', fileId);
        });
        form.on('end', function() {
            console.log('Uploaded successfully.', 'FileId : ', fileId);
            res.status(200).json({
                filename: fileId
            }).end();
            statistics.dailyCount('fileUpload');
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.get('/file/download', function(req, res, next) {
    var nationalCode = req.query.p;
    var postCode = req.query.n;
    var serverName = req.query.f;
    var setContentType = req.query.t !== 'false';
    if (!nationalCode || !postCode || !serverName) {
        return res.status(400).end();
    }
    var patientKey = 'patient/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        if (!patient) {
            return res.status(404).end();
        }
        var posts = patient.posts || {};
        var postKey = posts[postCode];
        if (!postKey) {
            return res.status(403).end();
        }
        kfs(postKey, function(err, post) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            if (!post) {
                return res.status(404).end();
            }
            var file = (post.files || []).find(file => file.serverName == serverName);
            if (!file) {
                return res.status(404).end();
            }
            var filePath = path.join(config.upload_path, String(file.serverName));
            setContentType && res.set('Content-Type', file.type);
            res.set('Content-Length', file.size); //TODO: is it required?
            //TODO: what about file.name? can we use it here?
            res.sendFile(filePath);
            statistics.dailyCount('fileDownload');
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/patient/info', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    // var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var patientKey = 'patient/' + nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!patient) {
            return utils.resEndByCode(res, 71);
        }
        utils.resEndByCode(res, 0, {
            fullName: patient.fullName,
            numbers: patient.numbers,
            email: patient.email
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/patient/update', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    // var username = userInfo.username;
    var person = req.body.person;

    var personValidator = new Validator(person)
        .field('nationalCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.nationalCode()
        ])
        .field('fullName', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(3)
        ])
        .field('mobilePhoneNumber', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.mobilePhoneNumber()
        ])
        .field('phoneNumber', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.phoneNumber()
        ])
        .field('extraPhoneNumber', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.phoneNumber()
        ])
        .field('email', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.email()
        ]);
    if (!personValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: personValidator.getErrors()
        });
    }

    var patientKey = 'patient/' + person.nationalCode;
    kfs(patientKey, function(err, patient) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        patient = patient || {};
        patient.numbers = patient.numbers || [];
        [person.extraPhoneNumber, person.phoneNumber, person.mobilePhoneNumber].forEach(function(num) {
            if (typeof num !== 'string') return;
            num = num.toPhoneNumber();
            if (num === '') return;
            var index = patient.numbers.indexOf(num);
            index >= 0 && patient.numbers.splice(index, 1);
            patient.numbers = [num].concat(patient.numbers);
        });
        patient.nationalCode = person.nationalCode;
        patient.fullName = person.fullName;
        patient.fullNames = patient.fullNames || [];
        if (patient.fullNames.indexOf(patient.fullName) >= 0)
            patient.fullNames.splice(patient.fullNames.indexOf(patient.fullName), 1);
        patient.fullNames = [patient.fullName].concat(patient.fullNames);
        patient.email = person.email;
        patient.posts = patient.posts || {};
        kfs(patientKey, patient, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            sms.send.updatePatient([patientKey], patient);
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/send', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var labName = userInfo.labName;
    var person = req.body.person;
    var timeStamp = req.body.timeStamp;
    var files = req.body.files;
    var notes = req.body.notes;

    var personValidator = new Validator(person)
        .field('nationalCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.nationalCode()
        ])
        .field('fullName', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(3)
        ])
        .field('mobilePhoneNumber', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.mobilePhoneNumber()
        ])
        .field('phoneNumber', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.phoneNumber()
        ])
        .field('extraPhoneNumber', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.phoneNumber()
        ])
        .field('email', [
            ValidationSystem.validators.notRequired(),
            ValidationSystem.validators.email()
        ]);
    if (!personValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: personValidator.getErrors()
        });
    }

    var userKey = 'user/active/' + username;
    kfs(userKey, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!user) {
            return utils.resEndByCode(res, 51);
        }
        user.balance = Number(user.balance || 0) - config.post_price;
        if (user.balance < 0) {
            return utils.resEndByCode(res, 130);
        }
        var nationalCode = person.nationalCode;
        var jYMD = new Date(timeStamp).jYMD();
        var patientKey = 'patient/' + nationalCode;
        kfs(patientKey, function(err, patient) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            patient = patient || {};
            patient.numbers = patient.numbers || [];
            [person.extraPhoneNumber, person.phoneNumber, person.mobilePhoneNumber].forEach(function(num) {
                if (typeof num !== 'string') return;
                num = num.toPhoneNumber();
                if (num === '') return;
                var index = patient.numbers.indexOf(num);
                index >= 0 && patient.numbers.splice(index, 1);
                patient.numbers = [num].concat(patient.numbers);
            });
            sms.allowanceCheck(patient.numbers, 'sendans').then(function() {
                patient.nationalCode = nationalCode;
                patient.fullName = person.fullName;
                patient.fullNames = patient.fullNames || [];
                if (patient.fullNames.indexOf(patient.fullName) >= 0)
                    patient.fullNames.splice(patient.fullNames.indexOf(patient.fullName), 1);
                patient.fullNames = [patient.fullName].concat(patient.fullNames);
                patient.email = person.email;
                patient.posts = patient.posts || {};
                var postCode = utils.generateRandomCode(4, Object.keys(patient.posts));
                utils.generateId('post/' + username + '/' + jYMD[0] + '/' + jYMD[1]).then(function(postId) {
                    var postKey = 'post/' + username + '/' + jYMD[0] + '/' + jYMD[1] + '/' + postId;
                    patient.posts[postCode] = postKey;
                    kfs(patientKey, patient, function(err) {
                        if (err) {
                            console.error(err);
                            return utils.resEndByCode(res, 5);
                        }
                        var post = {
                            postKey: postKey,
                            username: username,
                            labName: labName,
                            nationalCode: nationalCode,
                            files: files,
                            notes: notes,
                            timeStamp: timeStamp,
                            postCode: postCode
                        };
                        kfs(postKey, post, function(err) {
                            if (err) {
                                console.error(err);
                                return utils.resEndByCode(res, 5);
                            }
                            kfs(userKey, user, function(err) {
                                if (err) {
                                    console.error(err);
                                    return utils.resEndByCode(res, 5);
                                }
                                var answerUrl = config.protocol + '://' + config.domain + '/#/answer?p=' + patient.nationalCode + '&n=' + post.postCode;
                                sms.send.postAnswer([patientKey, postKey], patient, post, answerUrl);
                                patient.email && email.send(patient.email,
                                    "نتایج آزمایش شما آماده شدند",
                                    "باسمه تعالی\n" +
                                    patient.fullName + " عزیز، سلام!\n" +
                                    "نتایج آزمایش شما هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.\n" +
                                    "شماره آزمایش: " + post.postCode + "\n" /*+ post.labName*/ +
                                    "می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:\n" +
                                    answerUrl,
                                    "<div style=\"direction: rtl; text-align: -webkit-right !important; text-align: right !important;\">" +
                                    "<h3>باسمه تعالی</h3>" +
                                    "<p><strong>" + patient.fullName + "</strong> عزیز، سلام!</p>" +
                                    "<p>نتایج آزمایش شما هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.</p>" +
                                    "<p>شماره آزمایش: <strong>" + post.postCode + "</strong></p>" /*+ post.labName*/ +
                                    "<p>می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:</p>" +
                                    "<a style=\"font-size: 120%;\" href=\"" + answerUrl + "\">نتایج من در سامانه جواب آزمایش</a>" +
                                    "</div>");
                                telegram.sendMessage(patient.numbers, 'نتایج آزمایش شما هم اکنون در سامانه «جواب آزمایش» در دسترس هستند. می توانید از طریق لینک زیر آن را مشاهده کنید:')
                                    .then(() => telegram.sendMessage(patient.numbers, answerUrl));
                                utils.resEndByCode(res, 0);
                                statistics.dailyCount('sendAnswer');
                            });
                        });
                    });
                });
            }, function() {
                utils.resEndByCode(res, 120);
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
