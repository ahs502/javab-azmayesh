/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('PanelPatientController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout', '$http', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout, $http, answerService) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.updatePatient = updatePatient;

        $scope.updatingPatient = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ثبت بیمار');

        $scope.person = {};
        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('extraPhoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('email', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.email()
            ]);

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.updatingPatient = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(patient) {

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    $scope.redirectToLoginPageIfRequired(code);
                })
                .then(function() {
                    $scope.updatingPatient = false;
                });
        }

        function updatePatient() {
            if (!$scope.vs.validate()) return;

            $scope.updatingPatient = true;
            answerService.updatePatient($scope.person, $scope.vs.dictate)
                .then(function() {
                    $scope.updatingPatient = false;
                    $scope.showMessage('به روز رسانی اطلاعات بیمار',
                            'اطلاعات بیمار به صورت موفقیت آمیز در سامانه ثبت شدند.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.updatingPatient = false;
                    sscAlert(code);
                    $scope.redirectToLoginPageIfRequired(code);
                });
        }

    }
]);
