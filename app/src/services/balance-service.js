/*global app*/

app.service('BalanceService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.submitC2cReceiptCode = submitC2cReceiptCode;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80, 100, 101
        function submitC2cReceiptCode(c2cReceiptCode, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/balance/submit/c2cReceiptCode', {
                c2cReceiptCode: c2cReceiptCode
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

    }
]);
