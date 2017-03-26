/*global app*/
/*global $*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        // We have: $rootScope.data.post

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('محسن کامرانی');

    }
]);
