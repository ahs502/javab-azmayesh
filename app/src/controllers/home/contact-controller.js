/*global app*/

app.controller('HomeContactController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

    }
]);
