/*global app*/

app.service('PostService', ['$q', '$http', 'Utils',
    function($q, $http, utils) {

        this.getPosts = getPosts;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5
        // Resolves to user's posts: { '1396/1': [{...post-data...}, ...], ... }
        function getPosts(year, months) {
            return utils.httpPromiseHandler($http.post('/post/load', {
                    year: year,
                    months: months
                }))
                .then(function(body) {
                    var postPacks = body.postPacks || {};
                    for (var postPackKey in postPacks) {
                        var encodedPosts = postPacks[postPackKey] || '';
                        var posts = encodedPosts.split('|')
                            .filter(function(encodedPost) {
                                return !!encodedPost;
                            })
                            .map(function(encodedPost) {
                                return {
                                    nationalCode: encodedPost.slice(0, 10),
                                    filesCount: Number(encodedPost.slice(10, 12)),
                                    postCode: encodedPost.slice(12, 16),
                                    postDate: new Date(Number(encodedPost.slice(16, 29)))
                                };
                            });
                        postPacks[postPackKey] = posts;
                    }
                    return postPacks;
                });
        }

    }
]);