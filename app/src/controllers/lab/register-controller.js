/*global app*/
/*global ValidationSystem*/
/*global sscAlert*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    'vcRecaptchaService', 'UserService', 'Config',
    function($rootScope, $scope, $state, $stateParams, $timeout,
        vcRecaptchaService, userService, config) {

        $scope.setResponse = setResponse;
        $scope.setWidgetId = setWidgetId;
        $scope.cbExpiration = cbExpiration;
        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.showGoogleRecaptcha = config.google_recaptcha;
        $scope.key = config.google_recaptcha_public_key;
        $scope.sendingRegisterationForm = false;
        $scope.model = {};

        $scope.model.username = $stateParams.username;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.model.labName
        //$scope.model.mobilePhoneNumber
        //$scope.model.phoneNumber
        //$scope.model.address
        //$scope.model.postalCode
        //$scope.model.websiteAddress
        //$scope.model.username
        //$scope.model.password
        //$scope.model.passwordAgain
        //$scope.model.acceptRules

        $scope.vs = new ValidationSystem($scope.model)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ])
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.passwordAgain && $scope.model.passwordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('passwordAgain', [
                function(value) {
                    if (!$scope.model.password) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.password != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('acceptRules', [
                ValidationSystem.validators.notEmpty('پذیرفتن قوانین و مقررات الزامی است')
            ]);

        function setResponse(response) {
            $scope.response = response;
        }

        function setWidgetId(widgetId) {
            $scope.widgetId = widgetId;
        }

        function cbExpiration() {
            config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        }

        function sendRegisterationForm() {
            if (!$scope.vs.validate()) return;

            $scope.sendingRegisterationForm = true;
            config.google_recaptcha && ($scope.model.response = $scope.response);
            return userService.register($scope.model, $scope.vs.dictate)
                .then(function() {
                    $state.go('lab.validate', {
                        username: $scope.model.username
                    });
                }, function(code) {
                    $scope.sendingRegisterationForm = false;
                    sscAlert(code);
                    config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
                });
        }

    }
]);
