/*global app*/
/*global $*/

app.controller('HomeController', ['$scope',
    function($scope) {

        $('#home-contactUs').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
