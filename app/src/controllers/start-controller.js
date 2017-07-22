/*global app*/
/*global localStorage*/

app.controller('StartController', ['$q', '$scope', '$state', '$stateParams', '$location',
    function($q, $scope, $state, $stateParams, $location) {

        var init, initCoded = $stateParams.init;
        try {
            init = initCoded && JSON.parse(initCoded);
        }
        catch (err) {}
        init = init || {};

        var startupMessage = init.startupMessage;

        (!startupMessage ? $q.when() :
            $scope.showMessage(startupMessage.title, startupMessage.message, startupMessage.ok))
        .then(function() {
            $state.go(localStorage.startState || 'home.find');
        });

    }
]);
