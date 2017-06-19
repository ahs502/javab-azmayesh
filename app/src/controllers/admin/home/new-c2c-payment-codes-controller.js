/*global app*/
/*global sscAlert*/

app.controller('AdminHomeNewC2cPaymentCodesController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getAllNewC2cPaymentReceipts = getAllNewC2cPaymentReceipts;
        $scope.openC2c = openC2c;
        $scope.closeSelectedC2c = closeSelectedC2c;
        $scope.chargeLab = chargeLab;
        $scope.declineC2c = declineC2c;

        getAllNewC2cPaymentReceipts();

        function getAllNewC2cPaymentReceipts() {
            $scope.setLoading(true);
            adminService.getAllNewC2cPaymentReceipts()
                .then(function(c2cPaymentCodes) {
                    $scope.c2cPaymentCodes = c2cPaymentCodes;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openC2c(c2c, index) {
            if ($scope.selectedC2c === null) {
                delete $scope.selectedC2c;
                delete $scope.selectedC2cIndex;
            }
            else if ($scope.selectedC2cIndex !== index) {
                $scope.selectedC2c = c2c;
                $scope.selectedC2cIndex = index;
            }
        }

        function closeSelectedC2c() {
            $scope.selectedC2c = null;
            $scope.selectedC2cIndex = null;
        }

        function chargeLab(charge) {
            var amount = Number(charge || '');
            if (!amount) return;
            $scope.updating = true;
            adminService.chargeLabFromC2c($scope.selectedC2c.id, $scope.selectedC2c.username, amount)
                .then(function() {
                    $scope.c2cPaymentCodes.splice($scope.selectedC2cIndex, 1);
                    delete $scope.selectedC2c;
                    delete $scope.selectedC2cIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function declineC2c() {
            $scope.showConfirmMessage('حذف کد رهگیری ثبت شده',
                    "شما در شُرُف حذف و نا دیده گرفتن شماره رهگیری پرداخت ثبت شده توسط کاربر هستید.\nآیا از این کار اطمینان دارید؟",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'red', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.declineC2cReceipt($scope.selectedC2c.id)
                        .then(function() {
                            $scope.c2cPaymentCodes.splice($scope.selectedC2cIndex, 1);
                            delete $scope.selectedC2c;
                            delete $scope.selectedC2cIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

    }
]);
