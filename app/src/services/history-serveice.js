/*global app*/

app.service('HistoryService', ['$http', 'Utils',
    function($http, utils) {

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

        // May reject by code : 1, 2, 5, 40, /*71*/
        // Resolves to patient's information and history
        function findHistory(nationalCode, otpId, requestCode, otp) {
            return utils.httpPromiseHandler($http.post('/history/find/history', {
                    nationalCode: nationalCode,
                    otpId: otpId,
                    requestCode: requestCode,
                    otp: otp
                }))
                .then(function(body) {
                    var //accessKey = body.accessKey,
                        patientInfo = body.patientInfo,
                        history = body.history;
                    return {
                        patientInfo: patientInfo,
                        history: history
                    };
                });
        }

    }
]);