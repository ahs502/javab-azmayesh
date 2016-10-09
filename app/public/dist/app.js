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
                //controller: 'HomeContactController'
            })
            .state('home.about', {
                url: '/about',
                templateUrl: 'home.about.html',
                //controller: 'HomeAboutController'
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

        $state.go('home.history');

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

app.controller('AnswerController', ['$scope',
    function($scope) {

        //...

    }
]);


/*
	AHS502 : End of 'answer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

/*global app*/

app.controller('HistoryController', ['$scope',
    function($scope) {

        //...

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

app.controller('HomeController', ['$scope',
    function($scope) {

        var popupContactUs = $('#home-contactUs');

        popupContactUs.popup({
            inline: true,
            transition: 'scale'
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

app.controller('HomeFindController', ['$scope',
    function($scope) {

        //...

    }
]);


/*
	AHS502 : End of 'home-find-controller.js'
*/


/*
	AHS502 : Start of 'home-history-controller.js'
*/

/*global app*/

app.controller('HomeHistoryController', ['$scope',
    function($scope) {

        //...

    }
]);


/*
	AHS502 : End of 'home-history-controller.js'
*/


/*
	AHS502 : Start of 'home-otp-controller.js'
*/

/*global app*/

app.controller('HomeOtpController', ['$scope',
    function($scope) {

        //...

    }
]);


/*
	AHS502 : End of 'home-otp-controller.js'
*/


/*
	AHS502 : Start of 'master-controller.js'
*/

/*global app*/

app.controller('MasterController', ['$scope',
    function($scope) {

        // ...

    }
]);


/*
	AHS502 : End of 'master-controller.js'
*/
