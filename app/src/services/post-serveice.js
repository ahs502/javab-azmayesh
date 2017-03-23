/*global app*/

app.service('PostService', ['$q', '$http', 'Utils',
    function($q, $http, utils) {

        this.initializePostStream = initializePostStream;
        this.readPostStream = readPostStream;

        /////////////////////////////////////////////////////

        var postCollection, postsAreFinished;

        function initializePostStream() {
            postCollection = 9999999;
            postsAreFinished = false;
        }

        // May reject by code : 1, 2, 5
        function readPostStream(postsHandler /* (newPosts) => readMore */ ) {
            var promise;
            if (postCollection < 0 || postsAreFinished) {
                postsAreFinished = true;
                promise = $q.when(postsHandler([]));
            }
            else {
                promise = utils.httpPromiseHandler($http.post('/post/read/posts', {
                        postCollection: postCollection--
                    }))
                    .then(function(body) {
                        var newEncodedPosts = body.newEncodedPosts || '';
                        var newPosts = newEncodedPosts.split('|')
                            .filter(function(encodedPost) {
                                return !!encodedPost;
                            })
                            .map(function(encodedPost) {
                                return {
                                    postId: encodedPost.slice(0, 9),
                                    nationalCode: encodedPost.slice(9, 19),
                                    filesCount: Number(encodedPost.slice(19, 21)),
                                    postCode: encodedPost.slice(21, 25),
                                    timeStamp: encodedPost.slice(25, 54).toDate()
                                };
                            });
                        if (!newPosts.length) postsAreFinished = true;
                        return postsHandler(newPosts);
                    });
            }
            return promise.then(function(readMore) {
                if (readMore && !postsAreFinished) return readPostStream(postsHandler);
            });
        }

    }
]);