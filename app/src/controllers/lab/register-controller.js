/*global app*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'vcRecaptchaService', 'UserService',
    function($rootScope, $scope, $state, $stateParams, $timeout, vcRecaptchaService, userService) {

        $scope.setResponse = setResponse;
        $scope.setWidgetId = setWidgetId;
        $scope.cbExpiration = cbExpiration;
        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.key = '6LexDAwUAAAAAPXalUBl6eGUWa3dz7PrXXa-a7EG';
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

        function setResponse(response) {
            $scope.response = response;
        }

        function setWidgetId(widgetId) {
            $scope.widgetId = widgetId;
        }

        function cbExpiration() {
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        }

        function sendRegisterationForm() {
            //TODO: check for validity
            $scope.sendingRegisterationForm = true;
            $scope.model.response = $scope.response;
            return userService.register($scope.model)
                .then(function() {
                    $state.go('lab.validate', {
                        username: $scope.model.username
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.sendingRegisterationForm = false;
                    alert(code);
                    vcRecaptchaService.reload($scope.widgetId);
                });
        }

    }
]);
