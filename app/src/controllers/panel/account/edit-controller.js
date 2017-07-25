/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

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

        $scope.vs = new ValidationSystem($scope.user)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ]);

        function editAccount() {
            if (!$scope.vs.validate()) return;

            $scope.editingAccount = true;
            userService.editAccount($scope.user, $scope.vs.dictate)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'edit account'
                    });
                    $scope.editingAccount = false;
                }, function(code) {
                    $scope.editingAccount = false;
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
                });
        }

    }
]);
