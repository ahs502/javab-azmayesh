/*global app*/
/*global $*/

app.controller('AdminHomeController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, userService, adminService) {

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.fullName) || ' ');

        $scope.submenus = [
            'صفحه اصلی',
            'بازخوردهای صفحه تماس با ما',
            'رسیدهای ثبت شده پرداخت کارت به کارت',
            'درخواست های عضویت جدید',
            'پیامک های ارسال نشده',
            'آمار و نمودارهای وبسایت',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        var submenuSelector = $('#ja-admin-home-submenu-selector');
        submenuSelector.dropdown({
            onChange: function(value, text) {
                $timeout(function() {
                    $scope.selectedSubmenu = value;
                    $scope.selectedSubmenuText = text;
                });
            }
        });
        submenuSelector.dropdown('set selected', 0);

    }
]);
