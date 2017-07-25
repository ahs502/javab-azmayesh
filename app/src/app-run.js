/*global app*/
/*global angular*/

app.run(['$rootScope', '$state', '$stateParams', '$window', '$location', '$timeout', 'Config', 'UserService', 'DynamicResourceLoader',
    function($rootScope, $state, $stateParams, $window, $location, $timeout, config, userService, dynamicResourceLoader) {

        // No need to initial loader anymore
        angular.element('#ja-initial-loader-background').hide();
        angular.element('#ja-initial-loader').hide();
        angular.element('#ja-main-site-content').show();
        angular.element('#ja-sidebar-menu').show();

        dynamicResourceLoader('icon-js-feeder.js', function() {
            $timeout();
        });

        if ($window.location.hash.indexOf('#/answer') !== 0 &&
            $window.location.hash.indexOf('#/start') !== 0) {
            $state.go('start');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        var titleElement = angular.element("head title");
        titleElement.html((config.env === 'live' ? '' : config.env + ' - ') + titleElement.html());

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                //NOTE: Use  event.preventDefault()  if it's needed.

                var dependencies = toState.name.split('.').map(function(namePart, index, nameParts) {
                    var state = $state.get(nameParts.slice(0, index + 1).join('.'));
                    return state.data && state.data.dependencies;
                }).filter(function(dependencies) {
                    return !!dependencies;
                }).reduce(function(allDependencies, dependencies) {
                    return allDependencies.concat(dependencies);
                }, []);

                var numberOfToBeLoadedResources =
                    dynamicResourceLoader(dependencies, true, function() {
                        numberOfToBeLoadedResources && $state.go(toState);
                    });

                if (numberOfToBeLoadedResources) {
                    event.preventDefault();
                    return;
                }

                if (toState.name.indexOf('panel.') === 0) {
                    if (!userService.current()) {
                        event.preventDefault();
                        $state.go('lab.login');
                    }
                }
                else {
                    // delete $rootScope.data.postCache;
                    // delete $rootScope.data.historyState;

                    if (toState.name.indexOf('admin.') === 0) {
                        if (!userService.current()) {
                            event.preventDefault();
                            $state.go('lab.login');
                        }
                    }
                    else {
                        if (userService.current()) {
                            // userService.logout(true);
                        }
                    }
                }

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);
