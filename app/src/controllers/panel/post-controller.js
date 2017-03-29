/*global app*/
/*global $*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', 'PostService',
    function($scope, $rootScope, $state, $stateParams, postService) {

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.setLoading(true);
        postService.getOnePost(postSummary.nationalCode, postSummary.postCode)
            .then(function(post) {
                $scope.post = post;
                $scope.setPageTitle($scope.post.fullName);
            }, function(code) {
                //TODO: Handle errors...
                alert(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

    }
]);
