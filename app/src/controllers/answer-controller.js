/*global app*/
/*global $*/
/*global persianDate*/
/*global toPersianNumber*/

app.controller('AnswerController', ['$rootScope', '$scope', '$state', '$stateParams',
    function($rootScope, $scope, $state, $stateParams) {

        $scope.nationalCode = $stateParams.nationalCode;
        $scope.testNumber = $stateParams.testNumber;
        $scope.previousState = $stateParams.previousState;

        $scope.answer = $rootScope.data.answer;

        //TODO: remove these lines later
        // $scope.testDate = persianDate().format('L'); //TODO: ???
        // $scope.receiptNumber = toPersianNumber(6140); //TODO: ???

        $scope.setBackHandler(function() {
            var params = $scope.previousState === 'history' ? {
                nationalCode: $scope.nationalCode
            } : {};
            $state.go($scope.previousState, params);
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
            laboratoryName: $scope.answer.laboratoryName,
        });

        $scope.setHeaderHandlers({
            paitentName: $scope.answer.paitentName
        });

        $scope.setFooterHandlers({
            testDate: persianDate($scope.answer.testDate).format('L'),
            testNumber: toPersianNumber($scope.answer.testNumber)
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
