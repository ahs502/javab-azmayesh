/*global app*/

app.controller('AdminSmsController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setPageTitle('پیامک ها');

        $scope.defineSubmenus([
            'ارسال پیامک آزمایشی',
            'فهرست تمام شماره تلفن های استفاده شده',
            'شارژ باقیمانده نیک اِس اِم اِس',
            'پیامک های ارسال نشده',
        ]);
        $scope.setSubmenu($scope.submenu = 0);
        $scope.setSubmenuHandler(function(value, text) {
            $scope.submenu = value;
        });

    }
]);
