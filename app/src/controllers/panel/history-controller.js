/*global app*/
/*global $*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout','UserService', 'PostService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService,postService) {

        $scope.postClicked = postClicked;

console.log(userService.current())
        $scope.allYears = [1396, 1395, 1394];
        $scope.persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        $scope.selectedYear = $scope.allYears[0];

        $scope.selectedMonthFrom = 1;
        $scope.selectedMonthFromText = $scope.persianMonths[0];

        $scope.selectedMonthTo = 1;
        $scope.selectedMonthToText = $scope.persianMonths[0];

        $scope.posts = [];
        loadPosts();

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        $('#select-year').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                $scope.selectedYear = value;
                loadPosts();
                // });
            }
        });

        $('#select-month-from').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthFrom = value;
                $scope.selectedMonthFromText = $scope.persianMonths[value - 1];
                loadPosts();
                // });
            }
        });

        $('#select-month-to').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthTo = value;
                $scope.selectedMonthToText = $scope.persianMonths[value - 1];
                loadPosts();
                // });
            }
        });

        function loadPosts() {
            $scope.setLoading(true);



            postService.getPosts(1396, [3, 4, 5, 6, 7, 8])
                .then(function(postPacks) {
                    console.log(postPacks);
                }, function(code) {
                    console.error(code);
                });



            $timeout(function() { //TODO: load posts...
                $scope.posts = $scope.posts.length ? $scope.posts : Array(300).join('.').split('.').map(function(x, i) {
                    return {
                        id: i,
                        data: 'data-' + i
                    };
                });

                $scope.topPostIndex = 0;
                $scope.setLoading(false);

            }, 300);
        }

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);
