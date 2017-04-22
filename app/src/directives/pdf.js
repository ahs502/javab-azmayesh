/*global angular*/
/*global app*/
/*global resourceLoader*/
/*global PDFJS*/

app.directive('pdf', ['$timeout', function($timeout) {
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
            '        در حال بارگذاری...',
            '    </p>',
            '    <div ng-hide="loading" class="pdf-canvas-container">',
            '    </div>',
            '</div>',
        ].join(''),

        link: function(scope, instanceElement, instanceAttributes) {
            if (!scope.src) return;

            var container = angular.element(instanceElement[0].querySelector('.pdf-canvas-container'));
            container.css('width', scope.width || '100&');
            var desiredWidth = Number(container.css('width').slice(0, -2));

            scope.loading = true;
            resourceLoader.js('/dist/lib/pdf.min.js', function() {
                scope.loading = !!PDFJS;
                PDFJS && PDFJS.getDocument(scope.src).then(function(pdf) {
                    var pageCount = pdf.numPages;
                    return Promise.all(Array.range(1, pageCount).map(function(pageNumber) {
                        return pdf.getPage(pageNumber).then(function(page) {
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
                    })).then(function(canvasArray) {
                        canvasArray = canvasArray || [];
                        for (var i = 0; i < canvasArray.length; i++)
                            container.append(canvasArray[i]);
                    });
                }).catch(function(err) {
                    console.error(err);
                }).then(function() {
                    $timeout(function() {
                        scope.loading = false;
                    });
                });

            });
        },
    };
}]);
