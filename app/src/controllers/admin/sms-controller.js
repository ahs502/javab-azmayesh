/*global app*/
/*global $*/

app.controller('AdminSmsController', ['$scope', '$rootScope', '$state', '$timeout',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $timeout,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('پیامک ها');

        $scope.submenus = [
            'ارسال پیامک آزمایشی',
            'فهرست تمام شماره تلفن های استفاده شده',
            'شارژ باقیمانده نیک اِس اِم اِس',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        var submenuSelector = $('#ja-admin-sms-submenu-selector');
        submenuSelector.dropdown({
            onChange: function(value, text) {
                $timeout(function() {
                    $scope.selectedSubmenu = value;
                    $scope.selectedSubmenuText = text;
                });
            }
        });
        submenuSelector.dropdown('set selected', 0);

        $scope.waiting = false;

        //$scope.phoneNumber
        //$scope.message

        $scope.sendDummySms = sendDummySms;
        $scope.message = 'سامانه اینترنتی جواب آزمایش\nJavabAzmayesh.ir';

        function sendDummySms() {
            $scope.waiting = true;
            adminService.sendDummySms($scope.phoneNumber, $scope.message)
                .then(function() {
                    $scope.waiting = false;
                }, function(code) {
                    alert(code);
                    $scope.waiting = false;
                });
        }

    }
]);
