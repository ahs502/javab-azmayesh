/*global app*/
/*global angular*/
/*global resourceLoader*/

app.factory('DynamicResourceLoader', ['$timeout',
    function($timeout) {

        return dynamicResourceLoader;

        function dynamicResourceLoader(dynamicResources, explicitly, callback) {
            var urls = [].concat(dynamicResources || []).map(function(url) {
                    return '/dist/' + url;
                }),
                hasUrls = urls.length !== 0;

            if (explicitly && hasUrls) {
                angular.element('#ja-initial-loader-background').show();
                angular.element('#ja-initial-loader').show();
                angular.element('#ja-main-site-content').hide();
                angular.element('#ja-sidebar-menu').hide();
            }

            function wrappedCallback() {
                if ((explicitly && hasUrls) || typeof callback === 'function') $timeout(function() {
                    if (explicitly && hasUrls) {
                        angular.element('#ja-initial-loader-background').hide();
                        angular.element('#ja-initial-loader').hide();
                        angular.element('#ja-main-site-content').show();
                        angular.element('#ja-sidebar-menu').show();
                    }
                    (typeof callback === 'function') && callback();
                });
            }

            if (!hasUrls) return (wrappedCallback(), 0);
            return resourceLoader(urls, wrappedCallback);
        }

    }
]);
