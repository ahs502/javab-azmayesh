/*global app*/

app.controller('HistoryController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.otp');
        });

    }
]);
