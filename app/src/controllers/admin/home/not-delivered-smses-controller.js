/*global app*/
/*global simpleQueryString*/
/*global Clipboard*/
/*global sscAlert*/

app.controller('AdminHomeNotDeliveredSmsesController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNotSentSmses = getNotSentSmses;
        $scope.openSms = openSms;
        $scope.closeSelectedSms = closeSelectedSms;
        $scope.sendSmsAgain = sendSmsAgain;
        $scope.checkSelectedSms = checkSelectedSms;
        $scope.makeSmsHref = makeSmsHref;
        $scope.copyMessage = copyMessage;
        $scope.copyNumber = copyNumber;

        var clipboards = {};
        
        getNotSentSmses();

        function getNotSentSmses() {
            $scope.setLoading(true);
            adminService.getNotSentSmses()
                .then(function(smsStateStatusList) {
                    $scope.notDeliveredSmses = smsStateStatusList;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openSms(sms, index) {
            if ($scope.selectedSms === null) {
                delete $scope.selectedSms;
                delete $scope.selectedSmsIndex;
            }
            else {
                $scope.selectedSms = sms;
                $scope.selectedSmsIndex = index;
            }
        }

        function closeSelectedSms() {
            $scope.selectedSms = null;
            $scope.selectedSmsIndex = null;
        }

        function sendSmsAgain() {
            $scope.updating = true;
            adminService.tryAgainNotSentSms($scope.selectedSms.data.smsKey)
                .then(function() {
                    $scope.notDeliveredSmses.splice($scope.selectedSmsIndex, 1);
                    delete $scope.selectedSms;
                    delete $scope.selectedSmsIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function checkSelectedSms() {
            $scope.updating = true;
            adminService.checkNotSentSms($scope.selectedSms.data.smsKey)
                .then(function() {
                    $scope.notDeliveredSmses.splice($scope.selectedSmsIndex, 1);
                    delete $scope.selectedSms;
                    delete $scope.selectedSmsIndex;
                }, function(code) {
                    sscAlert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

        function makeSmsHref(number, message) {
            return 'sms:' + number + ';?&' + simpleQueryString.stringify({
                body: message
            });
        }

        function copyMessage() {
            if (!clipboards['message']) {
                clipboards['message'] = new Clipboard('#ja-copy-message');
                clipboards['message'].on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboards['message'].on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

        function copyNumber(number) {
            number = String(number);
            if (!clipboards[number]) {
                clipboards[number] = new Clipboard('#ja-copy-number-' + number);
                clipboards[number].on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboards[number].on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

    }
]);
