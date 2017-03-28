var express = require('express');
var router = express.Router();

// var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access;
// sms = src.sms;

// var path = require("path");

////////////////////////////////////////////////////////////////////////////////

router.post('/load', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    var year = req.body.year;
    var months = [].concat(req.body.months);
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

module.exports = router;
