/*global app*/

app.service('MasterService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.sendFeedback = sendFeedback;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80
        function sendFeedback(mobilePhoneNumber, message, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/master/send/feedback', {
                mobilePhoneNumber: mobilePhoneNumber,
                message: message
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

    }
]);
