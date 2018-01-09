/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global sscAlert*/
/*global irIran*/
/*global irIranProvinces*/
/*global toPersianNumber*/

app.controller('PanelPatientController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$q', '$window', '$timeout', '$http', 'AnswerService', 'Config',
    function($scope, $rootScope, $state, $stateParams,
        $q, $window, $timeout, $http, answerService, config) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.acceptPatient = acceptPatient;
        $scope.requestChange = requestChange;

        $scope.updatingPatient = false;
        var jYMD = (new Date()).jYMD();
        $scope.years = Array.range(jYMD[0], 1300);
        $scope.months = Array.range(1, 12);
        $scope.days = Array.range(1, 31);
        $scope.irIran = irIran;
        $scope.provinces = irIranProvinces;
        $scope.cities = [];
        $scope.person = {};
        $scope.person.birthday = [];
        $scope.request = {
            electronicVersion: true,
            paperVersion: false
        };
        $scope.payment = config.post_price;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('پذیرش بیمار');

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

        //$scope.request.electronicVersion
        //$scope.request.paperVersion

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
                ValidationSystem.validators.notRequired()
            ])
            .field('birthday', [
                function(value) {
                    // if (!value || !value[0]) return "وارد کردن سال تولد الزامی است";
                    // if (!value || !value[1]) return "وارد کردن ماه تولد الزامی است";
                    // if (!value || !value[2]) return "وارد کردن روز تولد الزامی است";
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
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                })
            ])
            .field('city', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
                function(value) {
                    if (!$scope.person.province) return true;
                    if (($scope.irIran[$scope.person.province] || []).indexOf(value) < 0) {
                        return "این شهر متعلق به استان " + $scope.person.province + " نیست";
                    }
                    else return null;
                }
            ])
            .field('address', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmptyIf(function() {
                    return $scope.request.paperVersion;
                }),
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

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.updatingPatient = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(data) {
                    var patient = data.patient;
                    //TODO: Use data.acceptance here too.

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.gender = $scope.person.gender || patient.gender;
                    $scope.person.gender && setDropdown('gender', $scope.person.gender);
                    $scope.person.birthday = patient.birthday || [];
                    $scope.person.birthday[0] && setDropdown('years', $scope.person.birthday[0]);
                    $scope.person.birthday[1] && setDropdown('months', $scope.person.birthday[1]);
                    $scope.person.birthday[2] && setDropdown('days', $scope.person.birthday[2]);
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;
                    $scope.person.province = $scope.person.province || patient.province;
                    $scope.person.province && setDropdown('provinces', $scope.person.province);
                    $scope.person.city = $scope.person.city || patient.city;
                    $scope.person.city && setDropdown('cities', $scope.person.city);
                    $scope.person.address = $scope.person.address || patient.address;
                    $scope.person.postalCode = $scope.person.postalCode || patient.postalCode;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    $scope.redirectToLoginPageIfRequired(code);
                })
                .then(function() {
                    $scope.updatingPatient = false;
                });
        }

        function acceptPatient() {
            if (!$scope.vs.validate()) return;

            var promise = $q.when();
            if ($scope.payment) {
                promise = $scope.showConfirmMessage('دریافت هزینه ثبت از بیمار',
                    'هزینه درخواست های بیمار برابر ' + toPersianNumber($scope.payment) + ' تومان است.\n' +
                    'لطفاً این مبلغ را از بیمار دریافت کنید.',
                    'مبلغ مورد نظر دریافت شد', 'لغو عملیات',
                    'green', 'basic red');
            }
            promise.then(function() {
                $scope.updatingPatient = true;
                answerService.acceptPatient($scope.person, $scope.request, $scope.payment, $scope.vs.dictate)
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
            });
        }

        function requestChange(item) {
            if (item === 'electronicVersion') {
                $scope.request.paperVersion = $scope.request.paperVersion && $scope.request.electronicVersion;
            }
            if (item === 'paperVersion') {
                $scope.request.electronicVersion = $scope.request.paperVersion || $scope.request.electronicVersion;
            }

            //TODO: Remove these temporary lines later:
            $scope.request.paperVersion && $scope.showMessage('اطلاع رسانی',
                "متأسفانه این قابلیت در حال حاضر فعال نیست اما به زودی فعال خواهد شد.");
            $scope.request.paperVersion = false;

            $scope.payment = ($scope.request.electronicVersion ? config.post_price : 0) +
                ($scope.request.paperVersion ? config.paper_post_price : 0);
        }

    }
]);
