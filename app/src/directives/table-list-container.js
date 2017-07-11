/*global angular*/
/*global app*/

app.directive('tableListContainer', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        scope: false,

        compile: function(templateElement, templateAttribute) {

            var table = templateElement.find('table');
            var thead = table.find('thead');
            var tbody = table.find('tbody');

            var tableMinWidth = templateAttribute['tableListContainer'];
            if (tableMinWidth) {
                table.css('min-width', tableMinWidth);
            }

            [{
                element: thead,
                selector: 'th'
            }, {
                element: tbody,
                selector: 'td'
            }]
            .forEach(function(item) {
                item.element.length && item.element.find(item.selector).each(function(index) {
                    var tx = angular.element(this);
                    if (tx.is('[fa]')) {
                        tx.addClass('nazanin');
                        tx.addClass('ja-rtl');
                        tx.removeAttr('fa');
                    }
                    else {
                        tx.addClass('ja-ltr');
                    }
                    if (tx.is('[r]')) {
                        tx.addClass('ja-align-right');
                        tx.removeAttr('r');
                    }
                    if (tx.is('[l]')) {
                        tx.addClass('ja-align-left');
                        tx.removeAttr('l');
                    }
                    if (tx.is('[c]')) {
                        tx.addClass('ja-align-center');
                        tx.removeAttr('c');
                    }
                    if (tx.is('[b]')) {
                        tx.addClass('ja-bold');
                        tx.removeAttr('b');
                    }
                    if (tx.is('[i]')) {
                        tx.addClass('ja-italic');
                        tx.removeAttr('i');
                    }
                });
            });

            return function link(scope, instanceElement, instanceAttributes) {

                if (instanceElement.is('[initialiy-right]')) {
                    scope.$watch(getToBeScrolled, scrollToRight);
                }

                function scrollToRight() {
                    var toBeScrolled = getToBeScrolled();
                    if (!toBeScrolled) return;
                    // instanceElement.scrollLeft(0);
                    instanceElement.animate({
                        scrollLeft: toBeScrolled
                    }, 1000);
                }

                function getToBeScrolled() {
                    return instanceElement[0].scrollWidth - instanceElement[0].clientWidth;
                }

            };

        },

    };
}]);
