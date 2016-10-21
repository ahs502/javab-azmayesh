/*global app*/

app.controller('HomeContactController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

    }
]);
