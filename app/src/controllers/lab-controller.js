/*global app*/
/*global $*/

app.controller('LabController', ['$scope', '$state',
    function($scope, $state) {

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
            goToHomeAbout: function() {
                $state.go('home.about', {
                    previousState: $state.current
                });
            },
            goToHomeContact: function() {
                $state.go('home.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);
