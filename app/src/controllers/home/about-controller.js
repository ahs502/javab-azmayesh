/*global app*/

app.controller('HomeAboutController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

    }
]);
