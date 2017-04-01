/*global app*/

app.factory('Utils', ['$q', '$http', '$window',
    function($q, $http, $window) {

        return {
            httpPromiseHandler: httpPromiseHandler,
        };

        function httpPromiseHandler(promise, rejectionDataProcessor) {
            return promise.then(successHandlerMaker(rejectionDataProcessor), failureHandler);
        }

        function successHandlerMaker(rejectionDataProcessor) {
            return function successHandler(response) {
                if (response.status != 200) {
                    console.log(response.status, response.data);
                    return $q.reject(1);
                }
                if (response.data.code !== 0) {
                    if (typeof rejectionDataProcessor === 'function') {
                        rejectionDataProcessor(response.data);
                    }
                    return $q.reject(response.data.code || 1);
                }
                return response.data;
            };
        }

        function failureHandler(err) {
            console.error(err);
            return $q.reject(2);
        }

    }
]);
