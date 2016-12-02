/*global app*/

app.controller('PanelAccountEditController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.editAccount = editAccount;

        $scope.editingAccount = false;

        $scope.user = {
            labName: $rootScope.data.labData.labName,
            mobilePhoneNumber: $rootScope.data.labData.mobilePhoneNumber,
            phoneNumber: $rootScope.data.labData.phoneNumber,
            address: $rootScope.data.labData.address,
            postalCode: $rootScope.data.labData.postalCode,
            websiteAddress: $rootScope.data.labData.websiteAddress,
        };

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('ویرایش اطلاعات کاربری آزمایشگاه');

        function editAccount() {
            //TODO: check for validity then send request to server...
            $scope.editingAccount = true;
            userService.editAccount($rootScope.data.labData.username, $scope.user)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'edit account'
                    });
                    $scope.editingAccount = false;
                }, function(code) {
                    $scope.editingAccount = false;
                    alert(code);
                });
        }

    }
]);
