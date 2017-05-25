var express = require('express');
var router = express.Router();

var path = require("path");
var fs = require("fs-extra");

var config = require("../config");
var src = require("../src"),
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
    res.send(data).status(200).end();
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
