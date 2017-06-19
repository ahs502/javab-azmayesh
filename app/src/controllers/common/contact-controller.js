/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('CommonContactController', ['$scope', '$state', '$stateParams', 'MasterService',
    function($scope, $state, $stateParams, masterService) {

        $scope.sendFeedback = sendFeedback;

        $scope.sendingFeedback = false;

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

        //$scope.mobilePhoneNumber
        //$scope.message

        $scope.vs = new ValidationSystem($scope)
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('message', [
                ValidationSystem.validators.notEmpty()
            ]);

        function sendFeedback() {
            if (!$scope.vs.validate()) return;

            $scope.sendingFeedback = true;
            masterService.sendFeedback($scope.mobilePhoneNumber, $scope.message, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingFeedback = false;
                    $scope.showMessage('ارسال موفقیت آمیز پیام',
                            'از همکاری شما صمیمانه متشکریم.\nپیام شما با موفقیت در سامانه ثبت گردید.\nاین پیام در اسرع وقت مورد بررسی قرار خواهد گرفت.')
                        .then(function() {
                            delete $scope.message;
                        });
                }, function(code) {
                    $scope.sendingFeedback = false;
                    sscAlert(code);
                });
        }

    }
]);
