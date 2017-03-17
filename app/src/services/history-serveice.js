/*global app*/

app.service('HistoryService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.generateOtp = generateOtp;
        this.findHistory = findHistory;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 51, 60
        // Resolves to an object containing: otpId, requestCode
        function generateOtp(nationalCode, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/history/generate/otp', {
                    nationalCode: nationalCode,
                    mobilePhoneNumber: mobilePhoneNumber
                }))
                .then(function(body) {
                    var otpId = body.otpId,
                        requestCode = body.requestCode;
                    return {
                        otpId: otpId,
                        requestCode: requestCode
                    };
                });
        }

        // May reject by code : 1, 2, 5, 40, 70
        // Resolves to patient's history
        function findHistory(nationalCode, otpId, requestCode, otp) {
            return utils.httpPromiseHandler($http.post('/history/find/history', {
                    nationalCode: nationalCode,
                    otpId: otpId,
                    requestCode: requestCode,
                    otp: otp
                }))
                .then(function(body) {
                    return body.patient;
                });
        }

    }
]);