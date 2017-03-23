var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms;

var path = require("path");
var formidable = require('formidable');

////////////////////////////////////////////////////////////////////////////////

router.post('/file/upload', function(req, res, next) {
    var accessData = access.decodeRequest(req);
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
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.get('/file/download', function(req, res, next) {
    var nationalCode = req.query.p;
    var postCode = req.query.n;
    var serverName = req.query.f;
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
            res.set('Content-Type', file.type);
            res.set('Content-Length', file.size); //TODO: does it required?
            //TODO: what about file.name? can we use it here?
            res.sendFile(filePath);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/send', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    var labName = userInfo.labName;
    var person = req.body.person;
    var timeStamp = req.body.timeStamp;
    var files = req.body.files;
    var notes = req.body.notes;
    //TODO: Validate input data...
    var nationalCode = person.nationalCode;
    utils.generateId('post/' + username).then(function(postId) {
        postId = ('000000000' + String(1000000000 - postId)).slice(-9);
        var patientKey = 'patient/' + nationalCode;
        kfs(patientKey, function(err, patient) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            patient = patient || {};
            patient.nationalCode = nationalCode;
            patient.fullName = person.fullName;
            patient.fullNames = patient.fullNames || [];
            if (patient.fullNames.indexOf(patient.fullName) >= 0)
                patient.fullNames.splice(patient.fullNames.indexOf(patient.fullName), 1);
            patient.fullNames = [patient.fullName].concat(patient.fullNames);
            patient.numbers = patient.numbers || [];
            [person.extraPhoneNumber, person.phoneNumber, person.mobilePhoneNumber].forEach(function(num) {
                if (typeof num !== 'string') return;
                num = num.toPhoneNumber();
                if (num === '') return;
                var index = patient.numbers.indexOf(num);
                index >= 0 && patient.numbers.splice(index, 1);
                patient.numbers = [num].concat(patient.numbers);
            });
            patient.email = person.email;
            patient.posts = patient.posts || {};
            var postCode = utils.generateRandomCode(4, Object.keys(patient.posts));
            var postKey = 'post/' + username + '/' + postId.slice(0, -2) + '/' + postId.slice(-2);
            patient.posts[postCode] = postKey;
            kfs(patientKey, patient, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                var post = {
                    postId: postId,
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
                    sms.send.postAnswer([patientKey, postKey], patient, post);
                    utils.resEndByCode(res, 0);
                });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
