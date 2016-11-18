/*global app*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', 'UserService',
    function($rootScope, $scope, $state, $stateParams, userService) {

        $scope.finishRegisteration = finishRegisteration;

        $scope.username = $stateParams.username;

        $scope.registering = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        function finishRegisteration() {
            $scope.registering = true;
            return userService.registerConfirm({
                username: $scope.username,
                validationCode: $scope.validationCode
            }).then(function() {
                $scope.registering = false;
                alert('عملیات ثبت نام شما با موفقیت انجام شد.\nلطفاً منتظر تماس اُپراتورهای ما باشید.');
                $state.go('lab.signedup');
            }, function(response) {
                $scope.registering = false;
                alert(JSON.stringify(response, null, 4));
            });
        }

    }
]);
