/*global app*/
/*global angular*/
/*global localStorage*/

app.run(['$rootScope', '$state', '$stateParams', '$window', '$timeout', 'UserService', 'DynamicResourceLoader',
    function($rootScope, $state, $stateParams, $window, $timeout, userService, dynamicResourceLoader) {

        // No need to initial loader anymore
        angular.element('#ja-initial-loader-background').hide();
        angular.element('#ja-initial-loader').hide();
        angular.element('#ja-main-site-content').show();
        angular.element('#ja-sidebar-menu').show();

        dynamicResourceLoader('icon-js-feeder.js', function() {
            $timeout();
        });

        if ($window.location.hash.indexOf('#/answer') !== 0) {
            $state.go(localStorage.startState || 'home.find');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                //NOTE: Use  event.preventDefault()  if it's needed.

                if (toState.name.indexOf('panel.') === 0) {
                    if (!userService.current()) {
                        event.preventDefault();
                        $state.go('lab.login');
                    }
                }
                else {
                    delete $rootScope.data.postCache;
                    delete $rootScope.data.historyState;

                    if (toState.name.indexOf('admin.') === 0) {
                        if (!userService.current()) {
                            event.preventDefault();
                            $state.go('lab.login');
                        }
                    }
                    else {
                        if (userService.current()) {
                            userService.logout();
                        }
                    }
                }

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                var numberOfToBeLoadedResources =
                    dynamicResourceLoader(toState.data && toState.data.dependencies, true, function() {
                        numberOfToBeLoadedResources && $state.reload();
                    });

                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);
