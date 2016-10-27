/*global app*/

app.controller('LabForgetController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.sendPassword = sendPassword;

        $scope.sendingPassword = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.username
        //$scope.mobilePhoneNumber

        function sendPassword() {
            //TODO: check for validity
            $scope.sendingPassword = true;
            $timeout(function() {
                $state.go('lab.password');
                // $scope.sendingPassword = false;
            }, 300);
        }

    }
]);
