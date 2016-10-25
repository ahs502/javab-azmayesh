/*global app*/

app.controller('HomeAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);
