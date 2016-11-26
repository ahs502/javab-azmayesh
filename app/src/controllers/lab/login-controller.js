/*global app*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        function login() {
            //TODO: check for validity
            $scope.loggingIn = true;
            return userService.login($scope.username, $scope.password)
                .then(function() {
                    $state.go('panel.home');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.loggingIn = false;
                    alert(code);
                });
        }

    }
]);
