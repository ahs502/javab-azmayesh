/*global app*/
/*global $*/

app.controller('AdminHomeController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, userService, adminService) {

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.fullName) || ' ');

        $scope.setBackHandler($scope.menuHandlers.logout);

        $scope.submenus = [
            'صفحه اصلی',
            'پیامک های ارسال نشده',
            'درخواست های عضویت جدید',
            'رسیدهای ثبت شده پرداخت کارت به کارت',
            'بازخوردهای صفحه تماس با ما',
            'آمار و نمودارهای وبسایت',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        $('#ja-admin-home-submenu-selector')
            .dropdown({
                onChange: function(value, text) {
                    $timeout(function() {
                        $scope.selectedSubmenu = value;
                        $scope.selectedSubmenuText = text;
                    });
                }
            })
            .dropdown('set selected', 0);

    }
]);
