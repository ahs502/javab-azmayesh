var express = require('express');
var router = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms;

var path = require("path");

////////////////////////////////////////////////////////////////////////////////

router.post('/read/posts', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res);
    if (!userInfo) return;
    var username = userInfo.username;
    var postCollection = ('0000000' + req.body.postCollection).slice(-7);
    var postCollectionKey = 'post/' + username + '/' + postCollection + '/';
    kfs(postCollectionKey, function(err, postKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        postKeys = (postKeys || []).sort((p1, p2) => Number(p2.slice(-2)) - Number(p1.slice(-2)));
        Promise.all(postKeys.map(postKey => kfs(postKey)))
            .then(function(posts) {
                var newEncodedPosts = posts.map(post =>
                    post.postId + // 9 : 0-9
                    post.nationalCode + // 10 : 9-19
                    ('00' + String((post.files && post.files.length) || 0)).slice(-2) + // 2 : 19-21
                    post.postCode + // 4 : 21-25
                    post.timeStamp // 29 : 25-54
                ).join('|');
                utils.resEndByCode(res, 0, {
                    newEncodedPosts
                });
            }, function(err) {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

module.exports = router;
