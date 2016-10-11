/*global app*/

app.controller('HomeFindController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false;
        
        $scope.onBackClicked(undefined);
        
        //$scope.nationalCode
        //$scope.receiptNumber

        function seeAnswer() {
            $scope.findingAnswer = true;
            $timeout(function() {
                $state.go('answer');
                $scope.findingAnswer = true;
            }, 500);
        }

    }
]);
