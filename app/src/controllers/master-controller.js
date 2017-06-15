/*global app*/
/*global angular*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window', '$timeout',
    function($scope, $rootScope, $q, $window, $timeout) {

        // $scope.log = function() {
        //     console.log.apply(console, Array.prototype.slice.call(arguments));
        // };

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;

        $scope.showMessage = showMessage;
        $scope.showConfirmMessage = showConfirmMessage;

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
            angular.element('#ja-sidebar-menu')
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
            angular.element('#ja-informer-modal')
                .modal({
                    onHide: function() {
                        defer.resolve();
                    }
                })
                .modal('show');
            return defer.promise;
        }

        function showConfirmMessage(title, message, yes, no, yesColor, noColor) {
            $scope.modal = {
                title: title,
                message: message,
                yes: yes || 'بله',
                no: no || 'خیر',
                yesColor: yesColor || 'green',
                noColor: noColor || 'blue'
            };
            var defer = $q.defer();
            angular.element('#ja-confirm-modal')
                .modal({
                    onApprove: function() {
                        defer.resolve();
                    },
                    onDecline: function() {
                        defer.reject();
                    }
                })
                .modal('show');
            return defer.promise;
        }

    }
]);
