/*global app*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'vcRecaptchaService', 'UserService',
    function($rootScope, $scope, $state, $stateParams, $timeout, vcRecaptchaService, userService) {

        // $scope.setResponse = setResponse;
        // $scope.setWidgetId = setWidgetId;
        // $scope.cbExpiration = cbExpiration;
        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.username = $stateParams.username;

        $scope.sendingRegisterationForm = false;

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

        $scope.model = {
            key: '6LexDAwUAAAAAPXalUBl6eGUWa3dz7PrXXa-a7EG'
        };

        // function setResponse(response) {
        //     $scope.response = response;
        // };

        // function setWidgetId(widgetId) {
        //     $scope.widgetId = widgetId;
        // };

        // function cbExpiration() {
        //     vcRecaptchaService.reload($scope.widgetId);
        //     $scope.response = null;
        // };

        function sendRegisterationForm() {
            //TODO: check for validity
            $scope.sendingRegisterationForm = true;
            return userService.register($scope.model).then(function() {
                $state.go('lab.validate', {
                    username: $scope.username
                });
            }, function(response) {
                //TODO: Handle errors...
                $scope.sendingRegisterationForm = false;
                alert(JSON.stringify(response, null, 4));
                // vcRecaptchaService.reload($scope.widgetId);
            });
        }

    }
]);
