/*global app*/
/*global angular*/
/*global getEnvironmentProperties*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window', '$timeout', 'Config',
    function($scope, $rootScope, $q, $window, $timeout, config) {

        // $scope.log = function() {
        //     console.log.apply(console, Array.prototype.slice.call(arguments));
        // };

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;
        $rootScope.hideMenu = hideMenu;

        $scope.showMessage = showMessage;
        $scope.showConfirmMessage = showConfirmMessage;
        $scope.showDeveloperModal = showDeveloperModal;
        $scope.showRulesModal = showRulesModal;
        $scope.showValidationCodeModal = showValidationCodeModal;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        $scope.showAfterFormSpace = getEnvironmentProperties().mobile;

        $window.addEventListener('scroll', function(event) {
            if (typeof $rootScope.hideMenu === 'function') {
                $rootScope.hideMenu();
            }
        });

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

        function hideMenu() {
            angular.element('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('hide');
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
                    onDeny: function() {
                        defer.reject();
                    }
                })
                .modal('show');
            return defer.promise;
        }

        function showDeveloperModal() {
            if (!config.developer_modal) return;
            angular.element('#ja-developer-modal')
                .modal('show');
        }

        function showRulesModal() {
            angular.element('#ja-rules-modal')
                .modal('show');
        }

        function showValidationCodeModal() {
            $scope.modal = {
                validationCode: null
            };
            var defer = $q.defer();
            angular.element('#ja-validation-code-modal')
                .modal({
                    onApprove: function() {
                        defer.resolve($scope.modal.validationCode);
                    }
                })
                .modal('show');
            return defer.promise;
        }
    }
]);
