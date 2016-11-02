/*global app*/
/*global $*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.setBackHandler($scope.menuHandlers.logout);

        $scope.setPageTitle('نام آزمایشگاه');

    }
]);
