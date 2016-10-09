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
