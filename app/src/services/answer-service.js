/*global app*/
/*global angular*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.registerPatientDraft = registerPatientDraft;
        this.verifyPatientDraft = verifyPatientDraft;
        this.patientInfo = patientInfo;
        this.acceptPatient = acceptPatient;
        this.getAcceptances = getAcceptances;
        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 80, 120, 140
        function registerPatientDraft(person, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/patient/draft/register', {
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    gender: person.gender,
                    birthday: person.birthday,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email,
                    province: person.province,
                    city: person.city,
                    address: person.address,
                    postalCode: person.postalCode
                }
            }), function(data) {
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function verifyPatientDraft(nationalCode, validationCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/draft/verify', {
                nationalCode: nationalCode,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 5, 50, 52, 71, 100, 101
        // Resolves to patient personal and acceptance (if exists) information
        function patientInfo(nationalCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/info', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    var data = {
                        patient: {
                            nationalCode: body.patient.nationalCode,
                            fullName: body.patient.fullName,
                            gender: body.patient.gender,
                            birthday: body.patient.birthday,
                            numbers: body.patient.numbers || [],
                            email: body.patient.email,
                            province: body.patient.province,
                            city: body.patient.city,
                            address: body.patient.address,
                            postalCode: body.patient.postalCode
                        }
                    };
                    data.acceptance = body.acceptance ? {
                        request: body.acceptance.request,
                        payment: body.acceptance.payment,
                        timeStamp: new Date(body.acceptance.timeStamp)
                    } : null;
                    return data;
                });
        }

        // May reject by code : 1, 2, 5, 50, 52, 80, 100, 101, 120
        function acceptPatient(person, request, payment, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/patient/accept', {
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    gender: person.gender,
                    birthday: person.birthday,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email,
                    province: person.province,
                    city: person.city,
                    address: person.address,
                    postalCode: person.postalCode
                },
                request: {
                    electronicVersion: request.electronicVersion,
                    paperVersion: request.paperVersion
                },
                payment: payment
            }), function(data) {
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 50, 52, 100, 101
        // Resolves to all the user's current acceptances
        function getAcceptances() {
            return utils.httpPromiseHandler($http.post('/answer/get/acceptances', {}))
                .then(function(body) {
                    return (body.acceptances || []).map(function(acceptance) {
                        return {
                            username: acceptance.username,
                            nationalCode: acceptance.nationalCode,
                            request: acceptance.request,
                            payment: acceptance.payment,
                            timeStamp: new Date(acceptance.timeStamp)
                        };
                    });
                });
        }

        // May reject by code : 1, 2, 5, 50, 51, 52, 76, 77, 80, 100, 101, 120, 130
        function send(nationalCode, files, notes, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                nationalCode: nationalCode,
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
                if (angular.isFunction(invalidPersonHandler) && data.code === 80) {
                    invalidPersonHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        /////////////////////////////////////////////////////

    }
]);
