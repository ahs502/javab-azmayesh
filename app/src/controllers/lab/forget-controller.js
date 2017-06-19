/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('LabForgetController', ['$rootScope', '$scope', '$state', '$timeout', 'UserService',
    function($rootScope, $scope, $state, $timeout, userService) {

        $scope.restorePassword = restorePassword;

        $scope.restoringPassword = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.username
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function restorePassword() {
            if (!$scope.vs.validate()) return;

            $scope.restoringPassword = true;
            return userService.restorePassword($scope.username, $scope.mobilePhoneNumber)
                .then(function() {
                    $state.go('lab.password');
                }, function(code) {
                    $scope.restoringPassword = false;
                    sscAlert(code);
                });
        }

    }
]);
