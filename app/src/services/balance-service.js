/*global app*/
/*global angular*/

app.service('BalanceService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.submitC2cReceiptCode = submitC2cReceiptCode;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 52, 80, 100, 101
        function submitC2cReceiptCode(c2cReceiptCode, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/balance/submit/c2cReceiptCode', {
                c2cReceiptCode: c2cReceiptCode
            }), function(data) {
                if (angular.isFunction(invalidModelHandler) && data.code === 80) {
                    invalidModelHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

    }
]);
