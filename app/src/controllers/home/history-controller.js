/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('HomeHistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $stateParams, $timeout, historyService) {

        $scope.findHistory = findHistory;

        $scope.nationalCode = $stateParams.nationalCode;
        var otpId = $stateParams.otpId;
        var requestCode = $stateParams.requestCode;

        $scope.findingHistory = false;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        //$scope.otp

        $scope.vs = new ValidationSystem($scope)
            .field('otp', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function findHistory() {
            if (!$scope.vs.validate()) return;

            $scope.findingHistory = true;
            historyService.findHistory($scope.nationalCode, otpId, requestCode, $scope.otp)
                .then(function(data) {
                    $rootScope.data.patientInfo = data.patientInfo;
                    $rootScope.data.history = data.history;
                    $state.go('history', {
                        nationalCode: $scope.nationalCode
                    });
                }, function(code) {
                    $scope.findingHistory = false;
                    sscAlert(code);
                });
        }

    }
]);
