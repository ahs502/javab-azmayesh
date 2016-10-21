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
