/*global app*/
/*global sscAlert*/

app.controller('AdminPatientController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('بیمارها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.findPatientByNationalCode = findPatientByNationalCode;

        $scope.searching = false;
        $scope.showResult = false;

        function findPatientByNationalCode() {
            if (!$scope.nationalCode) return;
            $scope.searching = true;
            $scope.showResult == false;
            adminService.findPatientByNationalCode($scope.nationalCode)
                .then(function(patient) {
                    $scope.patient = patient;
                    $scope.showResult = true;
                }, function(code) {
                    $scope.showResult = false;
                    sscAlert(code);
                }).then(function() {
                    $scope.searching = false;
                });
        }

    }
]);
