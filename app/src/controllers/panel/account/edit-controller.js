/*global app*/
/*global $*/

app.controller('PanelAccountEditController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccount = editAccount;

        $scope.editingAccount = false;

        $scope.labName = $rootScope.data.labData.userData.labName;
        $scope.mobilePhoneNumber = $rootScope.data.labData.userData.mobilePhoneNumber;
        $scope.phoneNumber = $rootScope.data.labData.userData.phoneNumber;
        $scope.address = $rootScope.data.labData.userData.address;
        $scope.postalCode = $rootScope.data.labData.userData.postalCode;
        $scope.websiteAddress = $rootScope.data.labData.userData.websiteAddress;

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('ویرایش اطلاعات کاربری آزمایشگاه');

        function editAccount() {
            //TODO: check for validity then send request to server...
            $scope.editingAccount = true;
            $timeout(function() { //TODO: send request to edit account
                $state.go('panel.account.confirm', {
                    action: 'edit account'
                });
                $scope.editingAccount = false;
            }, 400);
        }

    }
]);
