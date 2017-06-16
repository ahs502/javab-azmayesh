/*global app*/

app.controller('AdminPatientController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('بیمارها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

    }
]);
