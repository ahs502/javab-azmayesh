/*global app*/
/*global $*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        // $scope.verificationCode

        $scope.setBackHandler(function() {
            if ($scope.action === 'change password')
                $state.go('panel.account.password');
            else if ($scope.action === 'edit account')
                $state.go('panel.account.edit');
            else
                $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تأیید عملیات');

        function confirm() {
            //TODO: check for validity then send request to server...
            $scope.confirming = true;
            userService.editConfirm($rootScope.data.labData.username, $scope.verificationCode)
                .then(function() {
                    $scope.confirming = false;
                    $('#ja-confirmed-acknowledgement-modal')
                        .modal({
                            onHide: function() {
                                return $scope.refreshUserData()
                                    .then(function() {
                                        $state.go('panel.account.summary');
                                    });
                            }
                        })
                        .modal('show');
                }, function(code) {
                    $scope.confirming = false;
                    alert(code);
                });
        }

    }
]);
