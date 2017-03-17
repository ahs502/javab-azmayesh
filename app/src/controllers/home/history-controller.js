/*global app*/

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

        function findHistory() {
            //TODO: check for validity
            $scope.findingHistory = true;
            historyService.findHistory($scope.nationalCode, otpId, requestCode, $scope.otp)
                .then(function(patient) {
                    $rootScope.data.patient = patient;
                    $state.go('history', {
                        nationalCode: $scope.nationalCode
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.findingHistory = false;
                    alert(code);
                });
        }

    }
]);
