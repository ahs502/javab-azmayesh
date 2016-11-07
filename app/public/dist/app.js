// AHS502 : Application javascript file :

/*
	AHS502 : Start of 'app.js'
*/

/*global angular*/

var app = angular.module('JavabAzmayesh', ['ui.router']);


/*
	AHS502 : End of 'app.js'
*/


/*
	AHS502 : Start of 'app-config.js'
*/

/*global app*/

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'home.html',
                        controller: 'HomeController',
                    },
                    menu: {
                        templateUrl: 'home/menu.html'
                    },
                    footer: {
                        templateUrl: 'home/footer.html'
                    },
                },
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home/find.html',
                controller: 'HomeFindController'
            })
            .state('home.otp', {
                url: '/otp',
                templateUrl: 'home/otp.html',
                controller: 'HomeOtpController'
            })
            .state('home.history', {
                url: '/history',
                templateUrl: 'home/history.html',
                controller: 'HomeHistoryController'
            })
            .state('home.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('history', {
                url: '/history',
                params: {
                    nationalCode: null
                },
                views: {
                    '': {
                        templateUrl: 'history.html',
                        controller: 'HistoryController'
                    },
                    header: {
                        templateUrl: 'history/header.html'
                    }
                }
            });

        $stateProvider
            .state('answer', {
                url: '/answer',
                params: {
                    nationalCode: null,
                    testNumber: null,
                    previousState: null
                },
                views: {
                    '': {
                        templateUrl: 'answer.html',
                        controller: 'AnswerController'
                    },
                    menu: {
                        templateUrl: 'answer/menu.html',
                    },
                    header: {
                        templateUrl: 'answer/header.html',
                    },
                    footer: {
                        templateUrl: 'answer/footer.html',
                    },
                }
            });

        $stateProvider
            .state('lab', {
                url: '/lab',
                views: {
                    '': {
                        templateUrl: 'lab.html',
                        controller: 'LabController',
                    },
                    menu: {
                        templateUrl: 'lab/menu.html'
                    },
                    footer: {
                        templateUrl: 'lab/footer.html'
                    },
                },
                abstract: true
            })
            .state('lab.login', {
                url: '/login',
                templateUrl: 'lab/login.html',
                controller: 'LabLoginController'
            })
            .state('lab.register', {
                url: '/register',
                params: {
                    username: null
                },
                templateUrl: 'lab/register.html',
                controller: 'LabRegisterController'
            })
            .state('lab.validate', {
                url: '/validate',
                params: {
                    username: null
                },
                templateUrl: 'lab/validate.html',
                controller: 'LabValidateController'
            })
            .state('lab.signedup', {
                url: '/signedup',
                templateUrl: 'lab/signedup.html'
            })
            .state('lab.forget', {
                url: '/forget',
                templateUrl: 'lab/forget.html',
                controller: 'LabForgetController'
            })
            .state('lab.password', {
                url: '/password',
                templateUrl: 'lab/password.html'
            })
            .state('lab.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('lab.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('panel', {
                url: '/panel',
                views: {
                    '': {
                        templateUrl: 'panel.html',
                        controller: 'PanelController',
                    },
                    menu: {
                        templateUrl: 'panel/menu.html'
                    },
                    header: {
                        templateUrl: 'panel/header.html'
                    },
                },
                abstract: true
            })
            .state('panel.home', {
                url: '/home',
                templateUrl: 'panel/home.html',
                controller: 'PanelHomeController'
            })
            .state('panel.history', {
                url: '/history',
                templateUrl: 'panel/history.html',
                controller: 'PanelHistoryController'
            })
            .state('panel.post', {
                url: '/post',
                templateUrl: 'panel/post.html',
                controller: 'PanelPostController'
            })
            .state('panel.send', {
                url: '/send',
                templateUrl: 'panel/send.html',
                controller: 'PanelSendController'
            })
            .state('panel.balance', {
                url: '/balance',
                templateUrl: 'panel/balance.html',
                controller: 'PanelBalanceController'
            })
            .state('panel.account', {
                url: '/account',
                templateUrl: 'panel/account.html',
                controller: 'PanelAccountController',
                abstract: true
            })
            .state('panel.account.summary', {
                url: '/summary',
                templateUrl: 'panel/account/summary.html',
                controller: 'PanelAccountSummaryController'
            })
            .state('panel.account.edit', {
                url: '/edit',
                templateUrl: 'panel/account/edit.html',
                controller: 'PanelAccountEditController'
            })
            .state('panel.account.password', {
                url: '/password',
                templateUrl: 'panel/account/password.html',
                controller: 'PanelAccountPasswordController'
            })
            .state('panel.account.confirm', {
                url: '/confirm',
                params: {
                    action: null
                },
                templateUrl: 'panel/account/confirm.html',
                controller: 'PanelAccountConfirmController'
            });

        $urlRouterProvider.otherwise('/home/find');

        // $locationProvider.html5Mode(true);

    }
]);


/*
	AHS502 : End of 'app-config.js'
*/


/*
	AHS502 : Start of 'app-run.js'
*/

/*global app*/
/*global $*/

