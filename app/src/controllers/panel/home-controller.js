/*global app*/
/*global $*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        // modal sample
        // $('#test-modal').modal('show');

        $scope.setLoading(true);

        $scope.setPageTitle('نام آزمایشگاه');

        $scope.setBackHandler($scope.menuHandlers.logout);

        //TODO: replace with actual data loading
        $timeout(function() {
            $scope.setLoading(false);
        }, 100);

    }
]);
