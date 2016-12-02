/*global app*/
/*global $*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.changePassword = changePassword;

        $scope.changingPassword = false;

        // $scope.oldPassword
        // $scope.newPassword
        // $scope.newPasswordAgain

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

        function changePassword() {
            //TODO: check for validity then send request to server...
            $scope.changingPassword = true;
            userService.editPassword($rootScope.data.labData.username, $scope.oldPassword, $scope.newPassword)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'change password'
                    });
                    $scope.changingPassword = false;
                }, function(code) {
                    $scope.changingPassword = false;
                    alert(code);
                });
        }

    }
]);