app.run(['$rootScope', '$state', '$stateParams', '$window',
    function($rootScope, $state, $stateParams, $window) {

        // No need to initial loader anymore
        $('#ja-initial-loader').hide();
        $('#ja-main-site-content').show();
        $('#ja-sidebar-menu').show();

        $state.go('home.find');
        // $state.go('panel.account.summary');
        // $state.go('panel.home');

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {

                //event.preventDefault(); 
                //...

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

                //...

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);


/*
	AHS502 : End of 'app-run.js'
*/


/*
	AHS502 : Start of 'answer-controller.js'
*/

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


/*
	AHS502 : End of 'answer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.testClicked = testClicked;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.paitentName = $rootScope.data.paitentName;
        $scope.paitentTests = $rootScope.data.paitentTests;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        $scope.setMenuHandlers(false);

        $scope.setHeaderHandlers({
            paitentName: $scope.paitentName
        });

        $scope.setFooterHandlers(false);

        function testClicked(test) {
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


/*
	AHS502 : End of 'history-controller.js'
*/


/*
	AHS502 : Start of 'home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToHomeAbout: function() {
                $state.go('home.about', {
                    previousState: $state.current
                });
            },
            goToHomeContact: function() {
                $state.go('home.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

        $('#home-contact-us').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);


/*
	AHS502 : End of 'home-controller.js'
*/


/*
	AHS502 : Start of 'lab-controller.js'
*/

/*global app*/
/*global $*/

app.controller('LabController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToLabRegister: function() {
                $state.go('lab.register');
            },
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToLabAbout: function() {
                $state.go('lab.about', {
                    previousState: $state.current
                });
            },
            goToLabContact: function() {
                $state.go('lab.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);


/*
	AHS502 : End of 'lab-controller.js'
*/


/*
	AHS502 : Start of 'master-controller.js'
*/

/*global app*/
/*global $*/

app.controller('MasterController', ['$scope', '$rootScope', '$window',
    function($scope, $rootScope, $window) {

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        function setBackHandler(handler) {
            $scope.backHandler = handler;
        }

        function setMenuHandlers(handlerObject) {
            $scope.menuHandlers = handlerObject;
        }

        function setHeaderHandlers(handlerObject) {
            $scope.headerHandlers = handlerObject;
        }

        function setFooterHandlers(handlerObject) {
            $scope.footerHandlers = handlerObject;
        }

        function toggleMenu() {
            $('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        }

    }
]);


/*
	AHS502 : End of 'master-controller.js'
*/


/*
	AHS502 : Start of 'panel-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$interval',
    function($scope, $rootScope, $state, $stateParams, $timeout, $interval) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.loading = $scope.loadingMessage = false;

        refreshUserDataProvider(false)();

        // Refresh user data every 1 minute
        $interval(refreshUserDataProvider(true), 60000);

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToSendResults: function() {
                $state.go('panel.send');
            },
            goToResultsHistory: function() {
                $state.go('panel.history');
            },
            goToChargeAccount: function() {
                $state.go('panel.balance');
            },
            goToUserAccount: function() {
                $state.go('panel.account.summary');
            },
            logout: function() {
                //...
                //TODO: logout
                //...
                $state.go('lab.login');
                console.log('logout');
            }
        });

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        function setLoading(loading) {
            $scope.loading = loading;
            $scope.loadingMessage = false;
            loading && $timeout(function() {
                $scope.loadingMessage = true;
            }, 1500);
        }

        function setPageTitle(title) {
            headerHandlers.pageTitle = title;
        }

        function refreshUserDataProvider(silent) {
            return function() {
                silent || $scope.setLoading(true);
                return $timeout(function() { //TODO: Initialize lab info from logged-in user data...

                    $rootScope.data.labData = {
                        userData: {
                            labName: 'آزمایشگاه دکتر میر اسدی',
                            mobilePhoneNumber: '09122343454',
                            phoneNumber: '02153647586',
                            address: 'تهران - خ سادات علوی - کوچه صابری - پلاک 217 - واحد 4',
                            postalCode: '5539110823',
                            websiteAddress: 'www.mirasadilab.ir',
                            username: 'drmirasadi'
                        },
                    };

                    silent || $scope.setLoading(false);
                }, 400);
            };
        }

    }
]);


/*
	AHS502 : End of 'panel-controller.js'
*/


/*
	AHS502 : Start of 'common/about-controller.js'
*/

/*global app*/

app.controller('CommonAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/about-controller.js'
*/


/*
	AHS502 : Start of 'common/contact-controller.js'
*/

/*global app*/

app.controller('CommonContactController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/contact-controller.js'
*/


/*
	AHS502 : Start of 'home/find-controller.js'
*/

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


/*
	AHS502 : End of 'home/find-controller.js'
*/


/*
	AHS502 : Start of 'home/history-controller.js'
*/

/*global app*/

app.controller('HomeHistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.findHistory = findHistory;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.findingHistory = false;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        //$scope.otp

        function findHistory() {
            //TODO: check for validity
            $scope.sendingOtp = true;
            $timeout(function() {
                return {
                    paitentName: "علی رضا محمودی",
                    paitentTests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(function(t) {
                        return {
                            laboratoryName: "آمایشگاه رازی مرکزی",
                            testNumber: 6822,
                            testDate: new Date(),
                            answerDate: new Date(),
                            id: t
                        };
                    })
                };
            }, 400).then(function(res) {
                //TODO: validate result
                $rootScope.data.paitentName = res.paitentName;
                $rootScope.data.paitentTests = res.paitentTests;
                $state.go('history', {
                    nationalCode: $scope.nationalCode
                });
            });
        }

    }
]);


/*
	AHS502 : End of 'home/history-controller.js'
*/


/*
	AHS502 : Start of 'home/otp-controller.js'
*/

/*global app*/

app.controller('HomeOtpController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        function sendOtp() {
            //TODO: check for validity
            $scope.sendingOtp = true;
            $timeout(function() {
                $state.go('home.history', {
                    nationalCode: $scope.nationalCode
                });
                // $scope.sendingOtp = false;
            }, 300);
        }

    }
]);


/*
	AHS502 : End of 'home/otp-controller.js'
*/


/*
	AHS502 : Start of 'lab/forget-controller.js'
*/

/*global app*/

app.controller('LabForgetController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.sendPassword = sendPassword;

        $scope.sendingPassword = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.username
        //$scope.mobilePhoneNumber

        function sendPassword() {
            //TODO: check for validity
            $scope.sendingPassword = true;
            $timeout(function() {
                $state.go('lab.password');
                // $scope.sendingPassword = false;
            }, 300);
        }

    }
]);


/*
	AHS502 : End of 'lab/forget-controller.js'
*/


/*
	AHS502 : Start of 'lab/login-controller.js'
*/

/*global app*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.login = login;

        $scope.loggingIn = false;

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        function login() {
            //TODO: check for validity
            $scope.loggingIn = true;
            $timeout(function() { //TODO: try to login
                $state.go('panel.home');
                // $scope.loggingIn = false;
            }, 300);
        }

    }
]);


/*
	AHS502 : End of 'lab/login-controller.js'
*/


/*
	AHS502 : Start of 'lab/register-controller.js'
*/

/*global app*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.username = $stateParams.username;

        $scope.sendingRegisterationForm = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.labName
        //$scope.mobilePhoneNumber
        //$scope.phoneNumber
        //$scope.address
        //$scope.postalCode
        //$scope.websiteAddress
        //$scope.username
        //$scope.password
        //$scope.passwordAgain
        //$scope.acceptRules

        function sendRegisterationForm() {
            //TODO: check for validity
            $scope.sendingRegisterationForm = true;
            $timeout(function() {
                $state.go('lab.validate', {
                    username: $scope.username
                });
                // $scope.sendingRegisterationForm = false;
            }, 400);
        }

    }
]);


/*
	AHS502 : End of 'lab/register-controller.js'
*/


/*
	AHS502 : Start of 'lab/validate-controller.js'
*/

/*global app*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.finishRegisteration = finishRegisteration;

        $scope.username = $stateParams.username;

        $scope.registering = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        function finishRegisteration() {
            //TODO: check for validity
            $scope.registering = true;
            $timeout(function() {
                $state.go('lab.signedup');
                // $scope.registering = false;
            }, 400);
        }

    }
]);


/*
	AHS502 : End of 'lab/validate-controller.js'
*/


/*
	AHS502 : Start of 'panel/account-controller..js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        // User data has been loaded !

    }
]);


/*
	AHS502 : End of 'panel/account-controller..js'
*/


/*
	AHS502 : Start of 'panel/balance-controller..js'
*/

/*global app*/
/*global $*/
/*global toPersianNumber*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = 1250000;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.testCount = Math.floor($scope.balance / 10000);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount >= 0 ?
            toPersianNumber($scope.testCount) : '–';

        if ($scope.testCount >= 200)
            $scope.balanceColor = 'green';
        else if ($scope.testCount >= 50)
            $scope.balanceColor = 'olive';
        else if ($scope.testCount >= 20)
            $scope.balanceColor = 'yellow';
        else if ($scope.testCount > 0)
            $scope.balanceColor = 'orange';
        else
            $scope.balanceColor = 'red';

        function c2cPayment() {
            //TODO: check for validity
            $scope.preparingPayment = true;
            $timeout(function() {
                $scope.preparingPayment = false;
                $('#ja-c2c-acknowledgement-modal')
                    .modal({
                        onHide: function() {
                            $state.go('panel.home');
                        }
                    })
                    .modal('show');
            }, 400);
        }

        function zpPayment() {
            // body...
        }

    }
]);


/*
	AHS502 : End of 'panel/balance-controller..js'
*/


/*
	AHS502 : Start of 'panel/history-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.postClicked = postClicked;

        $scope.posts = [];
        $scope.setLoading(true);
        $timeout(function() { //TODO: load posts...
            $scope.posts = [{
                id: 1,
                status: 'Sending'
            }, {
                id: 2,
                status: 'Error'
            }, {
                id: 3,
                status: 'Sending'
            }, {
                id: 4,
                status: 'Received'
            }, {
                id: 5,
                status: 'Received'
            }, {
                id: 6,
                status: 'Error'
            }, {
                id: 7,
                status: 'Received'
            }, ];
            $scope.setLoading(false);
        }, 700);

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);


/*
	AHS502 : End of 'panel/history-controller.js'
*/


/*
	AHS502 : Start of 'panel/home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.setBackHandler($scope.menuHandlers.logout);

        $scope.setPageTitle('نام آزمایشگاه');

    }
]);


/*
	AHS502 : End of 'panel/home-controller.js'
*/


/*
	AHS502 : Start of 'panel/post-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        // We have: $rootScope.data.post

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('آرمان زیبا کلام');

    }
]);


/*
	AHS502 : End of 'panel/post-controller.js'
*/


/*
	AHS502 : Start of 'panel/send-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout) {

        $scope.sendAnswer = sendAnswer;
        $scope.selectFilesDialog = selectFilesDialog;
        $scope.abortUpload = abortUpload;
        $scope.removeFile = removeFile;

        $scope.sendingAnswer = false;
        $scope.files = []; // File.status : Preparing, Uploading, Uploded, Error, Aborting, Aborted, Removing, Removed

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ارسال نتایج');

        var inputFile = $window.document.getElementById('input-file');
        var dropZone = $window.document.getElementById('drop-zone');

        inputFile.addEventListener('change', inputFile_OnChange, false);
        $window.document.addEventListener("dragover", document_OnDragOver, false);
        $window.document.addEventListener("dragleave", document_OnDragLeave, false);
        $window.document.addEventListener("drop", document_OnDrag, false);

        $scope.$on('$destroy', function() {
            inputFile.removeEventListener('change', inputFile_OnChange);
            $window.document.removeEventListener("dragover", document_OnDragOver);
            $window.document.removeEventListener("dragleave", document_OnDragLeave);
            $window.document.removeEventListener("drop", document_OnDrag);
        });

        //$scope.fullName
        //$scope.nationalCode
        //$scope.mobilePhoneNumber
        //$scope.phoneNumber
        //$scope.extraPhoneNumber

        var fileId = 0;

        function sendAnswer() {
            //TODO: not implemented yet.
            //TODO: check for validity
            $scope.sendingAnswer = true;
            $timeout(function() { //TODO: send answer
                $scope.sendingAnswer = false;
                $('#ja-sent-answer-acknowledgement-modal')
                    .modal({
                        onHide: function() {
                            $state.go('panel.home');
                        }
                    })
                    .modal('show');
            }, 400);
        }

        function selectFilesDialog() {
            inputFile.click();
        }

        function inputFile_OnChange(e) {
            var files = toArray(inputFile.files);
            addNewFiles(files);
        }

        function processDragEvent(e) {
            dropZone.className = (e.type === 'dragover' && e.path.indexOf(dropZone) >= 0) ? 'drag-on' : '';
            e.stopPropagation();
            e.preventDefault();
        }

        function document_OnDragOver(e) {
            processDragEvent(e);
        }

        function document_OnDragLeave(e) {
            processDragEvent(e);
        }

        function document_OnDrag(e) {
            processDragEvent(e);
            if (e.path.indexOf(dropZone) >= 0) {
                var files = toArray(e.target.files || e.dataTransfer.files);
                addNewFiles(files);
            }
        }

        function addNewFiles(files) {

            // filter bad/duplicated/veryLarge files
            files = files.filter(function(file) {
                return file.size > 0 && file.size <= 10 * 1024 * 1024 && file.type != '' &&
                    $scope.files.filter(function(existingFile) {
                        return existingFile.name === file.name &&
                            existingFile.size === file.size &&
                            existingFile.type === file.type &&
                            existingFile.lastModified === file.lastModified;
                    }).length === 0;
            });

            // assign id & try to make a preview image for the file
            files.forEach(function(file) {
                file.id = fileId++;

                file.srcPreview = 'free file';
                if (isOneOfThese(file.name, ['doc', 'docx']))
                    file.srcPreview = 'doc file';
                if (isOneOfThese(file.name, ['xls', 'xlsx']))
                    file.srcPreview = 'xls file';
                if (isOneOfThese(file.name, ['pdf']))
                    file.srcPreview = 'pdf file';

                if (file.type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $timeout(function() {
                            file.srcPreview = e.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });

            // start uploading the file
            files.forEach(uploadFile);

            // show all files
            $scope.files = $scope.files.concat(files);
            $scope.$$phase || $scope.$apply();

            function isOneOfThese(filename, arrayOfTypes) {
                for (var i = 0; i < arrayOfTypes.length; i++)
                    if (filename.slice(-1 - arrayOfTypes[i].length) === '.' + arrayOfTypes[i])
                        return true;
                return false;
            }
        }

        function uploadFile(file) {

            file.status = 'Preparing';

            var formData = new FormData();
            formData.append(file.name, file);

            var xhr = new XMLHttpRequest();
            file.xhr = xhr;
            xhr.open('post', '/upload', true); //TODO: determine the exact upload url
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    file.progress = Math.floor((e.loaded / e.total) * 100);
                    $('#progress-' + file.id).progress({
                        percent: file.progress
                    });
                    $scope.$$phase || $scope.$apply();
                }
            };
            xhr.onerror = function(e) {
                file.status = 'Error';
                $scope.$$phase || $scope.$apply();
            };
            xhr.onabort = function(e) {
                (file.status === 'Aborting') && (file.status = 'Aborted');
                $scope.$$phase || $scope.$apply();
            };
            xhr.onload = function(e) {
                if (e.currentTarget.status == 200)
                    file.status = 'Uploaded';
                else
                    file.status = 'Error';
                $scope.$$phase || $scope.$apply();
            };

            file.status = 'Uploading';
            file.progress = 0;
            $('#progress-' + file.id).progress({
                percent: file.progress
            });
            $scope.$$phase || $scope.$apply();

            xhr.send(formData);
        }

        function abortUpload(file) {
            file.status = 'Aborting';
            file.xhr.abort();
        }

        function removeFile(file) {
            //TODO: lock this file interface
            abortUpload(file);
            file.status = 'Removing';
            $timeout(function() {
                file.status = 'Removed';
                $scope.files.splice($scope.files.indexOf(file), 1);
            } /*, 500*/ );
        }

        // convert object to array
        // e.g.: Convert FileList to Array of File
        function toArray(arrayLikeObject) {
            return Array.apply(null, {
                    length: arrayLikeObject.length
                }).map(Number.call, Number)
                .map(function(i) {
                    return arrayLikeObject[i];
                });
            /* or */
            // return Array.prototype.slice.call(arrayLikeObject);
        }

    }
]);


