/*global app*/
/*global $*/
/*global persianDate*/
/*global toPersianNumber*/

app.controller('AnswerController', ['$rootScope', '$scope', '$state', '$stateParams', 'HistoryService',
    function($rootScope, $scope, $state, $stateParams, historyService) {

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        var previousState = $stateParams.previousState,
            previousStateData = $stateParams.previousStateData;

        $scope.setBackHandler(function() {
            if (previousState === 'history') {
                $rootScope.data.patientInfo = previousStateData.patientInfo;
                $rootScope.data.history = previousStateData.history;
                $state.go(previousState, {
                    nationalCode: $scope.nationalCode
                });
            }
            else {
                $state.go(previousState || 'home.find');
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
            labNameGetter: function() {
                return $scope.answer ? $scope.answer.labName : ' ';
            },
        });

        $scope.setHeaderHandlers({
            paitentNameGetter: function() {
                return $scope.answer ? $scope.answer.patientName : ' ';
            }
        });

        $scope.setFooterHandlers({
            postDateGetter: function() {
                return $scope.answer ? persianDate($scope.answer.postDate).format('L') : ' ';
            },
            postCodeGetter: function() {
                return toPersianNumber($scope.postCode);
            }
        });

        $('#answer-test-number').popup({
            inline: true,
            transition: 'scale'
        });

        $('#answer-laboratory-name').popup({
            inline: true,
            transition: 'scale'
        });

        $scope.loading = true;
        historyService.loadAnswer($scope.nationalCode, $scope.postCode)
            .then(function(answer) {
                answer.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + $scope.nationalCode +
                        '&n=' + $scope.postCode + '&f=' + file.serverName;
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.answer = answer;
                $scope.loading = false;
            }, function(code) {
                //TODO: Handle errors...
                $scope.loading = false;
                alert(code);
            });

    }
]);
