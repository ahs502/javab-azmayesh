var express = require('express');
var router = module.exports = express.Router();

var src = require("../src"),
    kfs = src.kfs;

var http = require('http');
var minimalRequestPromise = require('minimal-request-promise');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('0123456789InTheNameOfGod9876543210');

////////////////////////////////////////////////////////////////////////////////

router.post('/register', function(req, res, next) {
    var userData = req.body.user;
    var username = user.username;

    //TODO: Validate user data ...

    var user = userData; //TODO: Extract user from userData ...

    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error.').end();
        }
        if (!user) {
            return res.status(409).send('Already existing user.').end();
        }
        var validationCode = '123456'; //TODO: Generate a validation code ...
        kfs('/user/_confirming_/' + username, {
            user,
            validationCode,
            timeStamp: new Date()
        }, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error.').end();
            }
            //TODO: Send verificationCode by SMS ...
            res.status(200).send('Success!').end(0);
        });
    });

    // var recaptcha = req.body.recaptcha;
    // var remoteip = req.ip; //req.headers['x-real-ip'] || req.connection.remoteAddress; //TODO: It works with Nginx, how about no proxy mod ?
    // var optionsVerification = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: {
    //         secret: '6LexDAwUAAAAAP7U7z8YEIcI006D8KGajx3WtR31',
    //         response: recaptcha,
    //         remoteip: remoteip
    //     }
    // };
    // console.log({
    //     secret: '6LexDAwUAAAAAP7U7z8YEIcI006D8KGajx3WtR31',
    //     response: recaptcha,
    //     remoteip: remoteip
    // });
    // minimalRequestPromise.post('https://www.google.com/recaptcha/api/siteverify', optionsVerification)
    //     .then(function(resp) {
    //         console.log('OK');
    //         console.log(`STATUS: ${resp.statusCode} - ${resp.statusMessage}`);
    //         console.log(`HEADERS: ${JSON.stringify(resp.headers, null, 4)}`);
    //         console.log(`BODY: ${resp.body}`);
    //         res.status(200).end();
    //     }, function(resp) {
    //         console.log('ERR');
    //         console.log(`STATUS: ${resp.statusCode} - ${resp.statusMessage}`);
    //         console.log(`HEADERS: ${JSON.stringify(resp.headers, null, 4)}`);
    //         console.log(`BODY: ${resp.body}`);
    //         res.status(200).end();
    //     });

});

////////////////////////////////////////////////////////////////////////////////

router.post('/register/confirm', function(req, res, next) {
    var username = req.body.username;
    var validationCode = req.body.validationCode;
    kfs('/user/_confirming_/' + username, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error.').end();
        }
        if (!data) {
            return res.status(400).send('Invalid username.').end();
        }
        if (data.timaStamp > new Date((new Date).setHours((new Date).getHours() + 10 /* Hours expiration time */ ))) {
            return res.status(400).send('Operation expired.').end();
        }
        if (validationCode != data.validationCode) {
            return res.status(400).send('Wrong verification code.').end();
        }
        //TODO: Instead of registering the user (below code), add it to the MustBeManuallyVerified list ...
        kfs('user/' + username, data.user, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error.').end();
            }
            res.status(200).send('Success!').end();
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    kfs('user/' + username, function(err, user) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error.').end();
        }
        if (user.password != password) {
            return res.status(403).send('Wrong username or password.').end();
        }
        var accessKey = generateAccessKey(user);
        res.status(200).send({
            accessKey,
            user: {
                username: user.username,
                //...
            }
        }).end();
    });
});

////////////////////////////////////////////////////////////////////////////////

function generateAccessKey(user) {
    var expirationDate = (new Date).toString();
    expirationDate.setHours(expirationDate.getHours() + 20);
    var accessKeyData = {
        expiresAt: expirationDate,
        user: {
            username: user.username,
            //...
        }
    };
    return cryptr.encrypt(JSON.stringify(accessKeyData));
}

function decodeAccessKey(accessKey) {
    try {
        var accessKeyData = JSON.parse(cryptr.decrypt(accessKey));
        if (!accessKeyData) return null;
        var expirationDate = new Date(accessKeyData.expiresAt);
        return {
            expired: new Date >= expirationDate,
            user: {
                username: accessKeyData.username,
                //...
            }
        };
    }
    catch (err) {
        return null;
    }
}
