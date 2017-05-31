/*global app*/

app.controller('AdminLaboratoryController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('آزمایشگاه ها');

        $scope.laboratories = [];
        $scope.setLoading(true);
        adminService.getAllLaboratories().then(function(laboratories) {
            $scope.laboratories = laboratories;
            $scope.setLoading(false);
        }, function(code) {
            alert(code);
            $scope.setLoading(false);
        });

    }
]);
