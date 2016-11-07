/*global app*/
/*global $*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

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
            $timeout(function() { //TODO: send request to change password
                $state.go('panel.account.confirm', {
                    action: 'change password'
                });
                $scope.changingPassword = false;
            }, 400);
        }

    }
]);
