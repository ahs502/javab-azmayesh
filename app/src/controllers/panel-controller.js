/*global app*/
/*global $*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;

        $scope.loading = $scope.loadingMessage = false;

        //TODO: Initialize lab info from logged-in user data...

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
            pageTitle: 'نام کامل آزمایشگاه'
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
            // $rootScope.$apply(function() {
            headerHandlers.pageTitle = title;
            // });
        }

    }
]);
