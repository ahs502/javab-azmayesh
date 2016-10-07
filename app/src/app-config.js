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
            .state('home.history', {
                url: '/history',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home.find.html',
                controller: 'HomeFindController'
            })
            .state('home.forget', {
                url: '/forget',
                templateUrl: 'home.forget.html',
                controller: 'HomeForgetController'
            })
            .state('home.history.otp', {
                url: '/otp',
                templateUrl: 'home.history.otp.html',
                controller: 'HomeHistoryOtpController'
            })
            .state('home.history.find', {
                url: '/find',
                templateUrl: 'home.history.find.html',
                controller: 'HomeHistoryFindController'
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
            .state('about', {
                url: '/about',
                templateUrl: 'about.html',
                // controller: 'AboutController'
            });

        $urlRouterProvider.otherwise('/home/forget');

        // $locationProvider.html5Mode(true);

    }
]);
