/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('HomeOtpController', ['$rootScope', '$scope', '$state', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $timeout, historyService) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function sendOtp() {
            if (!$scope.vs.validate()) return;

            $scope.sendingOtp = true;
            historyService.generateOtp($scope.nationalCode, $scope.mobilePhoneNumber)
                .then(function(data) {
                    $state.go('home.history', {
                        nationalCode: $scope.nationalCode,
                        otpId: data.otpId,
                        requestCode: data.requestCode
                    });
                }, function(code) {
                    $scope.sendingOtp = false;
                    sscAlert(code);
                });
        }

    }
]);
