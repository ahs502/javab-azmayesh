/*global app*/
/*global angular*/
/*global $*/
/*global sscAlert*/

app.controller('AdminLaboratoryController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('آزمایشگاه ها');

        $scope.setBackHandler($scope.menuHandlers.goToMainPage);

        $scope.selectLab = selectLab;
        $scope.chargeLab = chargeLab;
        $scope.freeIntervalLab = freeIntervalLab;
        $scope.removeLab = removeLab;

        $scope.laboratories = [];
        $scope.selectedLab = null;

        $scope.setLoading(true);
        adminService.getAllLaboratories().then(function(laboratories) {
            $scope.laboratories = laboratories;
            $scope.setLoading(false);
        }, function(code) {
            sscAlert(code);
            $scope.setLoading(false);
        });

        var modalElement;

        function selectLab(lab) {
            $scope.selectedLab = lab;
            $scope.selectedLabIndex = $scope.laboratories.indexOf(lab);
            $scope.editingLab = angular.copy(lab);
            $scope.updating = false;
            modalElement = $('#ja-admin-laboratory-edit-modal')
                .modal({
                    closable: false,
                    onApprove: function() {
                        $scope.updating = true;
                        adminService.editLaboratory(lab.username, $scope.editingLab).then(function() {
                            $scope.laboratories[$scope.selectedLabIndex] = $scope.editingLab;
                            $scope.selectedLab = $scope.editingLab;
                            modalElement.modal('hide');
                        }, function(code) {
                            $scope.updating = false;
                            sscAlert(code);
                        });
                        return false;
                    },
                    onDeny: function() {
                        // nothing to do !
                    }
                })
                .modal('show');
        }

        function chargeLab() {
            var amount = Number($scope.charge || '0');
            if (!amount) return;
            $scope.editingLab.balance = Number($scope.editingLab.balance) + amount;
            $scope.charge = '';
        }

        function freeIntervalLab() {
            var freeIntervalMonths = Number($scope.freeIntervalMonths || '0') || 0;
            if (freeIntervalMonths) {
                var freeInterval = new Date;
                freeInterval.setMonth(freeInterval.getMonth() + freeIntervalMonths);
                $scope.editingLab.freeIntervalTimeStamp = freeInterval.getTime();
            }
            else {
                delete $scope.editingLab.freeIntervalTimeStamp;
            }
            $scope.freeIntervalMonths = '';
        }

        function removeLab() {
            if ($scope.labNameAgain !== $scope.editingLab.labName) {
                alert('نام را اشتباه وارد کرده اید.\nلطفاً از این که می خواهید این آزمایشگاه را حذف کنید مطمئن شوید.');
                return;
            }
            $scope.updating = true;
            adminService.removeLaboratory($scope.editingLab.username).then(function() {
                $scope.laboratories.splice($scope.selectedLabIndex, 1);
                $scope.selectedLab = null;
                $scope.selectedLabIndex = -1;
                modalElement.modal('hide');
            }, function(code) {
                $scope.updating = false;
                sscAlert(code);
            });
        }

    }
]);
