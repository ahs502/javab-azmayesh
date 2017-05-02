/*global app*/
/*global persianDate*/
/*global toPersianNumber*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$state', '$stateParams', 'HistoryService',
    function($rootScope, $scope, $timeout, $window, $state, $stateParams, historyService) {

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        var previousState = $stateParams.previousState,
            previousStateData = $stateParams.previousStateData;

        $scope.setBackHandler(function() {
            if (!$state.is('answer.post'))
                $state.go('answer.post');
            else {
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
            }
        });

        $scope.setMenuHandlers({
            saveFile: function() {
                $state.go('answer.download');
            },
            shareFile: function() {
                // share file ...
            },
            printFile: function() {
                // print file ...
            },
            goToLaboratory: function() {
                $state.go('answer.laboratory');
            },
            goToLaboratoryWebsite: function() {
                var url = $scope.answer && $scope.answer.lab && $scope.answer.lab.websiteAddress;
                if (url) {
                    if (url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0)
                        url = 'http://' + url;
                    window.open(url, '_blank').focus();
                }
            },
            labGetter: function() {
                return ($scope.answer && $scope.answer.lab) || {};
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

        // $('#answer-test-number').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        // $('#answer-laboratory-name').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        $state.go('answer.post');

        $scope.loading = true;
        historyService.loadAnswer($scope.nationalCode, $scope.postCode)
            .then(function(answer) {
                answer.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + $scope.nationalCode +
                        '&n=' + $scope.postCode + '&f=' + file.serverName;
                    file.urlWithoutContentType = file.url + '&t=false'; // To prevent default downloader applications to interfere.
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.answer = answer;
                $scope.loading = false;
            }, function(code) {
                //TODO: Handle errors...
                $scope.loading = false;
                alert(code);
            })
            .then(function() {
                $scope.answer = $scope.answer || {};
                $scope.answer.lab = $scope.answer.lab || {};
                $scope.labDataForDisplay = [{
                    label: 'نام آزمایشگاه',
                    value: toPersianNumber($scope.answer.lab.name)
                }, {
                    label: 'تلفن تماس',
                    value: !$scope.answer.lab ? '' : toPersianNumber($scope.answer.lab.mobilePhoneNumber + ' - ' + $scope.answer.lab.phoneNumber)
                }, {
                    label: 'آدرس',
                    value: toPersianNumber($scope.answer.lab.address)
                }, {
                    label: 'کد پستی',
                    value: toPersianNumber($scope.answer.lab.postalCode)
                }, {
                    label: 'آدرس درگاه اینترنتی',
                    value: $scope.answer.lab.websiteAddress
                }];
            });

    }
]);
