/*global app*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.finishRegisteration = finishRegisteration;

        $scope.username = $stateParams.username;

        $scope.registering = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        function finishRegisteration() {
            //TODO: check for validity
            $scope.registering = true;
            $timeout(function() {
                $state.go('lab.signedup');
                // $scope.registering = false;
            }, 400);
        }

    }
]);
