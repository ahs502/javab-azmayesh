/*global app*/
/*global ValidationSystem*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4)
            ]);

        function login() {
            if (!$scope.vs.validate()) return;

            $scope.loggingIn = true;
            return userService.login($scope.username, $scope.password)
                .then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                    $state.go('panel.home');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.loggingIn = false;
                    alert(code);
                });
        }

    }
]);
