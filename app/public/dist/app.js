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
                templateUrl: 'home/about.html',
                controller: 'HomeAboutController'
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'home/contact.html',
                controller: 'HomeContactController'
            })
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
            })
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
            })
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

app.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {

        $state.go('home.find');
        // $state.go('answer');

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

app.controller('MasterController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;
        
        $scope.toggleMenu = toggleMenu;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

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


/*
	AHS502 : Start of 'controllers/home/about-controller.js'
*/

/*global app*/

app.controller('HomeAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'controllers/home/about-controller.js'
*/


/*
	AHS502 : Start of 'controllers/home/contact-controller.js'
*/

/*global app*/

app.controller('HomeContactController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'controllers/home/contact-controller.js'
*/


/*
	AHS502 : Start of 'controllers/home/find-controller.js'
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
	AHS502 : End of 'controllers/home/find-controller.js'
*/


/*
	AHS502 : Start of 'controllers/home/history-controller.js'
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
	AHS502 : End of 'controllers/home/history-controller.js'
*/


/*
	AHS502 : Start of 'controllers/home/otp-controller.js'
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
	AHS502 : End of 'controllers/home/otp-controller.js'
*/


/*
	AHS502 : Start of 'controllers/lab/login-controller.js'
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
            // //TODO: check for validity
            // $scope.findingAnswer = true;
            // $timeout(function() { //TODO: resolve answer
            //     return {
            //         testNumber: 1234,
            //         nationalCode: '1234567890',
            //         paitentName: 'حسام شکروی',
            //         testDate: new Date(),
            //         answerDate: new Date(),
            //         laboratoryName: "آزمایشگاه دکتر شاهپوری"
            //     };
            // }, 400).then(function(answer) {
            //     //TODO: validate result
            //     $rootScope.data.answer = answer;
            //     $state.go('answer', {
            //         nationalCode: $scope.nationalCode,
            //         testNumber: $scope.testNumber,
            //         previousState: 'home.find'
            //     });
            // });
        }

    }
]);


/*
	AHS502 : End of 'controllers/lab/login-controller.js'
*/
