/*global app*/
/*global sscAlert*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);
        $scope.redirectToLoginPageIfRequired = redirectToLoginPageIfRequired;

        $rootScope.homeState = 'panel.home';

        $scope.loading = $scope.loadingMessage = false;

        $rootScope.data.forceRefresh && $scope.refreshUserData();

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$destroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToAcceptPatient: function() {
                $state.go('panel.patient');
            },
            goToSendResults: function() {
                $state.go('panel.send', {
                    nationalCode: null,
                    previousState: null
                });
            },
            goToAcceptancesHistory: function() {
                $state.go('panel.acceptance');
            },
            goToResultsHistory: function() {
                $state.go('panel.history');
            },
            goToChargeAccount: function() {
                $state.go('panel.balance');
            },
            goToUserAccount: function() {
                $state.go('panel.account.summary');
            },
            goToPanelAbout: function() {
                $state.go('panel.about');
            },
            goToPanelContact: function() {
                $state.go('panel.contact');
            },
            logout: function() {
                setLoading(true);
                return userService.logout().then(function() {
                    setLoading(false);
                    $state.go('lab.login');
                });
            }
        });

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        if (!!userService.getUserPersistent()) {
            $scope.refreshUserData();
        }

        function setLoading(loading) {
            $timeout(function() {
                $scope.loading = loading;
                $scope.loadingMessage = false;
                loading && $timeout(function() {
                    $scope.loadingMessage = true;
                }, 1500);
            });
        }

        function setPageTitle(title) {
            headerHandlers.pageTitle = title;
        }

        function refreshUserDataProvider(silent) {
            return function() {
                silent || $scope.setLoading(true);
                return userService.refresh().then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                }, function(code) {
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
                }).then(function() {
                    silent || $scope.setLoading(false);
                });
            };
        }

        function redirectToLoginPageIfRequired(code) {
            if (code === 100 || code === 101 || code === 50 || code === 52) {
                $scope.menuHandlers.logout();
            }
        }

    }
]);
