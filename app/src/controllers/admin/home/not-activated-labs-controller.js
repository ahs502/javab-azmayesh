/*global app*/
/*global angular*/
/*global sscAlert*/

app.controller('AdminHomeNotActivatedLabsController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNotActivatedLabs = getNotActivatedLabs;
        $scope.openLab = openLab;
        $scope.closeSelectedLab = closeSelectedLab;
        $scope.approveLab = approveLab;
        $scope.declineLab = declineLab;

        getNotActivatedLabs();

        function getNotActivatedLabs() {
            $scope.setLoading(true);
            adminService.getNotActivatedLabs()
                .then(function(inactiveLabs) {
                    $scope.inactiveLabs = inactiveLabs;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openLab(lab, index) {
            if ($scope.selectedLab === null) {
                delete $scope.selectedLab;
                delete $scope.selectedLabIndex;
            }
            else if ($scope.selectedLabIndex !== index) {
                $scope.selectedLab = angular.copy(lab);
                $scope.selectedLabIndex = index;
            }
        }

        function closeSelectedLab() {
            $scope.selectedLab = null;
            $scope.selectedLabIndex = null;
        }

        function approveLab() {
            $scope.showConfirmMessage('تأیید کاربر جدید',
                    "آیا از تأیید کاربر جدید مطمئن هستید؟",
                    'بله، تأیید شود', 'خیر',
                    'green', 'basic gray')
                .then(function() {
                    $scope.updating = true;
                    if ($scope.selectedLab.freeIntervalMonths) {
                        var freeInterval = new Date;
                        freeInterval.setMonth(freeInterval.getMonth() + (Number($scope.selectedLab.freeIntervalMonths || '0') || 0));
                        $scope.selectedLab.freeIntervalTimeStamp = freeInterval.getTime();
                    }
                    delete $scope.selectedLab.freeIntervalMonths;
                    adminService.approveInactiveLab($scope.selectedLab)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

        function declineLab() {
            $scope.showConfirmMessage('تأییدیه برای حذف کاربر جدید',
                    "آیا از تصمیم خود مبنی بر حذف کامل کاربر جدید مطمئن هستید؟\n در صورت حذف، امکان بازگشت وجود ندارد.",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'red', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.declineInactiveLab($scope.selectedLab.username)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            sscAlert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

    }
]);
