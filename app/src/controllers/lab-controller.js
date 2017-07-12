/*global app*/

app.controller('LabController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.homeState = 'lab.login';

        $scope.setMenuHandlers({
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToLabRegister: function() {
                $state.go('lab.register');
            },
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToLabAbout: function() {
                $state.go('lab.about');
            },
            goToLabContact: function() {
                $state.go('lab.contact');
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);
