/*global app*/

app.controller('HomeHistoryController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.findHistory = findHistory;

        $scope.findingHistory = false;

        $scope.onBackClicked(function() {
            $state.go('home.otp');
        });

        function findHistory() {
            $scope.findingHistory = true;
            $timeout(function() {
                $state.go('history');
                $scope.findingHistory = true;
            }, 500);
        }

    }
]);
