/*global app*/

app.service('UserService', ['$q', '$http', '$window',
    function($q, $http, $window) {

        this.register = register;
        this.registerConfirm = registerConfirm;
        this.login = login;
        this.logout = logout;
        this.current = current;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 10, 11
        function register(userData) {
            return $http.post('/user/register', {
                    userData: userData,
                    recaptcha: userData.response
                })
                .then(successHandler)
                .catch(failureHandler);
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return $http.post('/user/register/confirm', {
                    username: username,
                    validationCode: validationCode
                })
                .then(successHandler)
                .catch(failureHandler);
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user
        function login(username, password) {
            return $http.post('/user/login', {
                    username: username,
                    password: password
                })
                .then(successHandler)
                .catch(failureHandler)
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = body.userInfo;
                    $http.defaults.headers.common['X-Access-Token'] = accessKey;
                    return $window.sessionStorage['CurrentUser'] = JSON.stringify({
                        userInfo: userInfo,
                        accessKey: accessKey
                    });
                });
        }

        // No rejection
        function logout() {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            return $q.when();
        }

        // Returns current user
        function current() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                if (!currentUser) return null;
                return currentUser.userInfo || null;
            }
            catch (err) {
                return null;
            }
        }

        /////////////////////////////////////////////////////

        function successHandler(response) {
            if (response.status != 200) {
                console.log(response.status, response.data);
                return $q.reject(1);
            }
            if (response.data.code !== 0) {
                return $q.reject(response.data.code || 1);
            }
            return response.data;
        }

        function failureHandler(err) {
            console.error(err);
            return $q.reject(2);
        }

    }
]);