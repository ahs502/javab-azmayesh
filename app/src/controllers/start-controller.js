/*global app*/
/*global localStorage*/

app.controller('StartController', ['$scope', '$state',
    function($scope, $state) {

        $state.go(localStorage.startState || 'home.find');

    }
]);
