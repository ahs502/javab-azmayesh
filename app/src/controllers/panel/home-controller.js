/*global app*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setBackHandler($scope.menuHandlers.logout);

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.labName) || ' ');

    }
]);
