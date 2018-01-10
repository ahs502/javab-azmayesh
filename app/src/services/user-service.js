/*global app*/
/*global angular*/

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

        this.getUserSession = getUserSession;
        this.setUserSession = setUserSession;
        this.getUserPersistent = getUserPersistent;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 10, 11, 80
        function register(model, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/user/register', {
                userData: {
                    labName: model.labName,
                    mobilePhoneNumber: model.mobilePhoneNumber,
                    phoneNumber: model.phoneNumber,
                    address: model.address,
                    postalCode: model.postalCode,
                    websiteAddress: model.websiteAddress,
                    username: model.username,
                    password: model.password
                },
                recaptcha: model.response
            }), function(data) {
                if (angular.isFunction(invalidModelHandler) && data.code === 80) {
                    invalidModelHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/register/confirm', {
                username: username,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 3, 5, 50, 51, 52, 80, 100, 101, 120
        function editAccount(newAccount, invalidNewAccountHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/account', {
                newAccount: {
                    labName: newAccount.labName,
                    mobilePhoneNumber: newAccount.mobilePhoneNumber,
                    phoneNumber: newAccount.phoneNumber,
                    address: newAccount.address,
                    postalCode: newAccount.postalCode,
                    websiteAddress: newAccount.websiteAddress,
                }
            }), function(data) {
                if (angular.isFunction(invalidNewAccountHandler) && data.code === 80) {
                    invalidNewAccountHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 50, 51, 52, 80, 100, 101, 120
        function editPassword(oldPassword, newPassword, invalidNewPasswordHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }), function(data) {
                if (angular.isFunction(invalidNewPasswordHandler) && data.code === 80) {
                    invalidNewPasswordHandler(data.errors || {});
                }
                else return $q.reject(data.code);
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32, 50, 52, 100, 101
        // Resolves to current user new info
        function editConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/edit/confirm', {
                    username: username,
                    validationCode: validationCode
                }))
                .then(function(body) {
                    var userInfo = body.userInfo;
                    setCurrent(undefined, userInfo);
                    return processUserInfo(userInfo);
                });
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user info
        function login(username, password, rememberMe) {
            return utils.httpPromiseHandler($http.post('/user/login', {
                    username: username,
                    password: password,
                    rememberMe: rememberMe
                }))
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = body.userInfo;
                    setCurrent(accessKey, userInfo);
                    if (rememberMe) {
                        $window.localStorage['CurrentUser'] = $window.sessionStorage['CurrentUser'];
                    }
                    else {
                        $window.localStorage.removeItem('CurrentUser');
                    }
                    return processUserInfo(userInfo);
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
                    return processUserInfo(userInfo);
                });
        }

        // Sync & Async; No rejection
        function logout(sessionStorageOnly) {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            sessionStorageOnly || delete $window.localStorage['CurrentUser'];
            return $q.when();
        }

        // Returns current user
        function current() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                if (!currentUser) return null;
                var userInfo = processUserInfo(currentUser.userInfo);
                return userInfo || null;
            }
            catch (err) {
                return null;
            }
        }

        // May reject by code : 1, 2, 5, 51, 60, 120
        function restorePassword(username, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/user/restorePassword', {
                username: username,
                mobilePhoneNumber: mobilePhoneNumber
            }));
        }

        // Gets the current authorization status
        function getUserSession() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                return currentUser || null;
            }
            catch (err) {
                return null;
            }
        }

        // Sets the current authorization status
        function setUserSession(userSession) {
            userSession && setCurrent(userSession.accessKey, userSession.userInfo);
        }

        // Gets the persistent authorization status
        function getUserPersistent() {
            try {
                var currentUserEncoded = $window.localStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                return currentUser || null;
            }
            catch (err) {
                return null;
            }
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
            if (accessKey !== undefined) {
                data.accessKey = accessKey;
                $http.defaults.headers.common['X-Access-Token'] = accessKey;
            }
            if (userInfo !== undefined) {
                data.userInfo = userInfo;
            }
            $window.sessionStorage['CurrentUser'] = JSON.stringify(data);
        }

        function processUserInfo(userInfo) {
            if (userInfo) {
                userInfo.subscriptionDate = new Date(userInfo.timeStamp);
                // delete userInfo.timeStamp; // DO NOT ACTIVATE THIS LINE EVER AGAIN!

                if (userInfo.chargeDeadlineTimeStamp) {
                    userInfo.chargeDeadline = new Date(userInfo.chargeDeadlineTimeStamp);
                }
                if (userInfo.freeIntervalTimeStamp) {
                    userInfo.freeInterval = new Date(userInfo.freeIntervalTimeStamp);
                }
            }
            return userInfo;
        }

    }
]);
