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
                return $timeout(function() { //TODO: Initialize lab info from logged-in user data...

                    $rootScope.data.labData = {
                        userData: {
                            labName: 'آزمایشگاه دکتر میر اسدی',
                            mobilePhoneNumber: '09122343454',
                            phoneNumber: '02153647586',
                            address: 'تهران - خ سادات علوی - کوچه صابری - پلاک 217 - واحد 4',
                            postalCode: '5539110823',
                            websiteAddress: 'www.mirasadilab.ir',
                            username: 'drmirasadi'
                        },
                    };

                    silent || $scope.setLoading(false);
                }, 400);
            };
        }

    }
]);
