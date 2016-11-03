/*global app*/
/*global $*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$interval',
    function($scope, $rootScope, $state, $stateParams, $timeout, $interval) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.loading = $scope.loadingMessage = false;

        refreshUserDataProvider(false)();

        // Refresh user data every 1 minute
        $interval(refreshUserDataProvider(true), 60000);

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToSendResults: function() {
                $state.go('panel.send');
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
            logout: function() {
                //...
                //TODO: logout
                //...
                $state.go('lab.login');
                console.log('logout');
            }
        });

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        function setLoading(loading) {
            $scope.loading = loading;
            $scope.loadingMessage = false;
            loading && $timeout(function() {
                $scope.loadingMessage = true;
            }, 1500);
        }

        function setPageTitle(title) {
            headerHandlers.pageTitle = title;
        }

        function refreshUserDataProvider(silent) {
            return function() {
                silent || $scope.setLoading(true);
                $timeout(function() { //TODO: Initialize lab info from logged-in user data...
                    silent || $scope.setLoading(false);
                }, 400);
            };
        }

    }
]);
