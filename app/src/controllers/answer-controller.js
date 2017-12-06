/*global app*/
/*global persianDate*/
/*global toPersianNumber*/
/*global Clipboard*/
/*global simpleQueryString*/
/*global sscAlert*/
/*global getEnvironmentProperties*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$location', '$state', '$stateParams', 'HistoryService', 'UserService',
    function($rootScope, $scope, $timeout, $window, $location, $state, $stateParams, historyService, userService) {

        var printLayoutWidth = 2400; // px

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        $scope.pdfFileEventHandlerMaker = pdfFileEventHandlerMaker;
        $scope.copySharedUrl = copySharedUrl;

        $rootScope.homeState = 'answer.post';

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
                else if (previousState === 'panel.post') {
                    $rootScope.data.postCache = previousStateData.postCache;
                    $rootScope.data.historyState = previousStateData.historyState;
                    $rootScope.data.panelPostData = previousStateData.panelPostData;
                    userService.setUserSession(previousStateData.userSession);
                    $state.go(previousState);
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
                var env = getEnvironmentProperties();
                $scope.showMobileShareOptions = !env.desktop;
                $scope.sharingViaSms = 'sms:' + (env.iOS ? '&' : '?') + simpleQueryString.stringify({
                    body: 'سلام!\n' + 'نتایج آزمایش ' + $scope.answer.patientName + ' در لینک زیر:\n\n' + url
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
                    $timeout(function() {
                        $timeout(function() {
                            $window.print();
                        });
                    });
                }, function(reason) {
                    console.error("Coulldn't print:", reason);
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
            goToAnswerAbout: function() {
                $state.go('answer.about');
            },
            goToAnswerContact: function() {
                $state.go('answer.contact');
            },
            getAsnwerLoadedStatus: function() {
                return !!$scope.answer;
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
                $scope.loading = false;
            }, function(code) {
                $scope.loading = false;
                $scope.setBackHandler();
                $scope.setMenuHandlers();
                $scope.setHeaderHandlers();
                $scope.setFooterHandlers();
                sscAlert(code);
                $scope.showMessage('خطا در بارگذاری نتیجه آزمایش',
                        "به دلیل بروز خطا، جواب آزمایش مورد نظر شما بارگذاری نشد.\nلطفاً مجدداً تلاش بفرمایید.")
                    .then(function() {
                        $state.go('home.find');
                    });
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
