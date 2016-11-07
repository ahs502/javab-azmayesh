/*global app*/
/*global $*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        $scope.setBackHandler(function() {
            console.log($scope.action)
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
            $timeout(function() {
                $('#ja-confirmed-acknowledgement-modal')
                    .modal({
                        onHide: function() {
                            $state.go('panel.account.summary');
                            $scope.refreshUserData();
                        }
                    })
                    .modal('show');
                $scope.confirming = false;
            }, 400);
        }

    }
]);
