/*global app*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.patientInfo = patientInfo;
        this.updatePatient = updatePatient;
        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 52, 71, 100, 101
        // Resolves to patient personal information
        function patientInfo(nationalCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/info', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    return {
                        fullName: body.fullName,
                        numbers: body.numbers || [],
                        email: body.email
                    };
                });
        }

        // May reject by code : 1, 2, 5, 50, 52, 80, 100, 101
        function updatePatient(person, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/patient/update', {
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email
                }
            }), function(data) {
                if (invalidPersonHandler)
                    invalidPersonHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 50, 51, 52, 80, 100, 101, 120, 130
        function send(person, files, notes, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                timeStamp: Date.now(),
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email
                },
                files: files.map(function(file) {
                    return {
                        serverName: file.serverName,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                }),
                notes: notes
            }), function(data) {
                if (invalidPersonHandler)
                    invalidPersonHandler(data.errors || {});
            });
        }

        /////////////////////////////////////////////////////

    }
]);
