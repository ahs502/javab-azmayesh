/*global app*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 100, 101
        function send(person, files, notes) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                timeStamp: Date.now(),
                person: {
                    fullName: person.fullName,
                    nationalCode: person.nationalCode,
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
            }));
        }

        /////////////////////////////////////////////////////

    }
]);