/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$interval',
    function($scope, $interval) {

        $('#home-contactUs').popup({
            inline: true,
            transition: 'scale'
        });

        $scope.onMenuClicked(function() {
            $('#home-sidebarMenu')
                .sidebar({
                    context: $('#home-sidebarContainer')
                });

            $('#home-sidebarMenu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        });

    }
]);
