/*global app*/

app.controller('MasterController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.onBackClicked = onBackClicked;
        $scope.onMenuClicked = onMenuClicked;

        $scope.back = undefined;
        $scope.menu = undefined;

        function onBackClicked(handler) {
            $scope.back = handler;
        }

        function onMenuClicked(handler) {
            $scope.menu = handler;
        }

    }
]);