/*
	AHS502 : End of 'panel/send-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/confirm-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        $scope.setBackHandler(function() {
            console.log($scope.action)
            if ($scope.action === 'change password')
                $state.go('panel.account.password');
            else if ($scope.action === 'edit account')
                $state.go('panel.account.edit');
            else
                $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تأیید عملیات');

        function confirm() {
            //TODO: check for validity then send request to server...
            $scope.confirming = true;
            $timeout(function() {
                $('#ja-confirmed-acknowledgement-modal')
                    .modal({
                        onHide: function() {
                            $state.go('panel.account.summary');
                            $scope.refreshUserData();
                        }
                    })
                    .modal('show');
                $scope.confirming = false;
            }, 400);
        }

    }
]);


/*
	AHS502 : End of 'panel/account/confirm-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/edit-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountEditController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccount = editAccount;

        $scope.editingAccount = false;

        $scope.labName = $rootScope.data.labData.userData.labName;
        $scope.mobilePhoneNumber = $rootScope.data.labData.userData.mobilePhoneNumber;
        $scope.phoneNumber = $rootScope.data.labData.userData.phoneNumber;
        $scope.address = $rootScope.data.labData.userData.address;
        $scope.postalCode = $rootScope.data.labData.userData.postalCode;
        $scope.websiteAddress = $rootScope.data.labData.userData.websiteAddress;

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('ویرایش اطلاعات کاربری آزمایشگاه');

        function editAccount() {
            //TODO: check for validity then send request to server...
            $scope.editingAccount = true;
            $timeout(function() { //TODO: send request to edit account
                $state.go('panel.account.confirm', {
                    action: 'edit account'
                });
                $scope.editingAccount = false;
            }, 400);
        }

    }
]);


/*
	AHS502 : End of 'panel/account/edit-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/password-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.changePassword = changePassword;

        $scope.changingPassword = false;

        // $scope.oldPassword
        // $scope.newPassword
        // $scope.newPasswordAgain

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

        function changePassword() {
            //TODO: check for validity then send request to server...
            $scope.changingPassword = true;
            $timeout(function() { //TODO: send request to change password
                $state.go('panel.account.confirm', {
                    action: 'change password'
                });
                $scope.changingPassword = false;
            }, 400);
        }

    }
]);


/*
	AHS502 : End of 'panel/account/password-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/summary-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccountData = editAccountData;
        $scope.changePassword = changePassword;

        $scope.userDataForDisplay = [{
            label: 'نام آزمایشگاه',
            value: $rootScope.data.labData.userData.labName
        }, {
            label: 'تلفن همراه ارتباطی اصلی',
            value: $rootScope.data.labData.userData.mobilePhoneNumber
        }, {
            label: 'تلفن تماس دوم',
            value: $rootScope.data.labData.userData.phoneNumber
        }, {
            label: 'آدرس',
            value: $rootScope.data.labData.userData.address
        }, {
            label: 'کد پستی',
            value: $rootScope.data.labData.userData.postalCode
        }, {
            label: 'آدرس درگاه اینترنتی',
            value: $rootScope.data.labData.userData.websiteAddress
        }, {
            label: 'نام کاربری',
            value: $rootScope.data.labData.userData.username
        }];

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('اطلاعات کاربری آزمایشگاه');

        function editAccountData() {
            $state.go('panel.account.edit');
        }

        function changePassword() {
            $state.go('panel.account.password');
        }

    }
]);


/*
	AHS502 : End of 'panel/account/summary-controller.js'
*/


