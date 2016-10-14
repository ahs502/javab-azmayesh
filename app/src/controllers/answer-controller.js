/*global app*/
/*global $*/
/*global persianDate*/
/*global toPersianNumber*/

app.controller('AnswerController', ['$scope', '$state',
    function($scope, $state) {

        $scope.paitentName = "مینا قاسمی راد";
        $scope.testDate = persianDate().format('L'); //TODO: ???
        $scope.receiptNumber = toPersianNumber(2771); //TODO: ???
        $scope.laboratoryName = "آزمایشگاه دکتر ساوجی";

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

        $scope.setMenuEvents({
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
            laboratoryName: $scope.laboratoryName,
        });

        $('#answer-receiptNumber').popup({
            inline: true,
            transition: 'scale'
        });

        $('#answer-laboratoryName').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
