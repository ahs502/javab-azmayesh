/*global app*/
/*global $*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setBackHandler(function () {
            $state.go('panel.history');
        });

        $scope.setPageTitle('آرمان لارآبادی');

    }
]);
