/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        $scope.setBackHandler(function() {
            if ($scope.action === 'change password')
                $state.go('panel.account.password');
            else if ($scope.action === 'edit account')
                $state.go('panel.account.edit');
            else
                $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تأیید عملیات');

        // $scope.verificationCode

        $scope.vs = new ValidationSystem($scope)
            .field('verificationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirm() {
            if (!$scope.vs.validate()) return;

            $scope.confirming = true;
            userService.editConfirm($rootScope.data.labData.username, $scope.verificationCode)
                .then(function() {
                    $scope.confirming = false;
                    $scope.showMessage('عملیات با موفقیت انجام شد',
                            $scope.action === 'change password' ?
                            'رمز عبور شما با موفقیت تغییر کرد' :
                            $scope.action === 'edit account' ?
                            'اصلاحات مورد نظر با موفقیت در سامانه ثبت شدند' : '')
                        .then(function() {
                            return $scope.refreshUserData();
                        })
                        .then(function() {
                            $state.go('panel.account.summary');
                        });
                }, function(code) {
                    $scope.confirming = false;
                    sscAlert(code);
                });
        }

    }
]);
