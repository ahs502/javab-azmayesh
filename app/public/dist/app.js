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
                templateUrl: 'home.html',
                controller: 'HomeController',
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home.find.html',
                controller: 'HomeFindController'
            })
            .state('home.otp', {
                url: '/otp',
                templateUrl: 'home.otp.html',
                controller: 'HomeOtpController'
            })
            .state('home.history', {
                url: '/history',
                templateUrl: 'home.history.html',
                controller: 'HomeHistoryController'
            })
            .state('history', {
                url: '/history',
                templateUrl: 'history.html',
                controller: 'HistoryController'
            })
            .state('answer', {
                url: '/answer',
                templateUrl: 'answer.html',
                controller: 'AnswerController'
            })
            .state('home.contact', {
                url: '/contact',
                templateUrl: 'home.contact.html',
                controller: 'HomeContactController'
            })
            .state('home.about', {
                url: '/about',
                templateUrl: 'home.about.html',
                controller: 'HomeAboutController'
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
        // $state.go('history');

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
	AHS502 : Start of 'home-about-controller.js'
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
	AHS502 : End of 'home-about-controller.js'
*/


/*
	AHS502 : Start of 'home-contact-controller.js'
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
	AHS502 : End of 'home-contact-controller.js'
*/


/*
	AHS502 : Start of 'home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$interval',
    function($scope, $interval) {

        $('#home-contactUs').popup({
            inline: true,
            transition: 'scale'
        });

        $scope.onMenuClicked(function() {
            $('#home-sidebarMenu')
                .sidebar({
                    context: $('#home-sidebarContainer')
                });

            $('#home-sidebarMenu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        });

    }
]);


/*
	AHS502 : End of 'home-controller.js'
*/


/*
	AHS502 : Start of 'home-find-controller.js'
*/

/*global app*/

app.controller('HomeFindController', ['$scope', '$state', '$timeout',
    function($scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false;
        
        $scope.onBackClicked(undefined);
        
        //$scope.nationalCode
        //$scope.receiptNumber

        function seeAnswer() {
            $scope.findingAnswer = true;
            $timeout(function() {
                $state.go('answer');
                $scope.findingAnswer = true;
            }, 500);
        }

    }
]);


/*
	AHS502 : End of 'home-find-controller.js'
*/


/*
	AHS502 : Start of 'home-history-controller.js'
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
	AHS502 : End of 'home-history-controller.js'
*/


/*
	AHS502 : Start of 'home-otp-controller.js'
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
	AHS502 : End of 'home-otp-controller.js'
*/


/*
	AHS502 : Start of 'master-controller.js'
*/

/*global app*/

app.controller('MasterController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.onBackClicked = onBackClicked;
        $scope.onMenuClicked = onMenuClicked;

        $scope.back = undefined;
        $scope.menu = undefined;

        function onBackClicked(handler) {
            $scope.back = handler;
        }

        function onMenuClicked(handler) {
            $scope.menu = handler;
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
