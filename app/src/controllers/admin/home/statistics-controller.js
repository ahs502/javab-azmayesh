/*global app*/
/*global sscAlert*/

app.controller('AdminHomeStatisticsController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getStatistics = getStatistics;

        getStatistics();

        function getStatistics() {
            $scope.setLoading(true);
            adminService.getStatistics()
                .then(function(stat) {
                    $scope.stat = stat;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

    }
]);
