/*global app*/
/*global $*/

app.controller('MasterController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.onBackClicked = onBackClicked;
        $scope.setMenuEvents = setMenuEvents;
        $scope.toggleMenu = toggleMenu;

        $scope.backHandler = undefined;
        $scope.menuEvents = undefined;

        function onBackClicked(handler) {
            $scope.backHandler = handler;
        }

        function setMenuEvents(events) {
            $scope.menuEvents = events;
        }

        function toggleMenu() {
            $('#sidebarMenu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        }

    }
]);
