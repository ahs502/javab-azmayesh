/*global app*/

app.controller('MasterController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.back = undefined;
        $scope.onBackClicked = onBackClicked;

        function onBackClicked(handler) {
            $scope.back = handler;
            //$rootScope.$apply();
        }

    }
]);
