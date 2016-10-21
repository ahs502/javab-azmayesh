/*global app*/

app.controller('HomeFindController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false;

        $scope.setBackHandler(false);

        //$scope.nationalCode
        //$scope.testNumber

        function seeAnswer() {
            //TODO: check for validity
            $scope.findingAnswer = true;
            $timeout(function() { //TODO: resolve answer
                return {
                    testNumber: 1234,
                    nationalCode: '1234567890',
                    paitentName: 'حسام شکروی',
                    testDate: new Date(),
                    answerDate: new Date(),
                    laboratoryName: "آزمایشگاه دکتر شاهپوری"
                };
            }, 400).then(function(answer) {
                //TODO: validate result
                $rootScope.data.answer = answer;
                $state.go('answer', {
                    nationalCode: $scope.nationalCode,
                    testNumber: $scope.testNumber,
                    previousState: 'home.find'
                });
            });
        }

    }
]);
