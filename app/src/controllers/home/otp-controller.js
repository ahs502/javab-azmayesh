/*global app*/

app.controller('HomeOtpController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        function sendOtp() {
            $scope.sendingOtp = true;
            $timeout(function() {
                $state.go('home.history');
                $scope.sendingOtp = true;
            }, 500);
        }

    }
]);