/*
	AHS502 : Start of 'empty-check.js'
*/

/*global app*/

app.filter('emptyCheck', function() {
    return function(input, defaultValue) {
        if (input === undefined || input === null || input === '')
            return defaultValue || '\u2013';
        else
            return String(input);
    }
});

/*
	AHS502 : End of 'empty-check.js'
*/


/*
	AHS502 : Start of 'to-persian-number.js'
*/

/*global app*/
/*global toPersianNumber*/

app.filter('toPersianNumber', function() {
    return function(input) {
        return toPersianNumber(String(input));
    }
});

/*
	AHS502 : End of 'to-persian-number.js'
*/


/*
	AHS502 : Start of 'utilities/icon-js.js'
*/

(function(global) {

    //See this link for more SVG icons: http://www.flaticon.com/
    var dataUrls = {

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'delete': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzQ4LjMzMyAzNDguMzM0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNDguMzMzIDM0OC4zMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzM2LjU1OSw2OC42MTFMMjMxLjAxNiwxNzQuMTY1bDEwNS41NDMsMTA1LjU0OWMxNS42OTksMTUuNzA1LDE1LjY5OSw0MS4xNDUsMCw1Ni44NSAgIGMtNy44NDQsNy44NDQtMTguMTI4LDExLjc2OS0yOC40MDcsMTEuNzY5Yy0xMC4yOTYsMC0yMC41ODEtMy45MTktMjguNDE5LTExLjc2OUwxNzQuMTY3LDIzMS4wMDNMNjguNjA5LDMzNi41NjMgICBjLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1ICAgbDEwNS41NC0xMDUuNTQ5TDExLjc3NCw2OC42MTFjLTE1LjY5OS0xNS42OTktMTUuNjk5LTQxLjE0NSwwLTU2Ljg0NGMxNS42OTYtMTUuNjg3LDQxLjEyNy0xNS42ODcsNTYuODI5LDBsMTA1LjU2MywxMDUuNTU0ICAgTDI3OS43MjEsMTEuNzY3YzE1LjcwNS0xNS42ODcsNDEuMTM5LTE1LjY4Nyw1Ni44MzIsMEMzNTIuMjU4LDI3LjQ2NiwzNTIuMjU4LDUyLjkxMiwzMzYuNTU5LDY4LjYxMXoiIGZpbGw9IiNEODAwMjciLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",

        'free file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIxOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIyOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIzOC41IiBjeT0iNDciIHI9IjMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'doc file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMTguNSwxM2gtNmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg2YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMTkuMDUyLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTIxLjUsMThoLTljLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoOWMwLjU1MiwwLDEsMC40NDgsMSwxUzIyLjA1MiwxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41Mi0wLjExLTAuNzEtMC4yOWMtMC4xOC0wLjE5LTAuMjktMC40NS0wLjI5LTAuNzFjMC0wLjI2LDAuMTEtMC41MiwwLjI5LTAuNzEgICBjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDBjMC4xOCwwLjE5LDAuMjksMC40NSwwLjI5LDAuNzFjMCwwLjI2LTAuMTEsMC41Mi0wLjI5LDAuNzFDMjYuMDIsMTcuODksMjUuNzYsMTgsMjUuNSwxOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzcuNSwxOGgtOGMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg4YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzguMDUyLDE4LDM3LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTEyLjUsMzNjLTAuMjYsMC0wLjUyLTAuMTEtMC43MS0wLjI5Yy0wLjE4LTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MWMwLTAuMjYsMC4xMS0wLjUyLDAuMjktMC43MSAgIGMwLjM3LTAuMzcsMS4wNS0wLjM3LDEuNDIsMGMwLjE4LDAuMTksMC4yOSwwLjQ0LDAuMjksMC43MWMwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDhjMC41NTIsMCwxLDAuNDQ4LDEsMVMyNS4wNTIsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWgyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDIyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzUuMDUyLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoNmMwLjU1MiwwLDEsMC40NDgsMSwxUzQ0LjA1MiwyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDRjMC41NTIsMCwxLDAuNDQ4LDEsMVMxNy4wNTIsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoMTBjMC41NTIsMCwxLDAuNDQ4LDEsMVMzMS4wNTIsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg5YzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDI4LDQzLjUsMjh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDA5NkU2OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIzLjUsNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzE5LjUwMyw1Mi45ODQsMTkuMzA3LDUzLDE5LjE4LDUzaC0zLjgxNFY0Mi45MjRIMTguNCAgICBjMC44NDgsMCwxLjU5MywwLjEzNSwyLjIzNSwwLjQwM3MxLjE3NiwwLjYyNywxLjYsMS4wNzNzMC43NCwwLjk1NSwwLjk1LDEuNTI0QzIzLjM5NSw0Ni40OTQsMjMuNSw0Ny4wOCwyMy41LDQ3LjY4MnogICAgIE0xOC42MzMsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgxOC42MzN6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMy40NzUsNDcuOTE0YzAsMC44NDgtMC4xMDcsMS41OTUtMC4zMjEsMi4yNDJjLTAuMjE0LDAuNjQ3LTAuNTExLDEuMTg1LTAuODg5LDEuNjEzICAgIGMtMC4zNzgsMC40MjktMC44MiwwLjc1Mi0xLjMyNiwwLjk3MXMtMS4wNiwwLjMyOC0xLjY2MSwwLjMyOHMtMS4xNTUtMC4xMDktMS42NjEtMC4zMjhzLTAuOTQ4LTAuNTQyLTEuMzI2LTAuOTcxICAgIGMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTNjLTAuMjE0LTAuNjQ3LTAuMzIxLTEuMzk1LTAuMzIxLTIuMjQyczAuMTA3LTEuNTkzLDAuMzIxLTIuMjM1ICAgIGMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2YzAuMzc4LTAuNDI5LDAuODItMC43NTQsMS4zMjYtMC45NzhzMS4wNi0wLjMzNSwxLjY2MS0wLjMzNXMxLjE1NSwwLjExMSwxLjY2MSwwLjMzNSAgICBzMC45NDgsMC41NDksMS4zMjYsMC45NzhjMC4zNzgsMC40MjksMC42NzQsMC45NjQsMC44ODksMS42MDZDMzMuMzY3LDQ2LjMyMSwzMy40NzUsNDcuMDY2LDMzLjQ3NSw0Ny45MTR6IE0yOS4yMzYsNTEuNzI5ICAgIGMwLjMzNywwLDAuNjU4LTAuMDY2LDAuOTY0LTAuMTk4YzAuMzA1LTAuMTMyLDAuNTc5LTAuMzQ5LDAuODItMC42NDljMC4yNDEtMC4zMDEsMC40MzEtMC42OTUsMC41NjctMS4xODMgICAgczAuMjA5LTEuMDgyLDAuMjE5LTEuNzg0Yy0wLjAwOS0wLjY4NC0wLjA4LTEuMjY1LTAuMjEyLTEuNzQzYy0wLjEzMi0wLjQ3OS0wLjMxNC0wLjg3My0wLjU0Ny0xLjE4M3MtMC40OTctMC41MzMtMC43OTMtMC42NyAgICBjLTAuMjk2LTAuMTM3LTAuNjA4LTAuMjA1LTAuOTM3LTAuMjA1Yy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5ICAgIGMtMC4yNDIsMC4zMDYtMC40MzEsMC42OTktMC41NjcsMS4xODNzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1ICAgIGMwLjEzMiwwLjQ4MywwLjMxNCwwLjg3NywwLjU0NywxLjE4M3MwLjQ5NywwLjUyOCwwLjc5MywwLjY3QzI4LjU5Niw1MS42NTgsMjguOTA4LDUxLjcyOSwyOS4yMzYsNTEuNzI5eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDIuNjA3LDUxLjk3NWMtMC4zNzQsMC4zNjQtMC43OTgsMC42MzgtMS4yNzEsMC44MmMtMC40NzQsMC4xODMtMC45ODQsMC4yNzMtMS41MzEsMC4yNzMgICAgYy0wLjYwMiwwLTEuMTU1LTAuMTA5LTEuNjYxLTAuMzI4cy0wLjk0OC0wLjU0Mi0xLjMyNi0wLjk3MWMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTMgICAgYy0wLjIxNC0wLjY0Ny0wLjMyMS0xLjM5NS0wLjMyMS0yLjI0MnMwLjEwNy0xLjU5MywwLjMyMS0yLjIzNWMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2ICAgIGMwLjM3OC0wLjQyOSwwLjgyMi0wLjc1NCwxLjMzMy0wLjk3OGMwLjUxLTAuMjI0LDEuMDYyLTAuMzM1LDEuNjU0LTAuMzM1YzAuNTQ3LDAsMS4wNTcsMC4wOTEsMS41MzEsMC4yNzMgICAgYzAuNDc0LDAuMTgzLDAuODk3LDAuNDU2LDEuMjcxLDAuODJsLTEuMTM1LDEuMDEyYy0wLjIyOC0wLjI2NS0wLjQ4MS0wLjQ1Ni0wLjc1OS0wLjU3NGMtMC4yNzgtMC4xMTgtMC41NjctMC4xNzgtMC44NjgtMC4xNzggICAgYy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5Yy0wLjI0MiwwLjMwNi0wLjQzMSwwLjY5OS0wLjU2NywxLjE4MyAgICBzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1YzAuMTMyLDAuNDgzLDAuMzE0LDAuODc3LDAuNTQ3LDEuMTgzczAuNDk3LDAuNTI4LDAuNzkzLDAuNjcgICAgYzAuMjk2LDAuMTQyLDAuNjA4LDAuMjEyLDAuOTM3LDAuMjEyczAuNjM2LTAuMDYsMC45MjMtMC4xNzhzMC41NDktMC4zMSwwLjc4Ni0wLjU3NEw0Mi42MDcsNTEuOTc1eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'xsl file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM5MUNEQTA7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjAuMzc5LDQ4LjEwNUwyMi45MzYsNTNoLTEuOWwtMS42LTMuODAxaC0wLjEzN0wxNy41NzYsNTNoLTEuOWwyLjU1Ny00Ljg5NWwtMi43MjEtNS4xODJoMS44NzMgICAgbDEuNzc3LDQuMTAyaDAuMTM3bDEuOTI4LTQuMTAySDIzLjFMMjAuMzc5LDQ4LjEwNXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI3LjAzNyw0Mi45MjR2OC44MzJoNC42MzVWNTNoLTYuMzAzVjQyLjkyNEgyNy4wMzd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOS4wNDEsNTAuMjM4YzAsMC4zNjQtMC4wNzUsMC43MTgtMC4yMjYsMS4wNlMzOC40NTMsNTEuOTQsMzguMTgsNTIuMnMtMC42MTEsMC40NjctMS4wMTIsMC42MjIgICAgYy0wLjQwMSwwLjE1NS0wLjg1NywwLjIzMi0xLjM2NywwLjIzMmMtMC4yMTksMC0wLjQ0NC0wLjAxMi0wLjY3Ny0wLjAzNHMtMC40NjctMC4wNjItMC43MDQtMC4xMTYgICAgYy0wLjIzNy0wLjA1NS0wLjQ2My0wLjEzLTAuNjc3LTAuMjI2Yy0wLjIxNC0wLjA5Ni0wLjM5OS0wLjIxMi0wLjU1NC0wLjM0OWwwLjI4Ny0xLjE3NmMwLjEyNywwLjA3MywwLjI4OSwwLjE0NCwwLjQ4NSwwLjIxMiAgICBjMC4xOTYsMC4wNjgsMC4zOTgsMC4xMzIsMC42MDgsMC4xOTFjMC4yMDksMC4wNiwwLjQxOSwwLjEwNywwLjYyOSwwLjE0NGMwLjIwOSwwLjAzNiwwLjQwNSwwLjA1NSwwLjU4OCwwLjA1NSAgICBjMC41NTYsMCwwLjk4Mi0wLjEzLDEuMjc4LTAuMzljMC4yOTYtMC4yNiwwLjQ0NC0wLjY0NSwwLjQ0NC0xLjE1NWMwLTAuMzEtMC4xMDUtMC41NzQtMC4zMTQtMC43OTMgICAgYy0wLjIxLTAuMjE5LTAuNDcyLTAuNDE3LTAuNzg2LTAuNTk1cy0wLjY1NC0wLjM1NS0xLjAxOS0wLjUzM2MtMC4zNjUtMC4xNzgtMC43MDctMC4zODgtMS4wMjUtMC42MjkgICAgYy0wLjMxOS0wLjI0MS0wLjU4My0wLjUyNi0wLjc5My0wLjg1NGMtMC4yMS0wLjMyOC0wLjMxNC0wLjczOC0wLjMxNC0xLjIzYzAtMC40NDYsMC4wODItMC44NDMsMC4yNDYtMS4xODkgICAgczAuMzg1LTAuNjQxLDAuNjYzLTAuODgyYzAuMjc4LTAuMjQxLDAuNjAyLTAuNDI2LDAuOTcxLTAuNTU0czAuNzU5LTAuMTkxLDEuMTY5LTAuMTkxYzAuNDE5LDAsMC44NDMsMC4wMzksMS4yNzEsMC4xMTYgICAgYzAuNDI4LDAuMDc3LDAuNzc0LDAuMjAzLDEuMDM5LDAuMzc2Yy0wLjA1NSwwLjExOC0wLjExOSwwLjI0OC0wLjE5MSwwLjM5Yy0wLjA3MywwLjE0Mi0wLjE0MiwwLjI3My0wLjIwNSwwLjM5NiAgICBjLTAuMDY0LDAuMTIzLTAuMTE5LDAuMjI2LTAuMTY0LDAuMzA4Yy0wLjA0NiwwLjA4Mi0wLjA3MywwLjEyOC0wLjA4MiwwLjEzN2MtMC4wNTUtMC4wMjctMC4xMTYtMC4wNjMtMC4xODUtMC4xMDkgICAgcy0wLjE2Ny0wLjA5MS0wLjI5NC0wLjEzN2MtMC4xMjgtMC4wNDYtMC4yOTYtMC4wNzctMC41MDYtMC4wOTZjLTAuMjEtMC4wMTktMC40NzktMC4wMTQtMC44MDcsMC4wMTQgICAgYy0wLjE4MywwLjAxOS0wLjM1NSwwLjA3LTAuNTIsMC4xNTdzLTAuMzEsMC4xOTMtMC40MzgsMC4zMjFjLTAuMTI4LDAuMTI4LTAuMjI4LDAuMjcxLTAuMzAxLDAuNDMxICAgIGMtMC4wNzMsMC4xNTktMC4xMDksMC4zMTMtMC4xMDksMC40NThjMCwwLjM2NCwwLjEwNCwwLjY1OCwwLjMxNCwwLjg4MmMwLjIwOSwwLjIyNCwwLjQ2OSwwLjQxOSwwLjc3OSwwLjU4OCAgICBjMC4zMSwwLjE2OSwwLjY0NywwLjMzMywxLjAxMiwwLjQ5MmMwLjM2NCwwLjE1OSwwLjcwNCwwLjM1NCwxLjAxOSwwLjU4MXMwLjU3NiwwLjUxMywwLjc4NiwwLjg1NCAgICBDMzguOTM2LDQ5LjI2MSwzOS4wNDEsNDkuNywzOS4wNDEsNTAuMjM4eiIvPgoJPC9nPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yMy41LDE2di00aC0xMnY0djJ2MnYydjJ2MnYydjJ2NGgxMGgyaDIxdi00di0ydi0ydi0ydi0ydi0ydi00SDIzLjV6IE0xMy41LDE0aDh2MmgtOFYxNHogICAgTTEzLjUsMThoOHYyaC04VjE4eiBNMTMuNSwyMmg4djJoLThWMjJ6IE0xMy41LDI2aDh2MmgtOFYyNnogTTIxLjUsMzJoLTh2LTJoOFYzMnogTTQyLjUsMzJoLTE5di0yaDE5VjMyeiBNNDIuNSwyOGgtMTl2LTJoMTlWMjggICB6IE00Mi41LDI0aC0xOXYtMmgxOVYyNHogTTIzLjUsMjB2LTJoMTl2MkgyMy41eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'pdf file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQzRCNEM7IiBkPSJNMTkuNTE0LDMzLjMyNEwxOS41MTQsMzMuMzI0Yy0wLjM0OCwwLTAuNjgyLTAuMTEzLTAuOTY3LTAuMzI2ICAgYy0xLjA0MS0wLjc4MS0xLjE4MS0xLjY1LTEuMTE1LTIuMjQyYzAuMTgyLTEuNjI4LDIuMTk1LTMuMzMyLDUuOTg1LTUuMDY4YzEuNTA0LTMuMjk2LDIuOTM1LTcuMzU3LDMuNzg4LTEwLjc1ICAgYy0wLjk5OC0yLjE3Mi0xLjk2OC00Ljk5LTEuMjYxLTYuNjQzYzAuMjQ4LTAuNTc5LDAuNTU3LTEuMDIzLDEuMTM0LTEuMjE1YzAuMjI4LTAuMDc2LDAuODA0LTAuMTcyLDEuMDE2LTAuMTcyICAgYzAuNTA0LDAsMC45NDcsMC42NDksMS4yNjEsMS4wNDljMC4yOTUsMC4zNzYsMC45NjQsMS4xNzMtMC4zNzMsNi44MDJjMS4zNDgsMi43ODQsMy4yNTgsNS42Miw1LjA4OCw3LjU2MiAgIGMxLjMxMS0wLjIzNywyLjQzOS0wLjM1OCwzLjM1OC0wLjM1OGMxLjU2NiwwLDIuNTE1LDAuMzY1LDIuOTAyLDEuMTE3YzAuMzIsMC42MjIsMC4xODksMS4zNDktMC4zOSwyLjE2ICAgYy0wLjU1NywwLjc3OS0xLjMyNSwxLjE5MS0yLjIyLDEuMTkxYy0xLjIxNiwwLTIuNjMyLTAuNzY4LTQuMjExLTIuMjg1Yy0yLjgzNywwLjU5My02LjE1LDEuNjUxLTguODI4LDIuODIyICAgYy0wLjgzNiwxLjc3NC0xLjYzNywzLjIwMy0yLjM4Myw0LjI1MUMyMS4yNzMsMzIuNjU0LDIwLjM4OSwzMy4zMjQsMTkuNTE0LDMzLjMyNHogTTIyLjE3NiwyOC4xOTggICBjLTIuMTM3LDEuMjAxLTMuMDA4LDIuMTg4LTMuMDcxLDIuNzQ0Yy0wLjAxLDAuMDkyLTAuMDM3LDAuMzM0LDAuNDMxLDAuNjkyQzE5LjY4NSwzMS41ODcsMjAuNTU1LDMxLjE5LDIyLjE3NiwyOC4xOTh6ICAgIE0zNS44MTMsMjMuNzU2YzAuODE1LDAuNjI3LDEuMDE0LDAuOTQ0LDEuNTQ3LDAuOTQ0YzAuMjM0LDAsMC45MDEtMC4wMSwxLjIxLTAuNDQxYzAuMTQ5LTAuMjA5LDAuMjA3LTAuMzQzLDAuMjMtMC40MTUgICBjLTAuMTIzLTAuMDY1LTAuMjg2LTAuMTk3LTEuMTc1LTAuMTk3QzM3LjEyLDIzLjY0OCwzNi40ODUsMjMuNjcsMzUuODEzLDIzLjc1NnogTTI4LjM0MywxNy4xNzQgICBjLTAuNzE1LDIuNDc0LTEuNjU5LDUuMTQ1LTIuNjc0LDcuNTY0YzIuMDktMC44MTEsNC4zNjItMS41MTksNi40OTYtMi4wMkMzMC44MTUsMjEuMTUsMjkuNDY2LDE5LjE5MiwyOC4zNDMsMTcuMTc0eiAgICBNMjcuNzM2LDguNzEyYy0wLjA5OCwwLjAzMy0xLjMzLDEuNzU3LDAuMDk2LDMuMjE2QzI4Ljc4MSw5LjgxMywyNy43NzksOC42OTgsMjcuNzM2LDguNzEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NDNEI0QzsiIGQ9Ik00OC4wMzcsNTZINy45NjNDNy4xNTUsNTYsNi41LDU1LjM0NSw2LjUsNTQuNTM3VjM5aDQzdjE1LjUzN0M0OS41LDU1LjM0NSw0OC44NDUsNTYsNDguMDM3LDU2eiIvPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xNy4zODUsNTNoLTEuNjQxVjQyLjkyNGgyLjg5OGMwLjQyOCwwLDAuODUyLDAuMDY4LDEuMjcxLDAuMjA1ICAgIGMwLjQxOSwwLjEzNywwLjc5NSwwLjM0MiwxLjEyOCwwLjYxNWMwLjMzMywwLjI3MywwLjYwMiwwLjYwNCwwLjgwNywwLjk5MXMwLjMwOCwwLjgyMiwwLjMwOCwxLjMwNiAgICBjMCwwLjUxMS0wLjA4NywwLjk3My0wLjI2LDEuMzg4Yy0wLjE3MywwLjQxNS0wLjQxNSwwLjc2NC0wLjcyNSwxLjA0NmMtMC4zMSwwLjI4Mi0wLjY4NCwwLjUwMS0xLjEyMSwwLjY1NiAgICBzLTAuOTIxLDAuMjMyLTEuNDQ5LDAuMjMyaC0xLjIxN1Y1M3ogTTE3LjM4NSw0NC4xNjh2My45OTJoMS41MDRjMC4yLDAsMC4zOTgtMC4wMzQsMC41OTUtMC4xMDMgICAgYzAuMTk2LTAuMDY4LDAuMzc2LTAuMTgsMC41NC0wLjMzNWMwLjE2NC0wLjE1NSwwLjI5Ni0wLjM3MSwwLjM5Ni0wLjY0OWMwLjEtMC4yNzgsMC4xNS0wLjYyMiwwLjE1LTEuMDMyICAgIGMwLTAuMTY0LTAuMDIzLTAuMzU0LTAuMDY4LTAuNTY3Yy0wLjA0Ni0wLjIxNC0wLjEzOS0wLjQxOS0wLjI4LTAuNjE1Yy0wLjE0Mi0wLjE5Ni0wLjM0LTAuMzYtMC41OTUtMC40OTIgICAgYy0wLjI1NS0wLjEzMi0wLjU5My0wLjE5OC0xLjAxMi0wLjE5OEgxNy4zODV6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMi4yMTksNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzI4LjIyMiw1Mi45ODQsMjguMDI2LDUzLDI3Ljg5OCw1M2gtMy44MTRWNDIuOTI0aDMuMDM1ICAgIGMwLjg0OCwwLDEuNTkzLDAuMTM1LDIuMjM1LDAuNDAzczEuMTc2LDAuNjI3LDEuNiwxLjA3M3MwLjc0LDAuOTU1LDAuOTUsMS41MjRDMzIuMTE0LDQ2LjQ5NCwzMi4yMTksNDcuMDgsMzIuMjE5LDQ3LjY4MnogICAgIE0yNy4zNTIsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgyNy4zNTJ6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNi4yNjYsNDQuMTY4djMuMTcyaDQuMjExdjEuMTIxaC00LjIxMVY1M2gtMS42NjhWNDIuOTI0SDQwLjl2MS4yNDRIMzYuMjY2eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",

        // 'key': "data_url",
    };

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || dataUrlTitle || '';
    }

    global.iconJs = iconJs;

})(window);

/*
	AHS502 : End of 'utilities/icon-js.js'
*/


/*
	AHS502 : Start of 'utilities/persian-number.js'
*/

(function(global) {

    var persianDigitConvertions = {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹'
    };

    function toPersianNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            if (persianDigitConvertions[char] != undefined)
                return persianDigitConvertions[char];
            else
                return char;
        }).join('');
    }

    global.toPersianNumber = toPersianNumber;

})(window);

/*
	AHS502 : End of 'utilities/persian-number.js'
*/
