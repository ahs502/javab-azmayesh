/*global app*/

app.controller('HomeOtpController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        function sendOtp() {
            //TODO: check for validity
            $scope.sendingOtp = true;
            $timeout(function() {
                $state.go('home.history', {
                    nationalCode: $scope.nationalCode
                });
                // $scope.sendingOtp = false;
            }, 300);
        }

    }
]);
