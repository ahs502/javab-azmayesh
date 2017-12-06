/*global app*/

app.controller('HomeController', ['$scope', '$rootScope', '$state',
    function($scope, $rootScope, $state) {

        $rootScope.homeState = 'home.find';

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomePatient: function() {
                $state.go('home.patient');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToHomeHint: function() {
                $state.go('home.hint');
            },
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToHomeAbout: function() {
                $state.go('home.about');
            },
            goToHomeContact: function() {
                $state.go('home.contact');
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);
