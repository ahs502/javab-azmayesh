/*global app*/

app.service('UserService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.register = register;
        this.registerConfirm = registerConfirm;

        this.editAccount = editAccount;
        this.editPassword = editPassword;
        this.editConfirm = editConfirm;

        this.login = login;
        this.refresh = refresh;
        this.logout = logout;
        this.current = current;
        this.restorePassword = restorePassword;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 10, 11
        function register(userData) {
            return utils.httpPromiseHandler($http.post('/user/register', {
                userData: userData,
                recaptcha: userData.response
            }));
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/register/confirm', {
                username: username,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 3, 5, 50, 51, 100, 101
        function editAccount(username, newAccount) {
            return utils.httpPromiseHandler($http.post('/user/edit/account', {
                newAccount: newAccount
            }));
        }

        // May reject by code : 1, 2, 5, 40, 50, 51, 100, 101
        function editPassword(username, oldPassword, newPassword) {
            return utils.httpPromiseHandler($http.post('/user/edit/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }));
        }

        // May reject by code : 1, 2, 5, 30, 31, 32, 50, 100, 101
        // Resolves to current user new info
        function editConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/edit/confirm', {
                    username: username,
                    validationCode: validationCode
                }))
                .then(function(body) {
                    var userInfo = body.userInfo;
                    setCurrent(undefined, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user info
        function login(username, password) {
            return utils.httpPromiseHandler($http.post('/user/login', {
                    username: username,
                    password: password
                }))
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = body.userInfo;
                    $http.defaults.headers.common['X-Access-Token'] = accessKey;
                    setCurrent(accessKey, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 50, 51, 100, 101
        // Resolves to current user new info
        function refresh() {
            if (current() === null) {
                return $q.reject(50);
            }
            return utils.httpPromiseHandler($http.post('/user/refresh', {}))
                .then(function(body) {
                    var userInfo = body.userInfo;
                    setCurrent(undefined, userInfo);
                    return userInfo;
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
                var userInfo = currentUser.userInfo;
                if (!userInfo) return null;
                userInfo.timeStamp = new Date(userInfo.timeStamp);
                return userInfo;
            }
            catch (err) {
                return null;
            }
        }

        // May reject by code : 1, 2, 5, 51, 60
        function restorePassword(username, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/user/restorePassword', {
                username: username,
                mobilePhoneNumber: mobilePhoneNumber
            }));
        }

        /////////////////////////////////////////////////////

        function setCurrent(accessKey, userInfo) {
            var data;
            try {
                data = JSON.parse($window.sessionStorage['CurrentUser'] || '{}') || {};
            }
            catch (err) {
                data = {};
            }
            (accessKey !== undefined) && (data.accessKey = accessKey);
            (userInfo !== undefined) && (data.userInfo = userInfo);
            $window.sessionStorage['CurrentUser'] = JSON.stringify(data);
        }

    }
]);