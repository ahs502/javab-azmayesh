/*global angular*/
/*global app*/
/*global d3*/

app.directive('zoomable', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,

        scope: {
            maxZoom: '&',

            top: '@',
            bottom: '@',
            right: '@',
            left: '@'
        },

        link: function(scope, instanceElement, instanceAttributes) {

            var root = instanceElement,
                content = angular.element(instanceElement[0].children[0]);

            var rootD3 = d3.select(root[0]),
                contentD3 = d3.select(content[0]);

            rootD3
                .style('position', 'fixed')
                .style('top', (scope.top || '0') + 'px')
                .style('bottom', (scope.bottom || '0') + 'px')
                .style('right', (scope.right || '0') + 'px')
                .style('left', (scope.left || '0') + 'px');

            contentD3
                .style('min-width', calculateWidth(root) + 'px')
                .style('min-height', calculateHeight(root) + 'px');

            var zoom = d3.zoom()
                .scaleExtent([1, maxZoom()])
                .duration(400)
                .on("zoom", zoomed);

            rootD3.call(zoom);

            function zoomed() {
                var e = d3.event,
                    rootWidth = calculateWidth(root),
                    rootHeight = calculateHeight(root),
                    contentWidth = calculateWidth(content),
                    contentHeight = calculateHeight(content),
                    s = e.transform.k,
                    x = e.transform.x,
                    y = e.transform.y;

                var a = (s - 1) / 2;
                x = Math.min(0, Math.max(x, rootWidth - contentWidth * s)) + a * contentWidth;
                y = Math.min(0, Math.max(y, rootHeight - contentHeight * s)) + a * contentHeight;

                e.transform.x = x - a * contentWidth;
                e.transform.y = y - a * contentHeight;

                var transformFunctions = "translate(" + x + "px," + y + "px) scale(" + s + ")";

                contentD3
                    .style('-webkit-transform', transformFunctions)
                    .style('-moz-transform', transformFunctions)
                    .style('-ms-transform', transformFunctions)
                    .style('-o-transform', transformFunctions)
                    .style('transform', transformFunctions);
            }

            function calculateWidth(element) {
                return element[0].offsetWidth || element[0].clientWidth;
            }

            function calculateHeight(element) {
                return element[0].offsetHeight || element[0].clientHeight;
            }

            function maxZoom() {
                try {
                    var attributeValue = scope.maxZoom();
                    if (!attributeValue) throw "No attribute max-zoom limit has been specified.";
                    if (typeof attributeValue !== 'number') throw "Attribute max-zoom limit is not a number.";
                    if (!(attributeValue > 0 && attributeValue < 100000)) throw "Attribute max-zoom limit is out of range.";
                    return attributeValue;
                }
                catch (error) {
                    console.error(error);
                    return 1.0;
                }
            }

        },
    };
}]);
