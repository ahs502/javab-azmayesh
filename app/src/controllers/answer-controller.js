/*global app*/
/*global persianDate*/
/*global toPersianNumber*/
/*global Clipboard*/
/*global simpleQueryString*/
/*global sscAlert*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$location', '$state', '$stateParams', 'HistoryService',
    function($rootScope, $scope, $timeout, $window, $location, $state, $stateParams, historyService) {

        var printLayoutWidth = 2400;

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        $scope.pdfFileEventHandlerMaker = pdfFileEventHandlerMaker;
        $scope.copySharedUrl = copySharedUrl;

        var clipboard, url = $location.absUrl();
        url = url.slice(0, url.indexOf('#') + 2) + 'answer' + url.slice(url.indexOf('?'));

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
            viewFile: function() {
                $state.go('answer.post');
            },
            saveFile: function() {
                $state.go('answer.download');
            },
            shareFile: function() {
                clipboard = undefined;
                $scope.sharedUrl = url;
                $scope.sharingViaSms = 'sms:;?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + 'نتایج آزمایش ' + $scope.answer.patientNam + 'در لینک زیر:\n\n' + url
                });
                $scope.sharingViaEmail = 'mailto:?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد:\n\n' + url,
                    subject: 'نتایج آزمایش ' + $scope.answer.patientName
                });
                $scope.sharingViaTelegram = 'https://telegram.me/share/url?' + simpleQueryString.stringify({
                    text: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد.',
                    url: url
                });
                $state.go('answer.share');
            },
            printFile: function() {
                $scope.printing = true;
                Promise.all([
                    new Promise(function(resolve, reject) {
                        $timeout(resolve, 1000);
                    }),
                    new Promise(function(resolve, reject) {
                        var pdfFiles = $scope.answer.files.filter(function(file) {
                            return file.material === 'pdf';
                        });
                        if (pdfFiles.length) {
                            checkIfAllPdfFilesLoaded(function() {
                                Promise.all(pdfFiles.map(function(pdfFile) {
                                    return Promise.all(pdfFile.model.pages.map(function(page) {
                                        return page.createDataURL(printLayoutWidth);
                                    })).then(function(dataUrls) {
                                        pdfFile.dataUrls = dataUrls;
                                    });
                                })).then(resolve, reject);
                            });
                        }
                        else {
                            resolve();
                        }
                    })
                ]).then(function() {
                    $window.print();
                }, function(reason) {
                    console.log("Coulldn't print:", reason);
                }).then(function() {
                    $timeout(function() {
                        $scope.printing = false;
                    });
                });
            },
            getPrintingStatus: function() {
                return $scope.printing;
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
                $scope.loading = false;
                sscAlert(code);
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

        function copySharedUrl() {
            if (!clipboard) {
                clipboard = new Clipboard('#ja-shared-url-copy');
                clipboard.on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboard.on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

        function pdfFileEventHandlerMaker(file) {
            return function(event) {
                switch (event.event) {
                    case 'error':
                        file.error = event.error;
                        break;
                    case 'render start':
                        delete file.error;
                        break;
                }
                file.loaded = ['loaded pages', 'render start', 'render finish', 'error'].indexOf(file.model.state) >= 0;
                checkIfAllPdfFilesLoaded();
            };
        }

        var allPdfFilesLoadedEventHandlers = [],
            allPdfFilesLoaded = false;

        function checkIfAllPdfFilesLoaded(eventHandler) {
            if (typeof eventHandler === 'function' && allPdfFilesLoadedEventHandlers.indexOf(eventHandler) < 0) {
                allPdfFilesLoaded && eventHandler();
                allPdfFilesLoaded || allPdfFilesLoadedEventHandlers.push(eventHandler);
            }
            if (!allPdfFilesLoaded && $scope.answer) {
                allPdfFilesLoaded = $scope.answer.files.reduce(function(result, file, index) {
                    if (file.material !== 'pdf') return result;
                    return result && file.loaded;
                }, true);
                allPdfFilesLoaded && allPdfFilesLoadedEventHandlers.forEach(function(eventHandler) {
                    eventHandler();
                });
            }
        }

    }
]);
