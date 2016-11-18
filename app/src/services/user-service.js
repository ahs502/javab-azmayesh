/*global app*/

app.service('UserService', ['$q', '$http', '$window',
    function($q, $http, $window) {

        this.register = register;
        this.registerConfirm = registerConfirm;
        this.login = login;
        this.logout = logout;
        this.current = current;

        function register(userData) {
            // 500, 409, 200.
            return $http.post('/user/register', {
                userData: userData,
                // recaptcha: userData.key
            }).then(function(response) {
                if (response.status != 200) {
                    console.log(response.status, response.body);
                    return $q.reject(response);
                }
                return {
                    status: 200
                };
            }, function(err) {
                console.error(err);
                return $q.reject({
                    status: 400
                });
            });
        }

        function registerConfirm(confirm) {
            // 500, 400, 400, 400, 200.
            return $http.post('/user/register/confirm', {
                username: confirm.username,
                validationCode: confirm.validationCode
            }).then(function(response) {
                if (response.status != 200) {
                    console.log(response.status, response.body);
                    return $q.reject(response);
                }
                return {
                    status: 200
                };
            }, function(err) {
                console.error(err);
                return $q.reject({
                    status: 400
                });
            });
        }

        function login(username, password) {
            // 500, 403, 200.
            return $http.post('/user/login', {
                username: username,
                password: password
            }).then(function(response) {
                if (response.status != 200) {
                    console.log(response.status, response.body);
                    return $q.reject(response);
                }
                var accessKey = response.body.accessKey,
                    user = response.body.user;
                $http.defaults.headers.common['X-Access-Token'] = accessKey;
                $window.sessionStorage['CurrentUser'] = JSON.stringify({
                    user: user,
                    accessKey: accessKey
                });
                return {
                    status: 200
                };
            }, function(err) {
                console.error(err);
                return $q.reject({
                    status: 400
                });
            });
        }

        function logout() {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            return $q.when({
                status: 200
            });
        }

        function current() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                if (!currentUser) return null;
                return currentUser.user || null;
            }
            catch (err) {
                return null;
            }
        }

    }
]);