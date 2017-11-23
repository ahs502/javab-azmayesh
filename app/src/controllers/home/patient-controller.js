/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global sscAlert*/
/*global irIran*/
/*global irIranProvinces*/

app.controller('HomePatientController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$q', '$window', '$timeout', '$http', 'AnswerService', 'Config',
    function($scope, $rootScope, $state, $stateParams,
        $q, $window, $timeout, $http, answerService, config) {

        $scope.registerPatientDraft = registerPatientDraft;

        $scope.registeringPatientDraft = false;
        var jYMD = (new Date()).jYMD();
        $scope.years = Array.range(jYMD[0], 1300);
        $scope.months = Array.range(1, 12);
        $scope.days = Array.range(1, 31);
        $scope.irIran = irIran;
        $scope.provinces = irIranProvinces;
        $scope.cities = [];
        $scope.person = {};
        $scope.person.birthday = [];

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.gender
        //$scope.person.birthday
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.person.province
        //$scope.person.city
        //$scope.person.address
        //$scope.person.postalCode

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('gender', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('birthday', [
                function(value) {
                    if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                    if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                    if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
                    return null;
                }
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
            ])
            .field('province', [
                ValidationSystem.validators.notEmpty()
            ])
            .field('city', [
                ValidationSystem.validators.notEmpty(),
                function(value) {
                    if (($scope.irIran[$scope.person.province] || []).indexOf(value) < 0) {
                        return "این شهر متعلق به استان " + $scope.person.province + " نیست";
                    }
                    else return null;
                }
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.postalCode()
            ]);

        $timeout(function() {

            $('#ja-gender-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.gender = value;
                        $scope.vs.check('gender');
                    });
                }
            });

            $('#ja-years-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[0] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-months-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[1] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });
            $('#ja-days-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.birthday[2] = Number(value);
                        $scope.vs.check('birthday');
                    });
                }
            });

            $('#ja-provinces-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.province = value;
                        $scope.cities = irIran[$scope.person.province];
                        if ($scope.cities.indexOf($scope.person.city) < 0) {
                            setDropdown('cities');
                        }
                        $scope.vs.check('province');
                        $scope.vs.check('city');
                    });
                }
            });
            $('#ja-cities-dropdown').dropdown({
                onChange: function(value, text, selectedItem) {
                    $timeout(function() {
                        $scope.person.city = value;
                        $scope.vs.check('city');
                    });
                }
            });

        });

        //TODO: This method is not useful anymore:
        function setDropdown(name, value, text) {
            if (arguments.length < 3) text = value;
            $timeout(function() {
                var element = $('#ja-' + name + '-dropdown');
                if (value) element
                    .dropdown('set value', value)
                    .dropdown('set text', text);
                else
                    element.dropdown('clear');
            });
        }

        function registerPatientDraft() {
            if (!$scope.vs.validate()) return;

            $scope.registeringPatientDraft = true;
            answerService.registerPatientDraft($scope.person, $scope.vs.dictate)
                .then(function() {
                    return $scope.showValidationCodeModal()
                        .then(function(validationCode) {
                            answerService.verifyPatientDraft($scope.person.nationalCode, validationCode)
                                .then(function() {
                                    $scope.registeringPatientDraft = false;
                                    $scope.showMessage('ثبت اطلاعات شخصی',
                                            'اطلاعات تماس شما به صورت موفقیت آمیز در سامانه ثبت شدند.')
                                        .then(function() {
                                            $state.go('home.find');
                                        });
                                });
                        });
                }, function(code) {
                    $scope.registeringPatientDraft = false;
                    sscAlert(code);
                });
        }

    }
]);
