/*global app*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', 'UserService',
    function($rootScope, $scope, $state, $stateParams, userService) {

        $scope.confirmRegisteration = confirmRegisteration;

        $scope.username = $stateParams.username;

        $scope.confirmingRegisteration = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        function confirmRegisteration() {
            $scope.confirmingRegisteration = true;
            return userService.registerConfirm($scope.username, $scope.validationCode)
                .then(function() {
                    $scope.confirmingRegisteration = false;
                    $state.go('lab.signedup');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.confirmingRegisteration = false;
                    alert(code);
                });
        }

    }
]);
