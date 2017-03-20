/*global app*/
/*global $*/
/*global persianDate*/
/*global toPersianNumber*/

app.controller('AnswerController', ['$rootScope', '$scope', '$state', '$stateParams',
    function($rootScope, $scope, $state, $stateParams) {

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;
        $scope.previousState = $stateParams.previousState;
        var previousStateData = $stateParams.previousStateData;

        //TODO: remove these lines later
        // $scope.testDate = persianDate().format('L'); //TODO: ???
        // $scope.receiptNumber = toPersianNumber(6140); //TODO: ???

        $scope.setBackHandler(function() {
            if ($scope.previousState === 'history') {
                $rootScope.data.patientInfo = previousStateData.patientInfo;
                $rootScope.data.history = previousStateData.history;
                $state.go($scope.previousState, {
                    nationalCode: $scope.nationalCode
                });
            }
            else {
                $state.go($scope.previousState);
            }
        });

        $scope.setMenuHandlers({
            saveFile: function() {
                // save file ...
            },
            shareFile: function() {
                // share file ...
            },
            printFile: function() {
                // print file ...
            },
            goToLaboratory: function() {
                //$state.go('...');
            },
            laboratoryName: '...' || $scope.answer.laboratoryName,
        });

        $scope.setHeaderHandlers({
            paitentName: '...' || $scope.answer.paitentName
        });

        $scope.setFooterHandlers({
            testDate: '...' || persianDate($scope.answer.testDate).format('L'),
            testNumber: '...' || toPersianNumber($scope.answer.testNumber)
        });

        $('#answer-test-number').popup({
            inline: true,
            transition: 'scale'
        });

        $('#answer-laboratory-name').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
