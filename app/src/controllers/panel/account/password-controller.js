/*global app*/
/*global ValidationSystem*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.changePassword = changePassword;

        $scope.changingPassword = false;

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

        // $scope.oldPassword
        // $scope.newPassword
        // $scope.newPasswordAgain

        $scope.vs = new ValidationSystem($scope)
            .field('oldPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
            ])
            .field('newPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPasswordAgain && $scope.newPasswordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('newPasswordAgain', [
                function(value) {
                    if (!$scope.newPassword) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPassword != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ]);

        function changePassword() {
            if (!$scope.vs.validate()) return;

            $scope.changingPassword = true;
            userService.editPassword($rootScope.data.labData.username, $scope.oldPassword, $scope.newPassword)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'change password'
                    });
                    $scope.changingPassword = false;
                }, function(code) {
                    //TODO: handle error...
                    $scope.changingPassword = false;
                    alert(code);
                });
        }

    }
]);
