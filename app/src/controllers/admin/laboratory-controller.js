/*global app*/
/*global angular*/
/*global $*/

app.controller('AdminLaboratoryController', ['$scope', '$rootScope', '$state',
    '$stateParams', 'UserService', 'AdminService',
    function($scope, $rootScope, $state,
        $stateParams, userService, adminService) {

        $scope.setPageTitle('آزمایشگاه ها');

        $scope.selectLab = selectLab;
        $scope.chargeLab = chargeLab;

        $scope.laboratories = [];
        $scope.selectedLab = null;

        $scope.setLoading(true);
        adminService.getAllLaboratories().then(function(laboratories) {
            $scope.laboratories = laboratories;
            $scope.setLoading(false);
        }, function(code) {
            alert(code);
            $scope.setLoading(false);
        });

        function selectLab(lab) {
            $scope.selectedLab = lab;
            var editingLab = angular.copy(lab);
            $scope.editingLab = editingLab;
            $('#ja-admin-laboratory-edit-modal')
                .modal({
                    closable: false,
                    onApprove: function() {
                        $scope.setLoading(true);
                        adminService.editLaboratory(lab.username, editingLab).then(function() {
                            $scope.laboratories[$scope.laboratories.indexOf(lab)] = editingLab;
                        }, function(code) {
                            alert(code);
                        }).then(function() {
                            $scope.selectedLab = editingLab;
                            $scope.setLoading(false);
                        });
                    },
                    onDeny: function() {
                        // nothing to do !
                    }
                })
                .modal('show');
        }

        function chargeLab() {
            $scope.editingLab.balance = Number($scope.editingLab.balance) + Number($scope.charge);
            $scope.charge = '';
        }

    }
]);
