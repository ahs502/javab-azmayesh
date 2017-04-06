/*global app*/
/*global $*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window',
    function($scope, $rootScope, $q, $window) {

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;

        $scope.showMessage = showMessage;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        function setBackHandler(handler) {
            $scope.backHandler = handler;
        }

        function setMenuHandlers(handlerObject) {
            $scope.menuHandlers = handlerObject;
        }

        function setHeaderHandlers(handlerObject) {
            $scope.headerHandlers = handlerObject;
        }

        function setFooterHandlers(handlerObject) {
            $scope.footerHandlers = handlerObject;
        }

        function toggleMenu() {
            $('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        }

        function showMessage(title, message, ok) {
            $scope.modal = {
                title: title,
                message: message,
                ok: ok || 'تأیید'
            };
            var defer = $q.defer();
            $('#ja-informer-modal')
                .modal({
                    onHide: function() {
                        defer.resolve();
                    }
                })
                .modal('show');
            return defer.promise;
        }

    }
]);
