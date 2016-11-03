/*global app*/
/*global $*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setBackHandler(function () {
            $state.go('panel.home');
        });

        $scope.setPageTitle('اطلاعات کاربری آزمایشگاه');

    }
]);
