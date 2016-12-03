var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils;

var path = require("path");
var formidable = require('formidable');

////////////////////////////////////////////////////////////////////////////////

router.post('/upload', function(req, res, next) {
    utils.generateId('uploaded-file').then(function(fileId) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            err && console.log('Upload error : ', err);
        });
        form.on('fileBegin', function(name, file) {
            file.path = path.join(config.upload_temporary_path, String(fileId));
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

// router.post('/', function(req, res, next) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         err && console.log('Upload error : ', err);
//     });
//     form.on('fileBegin', function(name, file) {
//         file.path = path.join(config.upload_temporary_path, file.name);
//     });
//     form.on('file', function(name, file) {
//         console.log('Uploading : ', file.name);
//     });
//     form.on('end', function() {
//         console.log('Uploaded successfully.');
//         res.status(200).end();
//     });
// });

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
