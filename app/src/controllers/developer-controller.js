/*global app*/
/*global getEnvironmentProperties*/

app.controller('DeveloperController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.showEnvironmnetProperties = showEnvironmnetProperties;

        function showEnvironmnetProperties() {
            var eprop = getEnvironmentProperties();
            var extracted = {};
            for (var key in eprop)
                if (eprop[key])
                    extracted[key] = eprop[key];
            alert(JSON.stringify(extracted, null, 4));
        }

    }
]);
