/*global Validator*/
/*global ValidationSystem*/
/*global irIran*/

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
    var patientKey = 'patient/data/' + nationalCode;
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

router.post('/patient/draft/register', function(req, res, next) {
    var person = req.body.person;
    var patientKey = 'patient/data/' + person.nationalCode;
    patientKey in kfs(function(err, patientExists) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (patientExists) {
            return utils.resEndByCode(res, 140);
        }

        var personValidator = new Validator(person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('gender', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('birthday', [
                function(value) {
                    if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                    if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                    if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
                    return null;
                }
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
            ])
            .field('province', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('city', [
                ValidationSystem.validators.notEmpty(),
                function(value) {
                    if ((irIran[person.province] || []).indexOf(value) < 0) {
                        return "این شهر متعلق به استان " + person.province + " نیست";
                    }
                    else return null;
                }
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.postalCode()
            ]);
        if (!personValidator.isValid()) {
            return utils.resEndByCode(res, 80, {
                errors: personValidator.getErrors()
            });
        }

        sms.allowanceCheck(person.numbers, 'regpatientdraft').then(function() {
            const patientDraftKey = 'patient/draft/unverified/' + person.nationalCode;
            const validationCode = utils.generateRandomCode(4);
            const patientDraft = {
                patient: person,
                validationCode,
                timeStamp: Date.now()
            };
            kfs(patientDraftKey, patientDraft, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                sms.send.registerPatientDraft([patientDraftKey], patientDraft);
                utils.resEndByCode(res, 0);
            });
        }, function() {
            utils.resEndByCode(res, 120);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/patient/draft/verify', function(req, res, next) {
    const nationalCode = req.body.nationalCode;
    const validationCode = req.body.validationCode;
    const unverifiedPatientDraftKey = 'patient/draft/unverified/' + nationalCode;
    kfs(unverifiedPatientDraftKey).then(function(patientDraft) {
        if (!patientDraft) {
            return utils.resEndByCode(res, 30);
        }
        if (patientDraft.timeStamp > Date.now() + config.confirmation_expires_after * 3600 * 1000) {
            return utils.resEndByCode(res, 31);
        }
        if (validationCode != patientDraft.validationCode) {
            return utils.resEndByCode(res, 32);
        }
        const verifiedPatientDraftKey = 'patient/draft/verified/' + nationalCode;
        return kfs(verifiedPatientDraftKey, patientDraft.patient).then(function() {
            return new kfs(unverifiedPatientDraftKey);
        }).then(function() {
            utils.resEndByCode(res, 0);
        });
    }).catch(function(err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    });
});
////////////////////////////////////////////////////////////////////////////////

router.post('/patient/info', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var patientKey = 'patient/data/' + nationalCode;
    var patientDraftKey = 'patient/draft/verified/' + nationalCode;
    var acceptanceKey = 'acceptance/' + username + '/' + nationalCode;
    Promise.all([kfs(patientKey), kfs(patientDraftKey), kfs(acceptanceKey)])
        .then(data => {
            const patient = data[0];
            var patientDraft = data[1];
            patientDraft = patientDraft && {
                nationalCode: patientDraft.nationalCode,
                fullName: patientDraft.fullName,
                gender: patientDraft.gender,
                birthday: patientDraft.birthday,
                numbers: [
                    patientDraft.mobilePhoneNumber,
                    patientDraft.phoneNumber,
                    patientDraft.extraPhoneNumber
                ].filter(num => !!num),
                email: patientDraft.email,
                province: patientDraft.province,
                city: patientDraft.city,
                address: patientDraft.address,
                postalCode: patientDraft.postalCode
            };
            const acceptance = data[2];
            const patientData = patientDraft || patient;
            if (!patientData) {
                return utils.resEndByCode(res, 71);
            }
            var result = {
                patient: {
                    nationalCode: patientData.nationalCode,
                    fullName: patientData.fullName,
                    gender: patientData.gender,
                    birthday: patientData.birthday,
                    numbers: patientData.numbers,
                    email: patientData.email,
                    province: patientData.province,
                    city: patientData.city,
                    address: patientData.address,
                    postalCode: patientData.postalCode
                }
            };
            result.acceptance = acceptance ? {
                request: acceptance.request,
                payment: acceptance.payment,
                timeStamp: acceptance.timeStamp
            } : null;
            utils.resEndByCode(res, 0, result);
        }).catch(err => {
            console.error(err);
            utils.resEndByCode(res, 5);
        });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/patient/accept', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var person = req.body.person;
    var request = req.body.request || {};
    var payment = req.body.payment;

    var personValidator = new Validator(person)
        .field('nationalCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.nationalCode()
        ])
        .field('fullName', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.minLength(3)
        ])
        .field('gender', [
            ValidationSystem.validators.notRequired()
        ])
        .field('birthday', [
            function(value) {
                // if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                // if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                // if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
                return null;
            }
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
        ])
        .field('province', [
            ValidationSystem.validators.notEmptyIf(function() {
                return request.paperVersion;
            })
        ])
        .field('city', [
            ValidationSystem.validators.notEmptyIf(function() {
                return request.paperVersion;
            }),
            function(value) {
                if (!person.province) return true;
                if ((irIran[person.province] || []).indexOf(value) < 0) {
                    return "این شهر متعلق به استان " + person.province + " نیست";
                }
                else return null;
            }
        ])
        .field('address', [
            ValidationSystem.validators.notEmptyIf(function() {
                return request.paperVersion;
            }),
            ValidationSystem.validators.minLength(10)
        ])
        .field('postalCode', [
            ValidationSystem.validators.notEmptyIf(function() {
                return request.paperVersion;
            }),
            ValidationSystem.validators.postalCode()
        ]);
    if (!personValidator.isValid()) {
        return utils.resEndByCode(res, 80, {
            errors: personValidator.getErrors()
        });
    }

    var patientKey = 'patient/data/' + person.nationalCode;
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
        patient.gender = person.gender;
        patient.birthday = person.birthday;
        patient.email = person.email;
        patient.posts = patient.posts || {};
        patient.province = person.province;
        patient.city = person.city;
        patient.address = person.address;
        patient.postalCode = person.postalCode;
        sms.allowanceCheck(patient.numbers, 'acceptpatient').then(function() {
            const acceptanceKey = 'acceptance/' + username + '/' + patient.nationalCode;
            const acceptance = {
                username,
                nationalCode: patient.nationalCode,
                request,
                payment,
                timeStamp: Date.now()
            };
            var patientDraftKey = 'patient/draft/verified/' + patient.nationalCode;
            new kfs(patientDraftKey, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                kfs(patientKey, patient, function(err) {
                    if (err) {
                        console.error(err);
                        return utils.resEndByCode(res, 5);
                    }
                    kfs(acceptanceKey, acceptance, function(err) {
                        if (err) {
                            console.error(err);
                            return utils.resEndByCode(res, 5);
                        }
                        (('telegram/contact/phone/' + patient.numbers[0]) in kfs(), kfs())
                        .then(telegramContactExists => {
                            sms.send.acceptPatient([patientKey, acceptanceKey], patient, acceptance);
                            telegramContactExists || setTimeout(function() {
                                sms.send.telegramBotInvitation([patientKey], patient);
                            }, 10 * 1000);
                        });
                        utils.resEndByCode(res, 0);
                    });
                });
            });
        }, function() {
            utils.resEndByCode(res, 120);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/get/acceptances', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    kfs('acceptance/' + username + '/', function(err, acceptanceKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        Promise.all(acceptanceKeys.map(a => kfs(a))).then(acceptances => {
            utils.resEndByCode(res, 0, {
                acceptances
            });
        }).catch(err => {
            console.error(err);
            utils.resEndByCode(res, 5);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/send', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'laboratory');
    if (!userInfo) return;
    var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    var files = req.body.files;
    var notes = req.body.notes;
    var timeStamp = Date.now();

    var personValidator = new Validator({
            nationalCode
        })
        .field('nationalCode', [
            ValidationSystem.validators.notEmpty(),
            ValidationSystem.validators.nationalCode()
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
        var patientKey = 'patient/data/' + nationalCode;
        kfs(patientKey, function(err, patient) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            if (!patient) {
                return utils.resEndByCode(res, 76);
            }
            var acceptanceKey = 'acceptance/' + username + '/' + nationalCode;
            kfs(acceptanceKey, function(err, acceptance) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                if (!acceptance) {
                    return utils.resEndByCode(res, 77);
                }
                if (acceptance.payment > 0) {
                    user.balance = Number(user.balance || 0) - acceptance.payment + 1000 /*TODO: Get cost from config*/ ;
                    if (user.freeIntervalTimeStamp && user.freeIntervalTimeStamp >= Date.now()) {
                        user.balance += 1000 /*TODO: Get cost from config*/ ;
                    }
                    if (user.balance < 0) {
                        if (!user.chargeDeadlineTimeStamp) {
                            var chargeDeadline = new Date();
                            chargeDeadline.setDate(chargeDeadline.getDate() + 31);
                            user.chargeDeadlineTimeStamp = chargeDeadline.getTime();
                        }
                        else if (user.chargeDeadlineTimeStamp < Date.now()) {
                            return utils.resEndByCode(res, 130);
                        }
                    }
                }
                sms.allowanceCheck(patient.numbers, 'sendans').then(function() {
                    patient.posts = patient.posts || {};
                    var postCode = utils.generateRandomCode(4, Object.keys(patient.posts));
                    var jYMD = new Date(timeStamp).jYMD();
                    utils.generateId('post/' + username + '/' + jYMD[0] + '/' + jYMD[1]).then(function(postId) {
                        var postKey = 'post/' + username + '/' + jYMD[0] + '/' + jYMD[1] + '/' + postId;
                        var post = {
                            postKey: postKey,
                            username: username,
                            labName: user.labName,
                            nationalCode: nationalCode,
                            files: files,
                            notes: notes,
                            timeStamp: timeStamp,
                            postCode: postCode,
                            request: acceptance.request,
                            payment: acceptance.payment,
                            acceptanceTimeStamp: acceptance.timeStamp
                        };
                        kfs(postKey, post, function(err) {
                            if (err) {
                                console.error(err);
                                return utils.resEndByCode(res, 5);
                            }
                            patient.posts[postCode] = postKey;
                            kfs(patientKey, patient, function(err) {
                                if (err) {
                                    console.error(err);
                                    return utils.resEndByCode(res, 5);
                                }
                                kfs(userKey, user, function(err) {
                                    if (err) {
                                        console.error(err);
                                        return utils.resEndByCode(res, 5);
                                    }
                                    new kfs(acceptanceKey, function(err) {
                                        err && console.error(err);
                                    });
                                    if (acceptance.request.electronicVersion) {
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
                                        telegram.sendMessage(patient.numbers, 'نتایج آزمایش شما به شماره آزمایش ' +
                                                post.postCode + ' هم اکنون در سامانه «جواب آزمایش» در دسترس هستند. می توانید از طریق لینک زیر آن را مشاهده کنید:')
                                            .then(() => telegram.sendMessage(patient.numbers, answerUrl));
                                    }
                                    if (acceptance.request.paperVersion) {
                                        //TODO: What should I do here ?!
                                    }
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
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
