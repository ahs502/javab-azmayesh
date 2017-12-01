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
            var startupState = init.patientIn ? 'home.patient' : localStorage.startState;
            return (startupState ? $q.when(startupState) :
                $scope.showConfirmMessage("انتخاب نوع کاربری از سامانه",
                    "آیا شما می خواهید به عنوان آزمایشگاه به سامانه وارد شوید یا به عنوان آزمایش دهنده؟",
                    "آزمایش دهنده", "آزمایشگاه",
                    'green', 'green')
                .then(function() {
                    return 'home.find';
                }).catch(function() {
                    return 'lab.login';
                }));
        }).then(function(state) {
            $state.go(state);
        });

    }
]);
