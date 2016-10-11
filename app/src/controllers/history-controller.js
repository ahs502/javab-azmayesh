/*global app*/
/*global $*/

app.controller('HistoryController', ['$scope', '$state',
    function($scope, $state) {

        $scope.testClicked = testClicked;

        $scope.paitentName = "مینا قاسمی راد";

        $scope.onBackClicked(function() {
            $state.go('home.otp');
        });

        function testClicked(test) {
            $state.go('answer');
        }

    }
]);
