/*global app*/
/*global ValidationSystem*/
/*global localStorage*/
/*global sscAlert*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        localStorage.startState = "lab.login";

        var userSession = userService.getUserPersistent();
        if (userSession) {
            userService.setUserSession(userSession);
            goForUser(userSession.userInfo);
            return;
        }

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password
        //$scope.rememberMe

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
            return userService.login($scope.username, $scope.password, $scope.rememberMe)
                .then(goForUser, function(code) {
                    $scope.loggingIn = false;
                    sscAlert(code);
                });
        }

        function goForUser(userInfo) {
            if (userInfo.userType === 'laboratory') {
                $rootScope.data.labData = userInfo;
                $state.go('panel.home');
            }
            else if (userInfo.userType === 'administrator') {
                $rootScope.data.adminData = userInfo;
                $state.go('admin.home');
            }
        }

    }
]);
