/*global app*/
/*global $*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setPageTitle = setPageTitle;
        
        //TODO: Initialize lab info from logged-in user data...

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToSendResults: function() {
                $state.go('panel.send');
            },
            goToResultsHistory: function() {
                // $state.go('lab.login');
            },
            goToChargeAccount: function() {
                // $state.go('home.about', {
                //     previousState: $state.current
                // });
            },
            goToUserAccount: function() {
                // $state.go('home.contact', {
                //     previousState: $state.current
                // });
            },
            logout:function () {
                // body...
            }
        });

        var headerHandlers = {
            pageTitle: 'نام کامل آزمایشگاه'
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        function setPageTitle(title) {
            // $rootScope.$apply(function() {
                headerHandlers.pageTitle = title;
            // });
        }

    }
]);
