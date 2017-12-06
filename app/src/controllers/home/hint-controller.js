/*global app*/

app.controller('HomeHintController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

    }
]);
