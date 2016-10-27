/*global app*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.username = $stateParams.username;

        $scope.sendingRegisterationForm = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.labName
        //$scope.mobilePhoneNumber
        //$scope.phoneNumber
        //$scope.address
        //$scope.postalCode
        //$scope.websiteAddress
        //$scope.username
        //$scope.password
        //$scope.passwordAgain
        //$scope.acceptRules

        function sendRegisterationForm() {
            //TODO: check for validity
            $scope.sendingRegisterationForm = true;
            $timeout(function() {
                $state.go('lab.validate', {
                    username: $scope.username
                });
                // $scope.sendingRegisterationForm = false;
            }, 400);
        }

    }
]);
