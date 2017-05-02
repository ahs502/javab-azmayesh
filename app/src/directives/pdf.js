/*global angular*/
/*global app*/
/*global resourceLoader*/
/*global PDFJS*/

app.directive('pdf', ['$timeout', '$window', function($timeout, $window) {
    return {
        restrict: 'E',
        replace: true,

        scope: {
            src: '@ngSrc',
            width: '@'
        },

        template: [
            '<div>',
            '    <p class="nazanin ja-rtl ja-align-right" ng-show="loading">',
            '        در حال بارگذاری اطلاعات، لطفاً کمی صبر کنید...',
            '    </p>',
            '    <div ng-hide="loading" class="pdf-canvas-container"></div>',
            '</div>',
        ].join(''),

        link: function(scope, instanceElement, instanceAttributes) {
            if (!scope.src) return;

            var container = angular.element(instanceElement[0].querySelector('.pdf-canvas-container'));
            container.css('width', scope.width || '100%');
            var allPages = null,
                desiredWidth;

            scope.loading = true;
            resourceLoader.js('/dist/lib/pdf.min.js', function() {
                scope.loading = !!PDFJS;
                PDFJS && PDFJS.getDocument(scope.src).then(function(pdf) {
                    return Promise.all(Array.range(1, pdf.numPages).map(function(pageNumber) {
                        return pdf.getPage(pageNumber);
                    }));
                }).then(function(pages) {
                    allPages = pages;
                    renderPages();
                }).catch(function(err) {
                    console.error(err);
                }).then(function() {
                    $timeout(function() {
                        scope.loading = false;
                    });
                });

            });

            $window.addEventListener('resize', resizeEventHandler);
            scope.$on('$destroy', function() {
                $window.removeEventListener('resize', resizeEventHandler);
            });

            function resizeEventHandler(event) {
                if (desiredWidth != calculateDesiredWidth()) renderPages();
            }

            function renderPages() {
                if (!allPages) return;
                container.empty();
                desiredWidth = calculateDesiredWidth();
                var canvasArray = allPages.map(function(page) {
                    var viewport = page.getViewport(1);
                    viewport = page.getViewport(desiredWidth / viewport.width);
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                    return canvas;
                });
                for (var i = 0; i < canvasArray.length; i++) {
                    container.append(canvasArray[i]);
                }
            }

            function calculateDesiredWidth() {
                return instanceElement[0].offsetWidth || instanceElement[0].clientWidth;
            }

        },
    };
}]);
