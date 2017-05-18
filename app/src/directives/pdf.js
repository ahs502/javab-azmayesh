/*global angular*/
/*global app*/
/*global resourceLoader*/
/*global PDFJS*/

// States are: 'init', 'loading pdf', 'loaded pdf', 'loading pages',
//             'loaded pages', 'render start', 'render finish', 'error'
app.directive('pdf', ['$timeout', '$window', function($timeout, $window) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,

        scope: {
            src: '@ngSrc',
            model: '=?ngModel',
            width: '@',
            hideRendering: '@',
            eventHandler: '&'
        },

        template: [
            '<div>',
            '    <div ng-if="loading" ng-transclude></div>',
            '    <div ng-hide="loading" class="pdf-canvas-container"></div>',
            '</div>',
        ].join(''),

        link: function(scope, instanceElement, instanceAttributes) {

            scope.model = scope.model || {};
            var hasPdf = !!scope.model.pdf,
                hasPages = scope.model.pages && Array.isArray(scope.model.pages);

            if (!(hasPdf && hasPages) && !scope.src) {
                scope.eventHandler({
                    event: 'error',
                    error: 'No URL has been specified.'
                });
                return;
            }

            var desiredWidth,
                container = angular.element(instanceElement[0].querySelector('.pdf-canvas-container'));
            container.css('width', scope.width || '100%');

            var hideRendering = scope.hideRendering === 'true',
                state = 'init',
                eventHandler = function(event) {
                    event.state = state;
                    state = event.event;
                    scope.model && (scope.model.state = state);
                    var stateEventHandler = scope.eventHandler();
                    if (typeof stateEventHandler === 'function') {
                        stateEventHandler(event);
                    }
                };

            scope.loading = true;
            var promise;

            if (hasPdf) {
                promise = Promise.resolve(scope.model.pdf);
            }
            else {
                promise = new Promise(function(resolve, reject) {
                    resourceLoader.js('/dist/lib/pdf.min.js', function() {
                        if (PDFJS) {
                            eventHandler({
                                event: 'loading pdf'
                            });
                            PDFJS.getDocument(scope.src).then(function(pdf) {
                                scope.model && (scope.model.pdf = pdf);
                                eventHandler({
                                    event: 'loaded pdf',
                                    pdf: pdf
                                });
                                resolve(pdf);
                            }, function(reason) {
                                reject('Could not resolve pdf.');
                            });
                        }
                        else {
                            reject('Could not resolve PDFJS.');
                        }
                    });
                });
            }

            if (hasPages) {
                promise = promise.then(function(pdf) {
                    return scope.model.pages;
                });
            }
            else {
                promise = promise.then(function(pdf) {
                    eventHandler({
                        event: 'loading pages'
                    });
                    return Promise.all(Array.range(1, pdf.numPages).map(function(pageNumber) {
                        return pdf.getPage(pageNumber);
                    })).then(function(pages) {
                        pages.forEach(function(page) {
                            page.createCanvas = function(width) {
                                var viewport = page.getViewport(1);
                                viewport = page.getViewport(width / viewport.width);
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;
                                var renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };
                                return {
                                    canvas: canvas,
                                    promise: page.render(renderContext)
                                };
                            };
                            page.createDataURL = function(width, mimeType, quality) {
                                var result = page.createCanvas(width);
                                return new Promise(function(resolve, reject) {
                                    result.promise.then(function() {
                                        resolve(result.canvas.toDataURL(mimeType, quality));
                                    }, function(error) {
                                        reject(error);
                                    });
                                });
                            };
                        });
                        scope.model && (scope.model.pages = pages);
                        eventHandler({
                            event: 'loaded pages',
                            pages: pages
                        });
                        return pages;
                    }, function(reason) {
                        return Promise.reject('Could not resolve pages.');
                    });
                });
            }

            promise.then(function(pages) {
                renderPages();
                if (!hideRendering) {
                    $timeout(function() {
                        scope.loading = false;
                    });
                }
            }).catch(function(reason) {
                eventHandler({
                    event: 'error',
                    error: reason
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
                if (!scope.model || !Array.isArray(scope.model.pages)) return;
                if (hideRendering) {
                    $timeout(function() {
                        scope.loading = true;
                    });
                }
                container.empty();
                desiredWidth = calculateDesiredWidth();
                eventHandler({
                    event: 'render start',
                    desiredWidth: desiredWidth
                });
                return Promise.all(scope.model.pages.map(function(page) {
                    var result = page.createCanvas(desiredWidth);
                    page.canvas = result.canvas;
                    container.append(result.canvas);
                    return result.promise;
                })).then(function() {
                    if (hideRendering) {
                        $timeout(function() {
                            scope.loading = false;
                        }).then(renderFinishEventHandler);
                    }
                    else {
                        renderFinishEventHandler();
                    }

                    function renderFinishEventHandler() {
                        eventHandler({
                            event: 'render finish'
                        });
                    }
                });
            }

            function calculateDesiredWidth() {
                return instanceElement[0].offsetWidth || instanceElement[0].clientWidth;
            }

        },
    };
}]);
