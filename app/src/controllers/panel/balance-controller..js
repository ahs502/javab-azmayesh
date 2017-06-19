/*global app*/
/*global toPersianNumber*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'Config', 'BalanceService',
    function($scope, $rootScope, $state, $stateParams, $timeout, config, balanceService) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = $rootScope.data.labData.balance || 0;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.vs = new ValidationSystem($scope)
            .field('c2cReceiptCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                ValidationSystem.validators.integer()
            ])
            .field('zpChargeAmount', [
                //ValidationSystem.validators.notEmpty(),
                //ValidationSystem.validators.minLength(3)
            ]);

        $scope.testCount = Math.floor($scope.balance / config.post_price);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount > 0 ?
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
            if (!$scope.vs.validate('c2cReceiptCode')) return;

            $scope.preparingPayment = true;
            balanceService.submitC2cReceiptCode($scope.c2cReceiptCode, $scope.vs.dictate)
                .then(function() {
                    $scope.preparingPayment = false;
                    $scope.showMessage('درخواست شما ثبت شد',
                            'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.preparingPayment = false;
                    sscAlert(code);
                });
        }

        function zpPayment() {
            // body...
        }

    }
]);
