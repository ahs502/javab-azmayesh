/*global app*/
/*global $*/

app.controller('AdminController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.defineSubmenus = defineSubmenus;
        $scope.setSubmenu = setSubmenu;
        $scope.setSubmenuHandler = setSubmenuHandler;

        $scope.loading = $scope.loadingMessage = false;

        $scope.adminSubmenus = null;
        $scope.selectedAdminSubmenu = 0;
        var adminSubmenuChangeHandler;
        var adminSubmenuSelector = $('#ja-admin-submenu-selector');

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$distroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('admin.home');
            },
            goToLaboratoryPage: function() {
                $state.go('admin.laboratory');
            },
            goToPetientPage: function() {
                $state.go('admin.petient');
            },
            goToSmsPage: function() {
                $state.go('admin.sms');
            },
            logout: function() {
                setLoading(true);
                return userService.logout().then(function() {
                    setLoading(false);
                    $state.go('lab.login');
                });
            }
        });

        $scope.setBackHandler($scope.menuHandlers.logout);

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

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
                    $rootScope.data.adminData = userInfo;
                    silent || $scope.setLoading(false);
                });
            };
        }

        function defineSubmenus(submenus) {
            if (typeof adminSubmenuSelector.dropdown === 'function') {
                $scope.adminSubmenus = submenus;
                $timeout(function() {
                    submenus && adminSubmenuSelector.dropdown({
                        onChange: function(value, text) {
                            $timeout(function() {
                                $scope.selectedAdminSubmenu = value;
                                if (typeof adminSubmenuChangeHandler === 'function')
                                    adminSubmenuChangeHandler(value, text);
                            });
                        }
                    });
                    submenus && adminSubmenuSelector.dropdown('set selected', $scope.selectedAdminSubmenu = 0);
                });
            }
        }

        function setSubmenu(submenu) {
            if (typeof adminSubmenuSelector.dropdown === 'function') {
                $timeout(function() {
                    adminSubmenuSelector.dropdown('set selected', $scope.selectedAdminSubmenu = submenu);
                });
            }
        }

        function setSubmenuHandler(handler) {
            adminSubmenuChangeHandler = handler;
        }

    }
]);
