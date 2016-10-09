/*global app*/
/*global $*/

app.controller('HomeController', ['$scope',
    function($scope) {

        var popupContactUs = $('#home-contactUs');

        popupContactUs.popup({
            inline: true,
            transition: 'scale'
        });

    }
]);
