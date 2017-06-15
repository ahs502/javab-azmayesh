/*global app*/
/*global angular*/
/*global $*/
/*global simpleQueryString*/
/*global Clipboard*/

app.controller('AdminHomeController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', 'UserService', 'AdminService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, userService, adminService) {

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.fullName) || ' ');

        $scope.submenus = [
            'صفحه اصلی',
            'پیامک های ارسال نشده',
            'درخواست های عضویت جدید',
            'رسیدهای ثبت شده پرداخت کارت به کارت',
            'بازخوردهای صفحه تماس با ما',
            'آمار و نمودارهای وبسایت',
        ];
        $scope.selectedSubmenu = 0;
        $scope.selectedSubmenuText = $scope.submenus[0];
        $('#ja-admin-home-submenu-selector')
            .dropdown({
                onChange: function(value, text) {
                    $timeout(function() {
                        $scope.selectedSubmenu = value;
                        $scope.selectedSubmenuText = text;

                        if ($scope.selectedSubmenu == 1) {
                            getNotSentSmses();
                        }

                        if ($scope.selectedSubmenu == 2) {
                            getNotActivatedLabs();
                        }
                    });
                }
            })
            .dropdown('set selected', 0);

        ////////////////////////////////////////////////////////////////////////

        $scope.getNotSentSmses = getNotSentSmses;
        $scope.openSms = openSms;
        $scope.closeSelectedSms = closeSelectedSms;
        $scope.sendSmsAgain = sendSmsAgain;
        $scope.checkSelectedSms = checkSelectedSms;
        $scope.makeSmsHref = makeSmsHref;
        $scope.copyMessage = copyMessage;
        $scope.copyNumber = copyNumber;

        var clipboards = {};

        function getNotSentSmses() {
            $scope.setLoading(true);
            adminService.getNotSentSmses()
                .then(function(smsStateStatusList) {
                    $scope.notDeliveredSmses = smsStateStatusList;
                }, function(code) {
                    alert(code);
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
                    alert(code);
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
                    alert(code);
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

        ////////////////////////////////////////////////////////////////////////

        $scope.getNotActivatedLabs = getNotActivatedLabs;
        $scope.openLab = openLab;
        $scope.closeSelectedLab = closeSelectedLab;
        $scope.approveLab = approveLab;
        $scope.declineLab = declineLab;

        function getNotActivatedLabs() {
            $scope.setLoading(true);
            adminService.getNotActivatedLabs()
                .then(function(inactiveLabs) {
                    $scope.inactiveLabs = inactiveLabs;
                }, function(code) {
                    alert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openLab(lab, index) {
            if ($scope.selectedLab === null) {
                delete $scope.selectedLab;
                delete $scope.selectedLabIndex;
            }
            else if ($scope.selectedLabIndex !== index) {
                $scope.selectedLab = angular.copy(lab);
                $scope.selectedLabIndex = index;
            }
        }

        function closeSelectedLab() {
            $scope.selectedLab = null;
            $scope.selectedLabIndex = null;
        }

        function approveLab() {
            $scope.showConfirmMessage('تأیید کاربر جدید',
                    "آیا از تأیید کاربر جدید مطمئن هستید؟",
                    'بله، تأیید شود', 'خیر',
                    'green', 'basic gray')
                .then(function() {
                    $scope.updating = true;
                    adminService.approveInactiveLab($scope.selectedLab)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            alert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

        function declineLab() {
            $scope.showConfirmMessage('تأییدیه برای حذف کاربر جدید',
                    "آیا از تصمیم خود مبنی بر حذف کامل کاربر جدید مطمئن هستید؟\n در صورت حذف، امکان بازگشت وجود ندارد.",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'red', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.declineInactiveLab($scope.selectedLab.username)
                        .then(function() {
                            $scope.inactiveLabs.splice($scope.selectedLabIndex, 1);
                            delete $scope.selectedLab;
                            delete $scope.selectedLabIndex;
                        }, function(code) {
                            alert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

    }
]);
