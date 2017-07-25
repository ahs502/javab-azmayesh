/*global app*/
/*global angular*/
/*global sscAlert*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'UserService', 'PostService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, userService, postService) {

        $scope.postClicked = postClicked;

        $scope.maxCount = 500;

        var userInfo = userService.current(),
            userYear = userInfo.subscriptionDate.jYMD()[0],
            jYMD = (new Date()).jYMD(),
            currentYear = jYMD[0],
            currentMonth = jYMD[1];

        $scope.allYears = Array.range(currentYear, userYear);
        $scope.persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        var historyState = $rootScope.data.historyState = $rootScope.data.historyState || {};
        $scope.nationalCode = historyState.nationalCode;

        $scope.selectedYear = historyState.selectedYear || $scope.allYears[0];
        $scope.selectedMonthFrom = historyState.selectedMonthFrom || currentMonth;
        $scope.selectedMonthFromText = $scope.persianMonths[$scope.selectedMonthFrom - 1];
        $scope.selectedMonthTo = historyState.selectedMonthTo || currentMonth;
        $scope.selectedMonthToText = $scope.persianMonths[$scope.selectedMonthTo - 1];

        var postCache = $rootScope.data.postCache = $rootScope.data.postCache || [];
        $scope.posts = [];
        loadPosts(true).then(function() {
            $timeout(function() {
                $window.scrollTo($window.scrollX, historyState.scrollY);
            });
        });

        $scope.$watch('nationalCode', function() {
            historyState.nationalCode = $scope.nationalCode;
        });

        $window.addEventListener('scroll', windowScrollHandler);
        $scope.$on('$destroy', function() {
            $window.removeEventListener('scroll', windowScrollHandler);
        });

        function windowScrollHandler(event) {
            historyState.scrollY = $window.scrollY;
        }

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        angular.element('#select-year').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                $scope.selectedYear = historyState.selectedYear = value;
                loadPosts();
                // });
            }
        });

        angular.element('#select-month-from').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthFrom = historyState.selectedMonthFrom = value;
                $scope.selectedMonthFromText = $scope.persianMonths[value - 1];
                var selectedMonthTo = $scope.selectedMonthTo > $scope.selectedMonthFrom ? $scope.selectedMonthTo : $scope.selectedMonthFrom;
                if (selectedMonthTo != $scope.selectedMonthTo)
                    angular.element('#select-month-to').dropdown('set selected', $scope.selectedMonthTo = historyState.selectedMonthTo = selectedMonthTo);
                loadPosts();
                // });
            }
        });

        angular.element('#select-month-to').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthTo = historyState.selectedMonthTo = value;
                $scope.selectedMonthToText = $scope.persianMonths[value - 1];
                var selectedMonthFrom = $scope.selectedMonthFrom < $scope.selectedMonthTo ? $scope.selectedMonthFrom : $scope.selectedMonthTo;
                if (selectedMonthFrom != $scope.selectedMonthFrom)
                    angular.element('#select-month-from').dropdown('set selected', $scope.selectedMonthFrom = historyState.selectedMonthFrom = selectedMonthFrom);
                loadPosts();
                // });
            }
        });

        function loadPosts(forceReload) {
            $scope.setLoading(true);

            var yearPostCache = postCache[$scope.selectedYear] = postCache[$scope.selectedYear] || [],
                months = Array.range($scope.selectedMonthFrom, $scope.selectedMonthTo),
                filteredMonths = months.filter(function(month) {
                    return !yearPostCache[month];
                });
            if (forceReload && $scope.selectedYear == currentYear &&
                months.indexOf(currentMonth) >= 0 && filteredMonths.indexOf(currentMonth) < 0) {
                filteredMonths.push(currentMonth);
            }

            var promise;
            if (Object.keys(filteredMonths).length) {
                promise = postService.getPosts($scope.selectedYear, filteredMonths)
                    .catch(function(code) {
                        sscAlert(code);
                        $scope.redirectToLoginPageIfRequired(code);
                    });
            }
            else {
                promise = Promise.resolve({});
            }

            return promise
                .then(function(postPacks) {
                    $scope.posts = [];
                    for (var month = 12; month >= 1; month--)
                        if (months.indexOf(month) >= 0) {
                            yearPostCache[month] = postPacks[$scope.selectedYear + '/' + month] || yearPostCache[month] || [];
                            $scope.posts = $scope.posts.concat(yearPostCache[month]);
                        }
                        // $scope.topPostIndex = 0;
                })
                .then(function() {
                    $scope.setLoading(false);
                });
        }

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);
