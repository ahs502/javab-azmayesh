/*global app*/

app.service('AdminService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        // All services may reject by code : 1, 2, 5, 50, 52, 100, 101

        this.getNotSentSmses = getNotSentSmses;
        this.tryAgainNotSentSms = tryAgainNotSentSms;
        this.checkNotSentSms = checkNotSentSms;

        this.getNotActivatedLabs = getNotActivatedLabs;
        this.approveInactiveLab = approveInactiveLab;
        this.declineInactiveLab = declineInactiveLab;

        this.getAllLaboratories = getAllLaboratories;
        this.editLaboratory = editLaboratory;
        this.removeLaboratory = removeLaboratory;

        this.sendDummySms = sendDummySms;

        /////////////////////////////////////////////////////

        function getNotSentSmses() {
            return utils.httpPromiseHandler($http.post('/admin/getNotSentSmses', {}))
                .then(function(body) {
                    return (body.smsStateStatusList || []).map(function(smsStateStatus) {
                        smsStateStatus.data.timeStamp = new Date(smsStateStatus.data.timeStamp);
                        return smsStateStatus;
                    });
                });
        }

        function tryAgainNotSentSms(smsKey) {
            return utils.httpPromiseHandler($http.post('/admin/tryAgainNotSentSms', {
                smsKey: smsKey
            }));
        }

        function checkNotSentSms(smsKey) {
            return utils.httpPromiseHandler($http.post('/admin/checkNotSentSms', {
                smsKey: smsKey
            }));
        }

        function getNotActivatedLabs() {
            return utils.httpPromiseHandler($http.post('/admin/getNotActivatedLabs', {}))
                .then(function(body) {
                    return (body.inactiveLabs || []).map(function(inactiveLab) {
                        inactiveLab.timeStamp = new Date(inactiveLab.timeStamp);
                        return inactiveLab;
                    });
                });
        }

        function approveInactiveLab(labData) {
            labData.timeStamp = labData.timeStamp.getTime();
            return utils.httpPromiseHandler($http.post('/admin/approveInactiveLab', {
                labData: labData
            }));
        }

        function declineInactiveLab(labUsername) {
            return utils.httpPromiseHandler($http.post('/admin/declineInactiveLab', {
                labUsername: labUsername
            }));
        }

        function getAllLaboratories() {
            return utils.httpPromiseHandler($http.post('/admin/getAllLaboratories', {}))
                .then(function(body) {
                    return (body.laboratories || []).map(function(lab) {
                        lab.timeStamp = new Date(lab.timeStamp);
                        return lab;
                    });
                });
        }

        function editLaboratory(labUsername, labData) {
            return utils.httpPromiseHandler($http.post('/admin/editLaboratory', {
                labUsername: labUsername,
                labData: labData
            }));
        }

        function removeLaboratory(labUsername) {
            return utils.httpPromiseHandler($http.post('/admin/removeLaboratory', {
                labUsername: labUsername
            }));
        }

        function sendDummySms(phoneNumber, message) {
            return utils.httpPromiseHandler($http.post('/admin/sendDummySms', {
                phoneNumber: String(phoneNumber),
                message: message
            }));
        }

    }
]);
