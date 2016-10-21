/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToLabs: function() {
                // $state.go('labs');
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

        $('#home-contact-us').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
