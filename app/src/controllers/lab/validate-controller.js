/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

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

        $scope.vs = new ValidationSystem($scope)
            .field('validationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirmRegisteration() {
            if (!$scope.vs.validate()) return;

            $scope.confirmingRegisteration = true;
            return userService.registerConfirm($scope.username, $scope.validationCode)
                .then(function() {
                    $scope.confirmingRegisteration = false;
                    $state.go('lab.signedup');
                }, function(code) {
                    $scope.confirmingRegisteration = false;
                    sscAlert(code);
                });
        }

    }
]);
