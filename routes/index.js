var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    statistics = src.statistics;

////////////////////////////////////////////////////////////////////////////////

router.get('/', function(req, res, next) {
    try {
        statistics.dailyCount('index');
    }
    catch (r) {
        console.error(r)
    }
    next();
});

////////////////////////////////////////////////////////////////////////////////

router.get('/config', function(req, res, next) {
    var data = 'app.constant("Config",' + JSON.stringify(config.client_config) + ');';
    res.send(data).status(200).end();
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
