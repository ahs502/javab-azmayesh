/*global app*/

app.controller('HistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.postClicked = postClicked;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.patient = $rootScope.data.patient;
        console.log($scope.patient)

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        $scope.setMenuHandlers(false);

        $scope.setHeaderHandlers({
            paitentName: $scope.patient.fullName
        });

        $scope.setFooterHandlers(false);

        function postClicked(post) {
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
                    testNumber: test.testNumber,
                    previousState: 'history'
                });
            });
        }

    }
]);
