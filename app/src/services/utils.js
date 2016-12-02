/*global app*/

app.factory('Utils', ['$q', '$http', '$window',
    function($q, $http, $window) {

        return {
            successHandler: successHandler,
            failureHandler: failureHandler,
        };

        function successHandler(response) {
            if (response.status != 200) {
                console.log(response.status, response.data);
                return $q.reject(1);
            }
            if (response.data.code !== 0) {
                return $q.reject(response.data.code || 1);
            }
            return response.data;
        }

        function failureHandler(err) {
            console.error(err);
            return $q.reject(2);
        }

    }
]);
