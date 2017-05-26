/*global app*/

app.service('MasterService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.sendFeedback = sendFeedback;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 80
        function sendFeedback(email, message, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/master/send/feedback', {
                email:email,
                message:message
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

    }
]);