/*global app*/
/*global $*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccountData = editAccountData;
        $scope.changePassword = changePassword;

        $scope.userDataForDisplay = [{
            label: 'نام آزمایشگاه',
            value: $rootScope.data.labData.userData.labName
        }, {
            label: 'تلفن همراه ارتباطی اصلی',
            value: $rootScope.data.labData.userData.mobilePhoneNumber
        }, {
            label: 'تلفن تماس دوم',
            value: $rootScope.data.labData.userData.phoneNumber
        }, {
            label: 'آدرس',
            value: $rootScope.data.labData.userData.address
        }, {
            label: 'کد پستی',
            value: $rootScope.data.labData.userData.postalCode
        }, {
            label: 'آدرس درگاه اینترنتی',
            value: $rootScope.data.labData.userData.websiteAddress
        }, {
            label: 'نام کاربری',
            value: $rootScope.data.labData.userData.username
        }];

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('اطلاعات کاربری آزمایشگاه');

        function editAccountData() {
            $state.go('panel.account.edit');
        }

        function changePassword() {
            $state.go('panel.account.password');
        }

    }
]);
