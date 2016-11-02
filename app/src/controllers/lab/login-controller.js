/*global app*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.login = login;

        $scope.loggingIn = false;

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        function login() {
            //TODO: check for validity
            $scope.loggingIn = true;
            $timeout(function() { //TODO: try to login
                $state.go('panel.home');
                // $scope.loggingIn = false;
            }, 300);
        }

    }
]);
