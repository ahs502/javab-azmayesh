/*global app*/

app.controller('HomeAboutController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

    }
]);
