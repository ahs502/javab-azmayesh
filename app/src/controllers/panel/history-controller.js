/*global app*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', 'PostService',
    function($scope, $rootScope, $state, $stateParams, postService) {

        $scope.postClicked = postClicked;

        $scope.posts = [];
        // $scope.setLoading(true);

        postService.initializePostStream();
        postService.readPostStream(function(newPosts) {
            console.log('00--', newPosts);
            return true;
        }).then(function () {
            console.log('done!')
        });

        // $timeout(function() { //TODO: load posts...
        //     $scope.posts = [{
        //         id: 1,
        //         status: 'Sending'
        //     }, {
        //         id: 2,
        //         status: 'Error'
        //     }, {
        //         id: 3,
        //         status: 'Sending'
        //     }, {
        //         id: 4,
        //         status: 'Received'
        //     }, {
        //         id: 5,
        //         status: 'Received'
        //     }, {
        //         id: 6,
        //         status: 'Error'
        //     }, {
        //         id: 7,
        //         status: 'Received'
        //     }, ];
        //     $scope.setLoading(false);
        // }, 700);

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);
