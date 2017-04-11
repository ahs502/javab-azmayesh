/*global app*/

app.service('HistoryService', ['$http', 'Utils',
    function($http, utils) {

        this.generateOtp = generateOtp;
        this.findHistory = findHistory;
        this.loadAnswer = loadAnswer;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 51, 60, 120
        // Resolves to an object containing: otpId, requestCode
        function generateOtp(nationalCode, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/history/generate/otp', {
                    nationalCode: nationalCode,
                    mobilePhoneNumber: mobilePhoneNumber
                }))
                .then(function(body) {
                    return {
                        otpId: body.otpId,
                        requestCode: body.requestCode
                    };
                });
        }

        // May reject by code : 1, 2, 5, 40, /*70*/, 71
        // Resolves to patient's information and history
        function findHistory(nationalCode, otpId, requestCode, otp) {
            return utils.httpPromiseHandler($http.post('/history/find/history', {
                    nationalCode: nationalCode,
                    otpId: otpId,
                    requestCode: requestCode,
                    otp: otp
                }))
                .then(function(body) {
                    return {
                        // accessKey = body.accessKey,
                        patientInfo: body.patientInfo,
                        history: body.history
                    };
                });
        }

        // May reject by code : 1, 2, 5, 71, 72, 73
        // Resolves to patient's answer content
        function loadAnswer(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/history/load/answer', {
                    nationalCode: nationalCode,
                    postCode: postCode
                }))
                .then(function(body) {
                    return {
                        patientName: body.patientName,
                        labName: body.labName,
                        labUsername: body.labUsername,
                        postDate: new Date(body.timeStamp),
                        notes: body.notes,
                        files: body.files
                    };
                });
        }

    }
]);