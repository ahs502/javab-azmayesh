/*global app*/

app.controller('AdminHomeController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.fullName) || ' ');

        $scope.defineSubmenus([
            'آمار و نمودارهای وبسایت',
            'بازخوردهای صفحه تماس با ما',
            'رسیدهای ثبت شده پرداخت کارت به کارت',
        ]);
        $scope.setSubmenu($scope.submenu = 0);
        $scope.setSubmenuHandler(function(value, text) {
            $scope.submenu = value;
        });

    }
]);
