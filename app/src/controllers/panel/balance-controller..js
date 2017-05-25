/*global app*/
/*global toPersianNumber*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = 125000;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.testCount = Math.floor($scope.balance / 1000);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount >= 0 ?
            toPersianNumber($scope.testCount) : '–';

        if ($scope.testCount >= 200)
            $scope.balanceColor = 'green';
        else if ($scope.testCount >= 50)
            $scope.balanceColor = 'olive';
        else if ($scope.testCount >= 20)
            $scope.balanceColor = 'yellow';
        else if ($scope.testCount > 0)
            $scope.balanceColor = 'orange';
        else
            $scope.balanceColor = 'red';

        function c2cPayment() {
            //TODO: check for validity
            $scope.preparingPayment = true;
            $timeout(function() {
                $scope.preparingPayment = false;
                $scope.showMessage('درخواست شما ثبت شد',
                        'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد')
                    .then(function() {
                        $state.go('panel.home');
                    });
            }, 400);
        }

        function zpPayment() {
            // body...
        }

    }
]);
