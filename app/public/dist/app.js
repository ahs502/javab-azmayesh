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
                views:{
                    '':{
                     templateUrl: 'home.html',
                    controller: 'HomeController',
                    },
                    menu:{
                        templateUrl:'home/menu.html'
                    },
                    footer:{
                        templateUrl:'home/footer.html'
                    },
                },
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home/find.html',
                controller: 'HomeFindController'
            })
            // .state('home.otp', {
            //     url: '/otp',
            //     templateUrl: 'home/otp.html',
            //     controller: 'HomeOtpController'
            // })
            // .state('home.history', {
            //     url: '/history',
            //     templateUrl: 'home/history.html',
            //     controller: 'HomeHistoryController'
            // })
            // .state('home.contact', {
            //     url: '/contact',
            //     templateUrl: 'home/contact.html',
            //     controller: 'HomeContactController'
            // })
            // .state('home.about', {
            //     url: '/about',
            //     templateUrl: 'home/about.html',
            //     controller: 'HomeAboutController'
            // })
            // .state('history', {
            //     url: '/history',
            //     views: {
            //         content: {
            //             templateUrl: 'history.html',
            //             controller: 'HistoryController'
            //         }
            //     }
            // })
            // .state('answer', {
            //     url: '/answer',
            //     views: {
            //         content: {
            //             templateUrl: 'answer.html',
            //             controller: 'AnswerController'
            //         },
            //         menu: {
            //             templateUrl: 'answer/menu.html',
            //         }
            //     }
            // });

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


/*
	AHS502 : End of 'answer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HistoryController', ['$scope', '$state',
    function($scope, $state) {

        $scope.testClicked = testClicked;

        $scope.paitentName = "مینا قاسمی راد";

        $scope.onBackClicked(function() {
            $state.go('home.otp');
        });

        function testClicked(test) {
            $state.go('answer');
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
            goToLabs: function() {
                //$state.go('labs');
            },
            goToHomeAbout: function() {
                $state.go('home.about');
            },
            goToHomeContact: function() {
                $state.go('home.contact');
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

app.controller('HomeAboutController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.find');
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

app.controller('HomeContactController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.find');
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

app.controller('HomeFindController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false;
        
        $scope.setBackHandler(false);
        
        //$scope.nationalCode
        //$scope.receiptNumber

        function seeAnswer() {
            $scope.findingAnswer = true;
            $timeout(function() {
                $state.go('answer');
                $scope.findingAnswer = false;
            }, 500);
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

app.controller('HomeHistoryController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.findHistory = findHistory;

        $scope.findingHistory = false;

        $scope.onBackClicked(function() {
            $state.go('home.otp');
        });
        
        //$scope.otp

        function findHistory() {
            $scope.findingHistory = true;
            $timeout(function() {
                $state.go('history');
                $scope.findingHistory = true;
            }, 500);
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

app.controller('HomeOtpController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        function sendOtp() {
            $scope.sendingOtp = true;
            $timeout(function() {
                $state.go('home.history');
                $scope.sendingOtp = true;
            }, 500);
        }

    }
]);


/*
	AHS502 : End of 'controllers/home/otp-controller.js'
*/
