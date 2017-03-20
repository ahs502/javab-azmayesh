/*global app*/

app.controller('HomeFindController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false; // No need to!

        $scope.setBackHandler(false);

        //$scope.nationalCode
        //$scope.testNumber

        function seeAnswer() {
            //TODO: check for validity
            $state.go('answer', {
                p: $scope.nationalCode,
                n: $scope.testNumber,
                previousState: 'home.find',
                previousStateData: null
            });
        }

    }
]);
