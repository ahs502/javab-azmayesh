/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuEvents({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToLabs: function() {
                //$state.go('labs');
            },
            goToHomeAbout: function() {
                $state.go('home.about');
            },
            goToHomeContact: function() {
                $state.go('home.contact');
            },
        });

        $('#home-contactUs').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
