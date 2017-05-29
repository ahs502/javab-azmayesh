/*global app*/

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {

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
                params: {
                    nationalCode: null,
                    otpId: null,
                    requestCode: null
                },
                templateUrl: 'home/history.html',
                controller: 'HomeHistoryController'
            })
            .state('home.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
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
                },
                data: {
                    dependencies: [
                        'card.rtl.min.css',
                    ]
                }
            });

        $stateProvider
            .state('answer', {
                url: '/answer?p&n', // p := nationalCode, n := postCode
                params: {
                    previousState: null,
                    previousStateData: null
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
            .state('answer.post', {
                url: '/post',
                templateUrl: 'answer/post.html'
            })
            .state('answer.download', {
                url: '/download',
                templateUrl: 'answer/download.html'
            })
            .state('answer.share', {
                url: '/share',
                templateUrl: 'answer/share.html'
            })
            .state('answer.laboratory', {
                url: '/laboratory',
                templateUrl: 'answer/laboratory.html'
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
                controller: 'LabRegisterController',
                data: {
                    dependencies: [
                        'checkbox.min.js',
                        'checkbox.rtl.min.css',
                    ]
                }
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
                controller: 'CommonAboutController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
            })
            .state('lab.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController',
                data: {
                    dependencies: [
                        'container.rtl.min.css',
                    ]
                }
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
                abstract: true,
                data: {
                    dependencies: [
                        'loader.rtl.min.css',
                    ]
                }
            })
            .state('panel.home', {
                url: '/home',
                templateUrl: 'panel/home.html',
                controller: 'PanelHomeController',
                data: {
                    dependencies: [
                        'card.rtl.min.css',
                    ]
                }
            })
            .state('panel.history', {
                url: '/history',
                templateUrl: 'panel/history.html',
                controller: 'PanelHistoryController',
                data: {
                    dependencies: [
                        'dropdown.min.js',
                        'dropdown.rtl.min.css',
                    ]
                }
            })
            .state('panel.post', {
                url: '/post',
                templateUrl: 'panel/post.html',
                controller: 'PanelPostController'
            })
            .state('panel.send', {
                url: '/send',
                templateUrl: 'panel/send.html',
                controller: 'PanelSendController',
                data: {
                    dependencies: [
                        'progress.min.js',
                        'progress.rtl.min.css',
                    ]
                }
            })
            .state('panel.balance', {
                url: '/balance',
                templateUrl: 'panel/balance.html',
                controller: 'PanelBalanceController',
                data: {
                    dependencies: [
                        'statistic.min.css',
                    ]
                }
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

        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '': {
                        templateUrl: 'admin.html',
                        controller: 'AdminController',
                    },
                    menu: {
                        templateUrl: 'admin/menu.html'
                    },
                    header: {
                        templateUrl: 'admin/header.html'
                    },
                },
                abstract: true
            })
            .state('admin.home', {
                url: '/home',
                templateUrl: 'admin/home.html',
                controller: 'AdminHomeController',
                data: {
                    dependencies: [
                        'dygraph.min.js',
                        'dygraph.min.css'
                    ]
                }
            })
            .state('admin.laboratory', {
                url: '/laboratory',
                templateUrl: 'admin/laboratory.html',
                controller: 'AdminLaboratoryController'
            })
            .state('admin.petient', {
                url: '/petient',
                templateUrl: 'admin/petient.html',
                controller: 'AdminPetientController'
            })
            .state('admin.sms', {
                url: '/sms',
                templateUrl: 'admin/sms.html',
                controller: 'AdminSmsController'
            });

        $urlRouterProvider.otherwise('/home/find');

        // $locationProvider.html5Mode(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|tg):/);

    }
]);
