/*global app*/
/*global $*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setBackHandler(function () {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

    }
]);
