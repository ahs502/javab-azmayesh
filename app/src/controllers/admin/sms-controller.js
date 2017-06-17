/*global app*/
/*global $*/

app.controller('AdminSmsController', ['$scope', '$rootScope', '$state', '$timeout',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $timeout,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('پیامک ها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.submenus = [
            'ارسال پیامک آزمایشی',
            'فهرست تمام شماره تلفن های استفاده شده',
            'شارژ باقیمانده نیک اِس اِم اِس',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        $('#ja-admin-sms-submenu-selector')
            .dropdown({
                onChange: function(value, text) {
                    $timeout(function() {
                        $scope.selectedSubmenu = value;
                        $scope.selectedSubmenuText = text;

                        if ($scope.selectedSubmenu == 2) getNikSmsCredit();
                    });
                }
            })
            .dropdown('set selected', 0);

        $scope.waiting = false;

        //$scope.phoneNumber
        //$scope.message

        $scope.sendDummySms = sendDummySms;
        $scope.findAllPhoneNumbers = findAllPhoneNumbers;

        $scope.message = 'سامانه اینترنتی جواب آزمایش\nJavabAzmayesh.ir';
        $scope.areAllPhoneNumbersReady = false;

        function sendDummySms() {
            $scope.waiting = true;
            adminService.sendDummySms($scope.phoneNumber, $scope.message)
                .catch(function(code) {
                    alert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

        function findAllPhoneNumbers() {
            $scope.waiting = true;
            adminService.findAllPhoneNumbers()
                .then(function() {
                    $scope.areAllPhoneNumbersReady = true;
                }, function(code) {
                    alert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

        function getNikSmsCredit() {
            $scope.waiting = true;
            adminService.getNikSmsCredit()
                .then(function(credit) {
                    $scope.credit = credit;
                }, function(code) {
                    alert(code);
                }).then(function() {
                    $scope.waiting = false;
                });
        }

    }
]);
