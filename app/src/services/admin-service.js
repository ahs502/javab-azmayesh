/*global app*/

app.service('AdminService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        // All services may reject by code : 1, 2, 5, 50, 52, 100, 101

        this.getAllLaboratories = getAllLaboratories;
        this.editLaboratory = editLaboratory;
        this.removeLaboratory = removeLaboratory;
        this.sendDummySms = sendDummySms;

        /////////////////////////////////////////////////////

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
