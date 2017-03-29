/*global app*/
/*global persianDate*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccountData = editAccountData;
        $scope.changePassword = changePassword;

        $scope.userDataForDisplay = [{
            label: 'نام آزمایشگاه',
            value: $rootScope.data.labData.labName
        }, {
            label: 'تلفن همراه ارتباطی اصلی',
            value: $rootScope.data.labData.mobilePhoneNumber
        }, {
            label: 'تلفن تماس دوم',
            value: $rootScope.data.labData.phoneNumber
        }, {
            label: 'آدرس',
            value: $rootScope.data.labData.address
        }, {
            label: 'کد پستی',
            value: $rootScope.data.labData.postalCode
        }, {
            label: 'آدرس درگاه اینترنتی',
            value: $rootScope.data.labData.websiteAddress
        }, {
            label: 'نام کاربری',
            value: $rootScope.data.labData.username
        }, {
            label: 'تاریخ عضویت',
            value: persianDate($rootScope.data.labData.subscriptionDate).format('L')
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
