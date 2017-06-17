/*global app*/

app.controller('AdminHomeNewFeedbacksController', ['$scope', '$rootScope', '$state', '$stateParams', 'AdminService',
    function($scope, $rootScope, $state, $stateParams, adminService) {

        $scope.getNewFeedbacks = getNewFeedbacks;
        $scope.openFb = openFb;
        $scope.closeSelectedFb = closeSelectedFb;
        $scope.checkFb = checkFb;
        $scope.respondFb = respondFb;

        getNewFeedbacks();

        function getNewFeedbacks() {
            $scope.setLoading(true);
            adminService.getNewFeedbacks()
                .then(function(feedbacks) {
                    $scope.feedbacks = feedbacks;
                }, function(code) {
                    alert(code);
                }).then(function() {
                    $scope.setLoading(false);
                });
        }

        function openFb(fb, index) {
            if ($scope.selectedFb === null) {
                delete $scope.selectedFb;
                delete $scope.selectedFbIndex;
            }
            else if ($scope.selectedFbIndex !== index) {
                $scope.selectedFb = fb;
                $scope.selectedFbIndex = index;
                $scope.respondMessage = "سلام!\nبازخورد شما بررسی شد.\nبا سپاس فراوان از این که ما را با بازخوردهای خود یاری می کنید.";
            }
        }

        function closeSelectedFb() {
            $scope.selectedFb = null;
            $scope.selectedFbIndex = null;
        }

        function checkFb() {
            $scope.showConfirmMessage('حذف بازخورد ثیت شده کاربر',
                    "پس از تأیید، بازخورد مورد نظر از سامانه حذف می شود.\nآیا این بازخورد را مطالعه و بررسی کرده و پاسخ مناسب را به کاربر داده اید؟",
                    'بله، حذف شود', 'نه، حذف نشود',
                    'orange', 'basic green')
                .then(function() {
                    $scope.updating = true;
                    adminService.checkFeedback($scope.selectedFb.id)
                        .then(function() {
                            $scope.feedbacks.splice($scope.selectedFbIndex, 1);
                            delete $scope.selectedFb;
                            delete $scope.selectedFbIndex;
                        }, function(code) {
                            alert(code);
                        }).then(function() {
                            $scope.updating = false;
                        });
                });
        }

        function respondFb() {
            $scope.updating = true;
            adminService.respondFeedback($scope.selectedFb.id, $scope.respondMessage)
                .then(function() {
                    $scope.feedbacks.splice($scope.selectedFbIndex, 1);
                    delete $scope.selectedFb;
                    delete $scope.selectedFbIndex;
                }, function(code) {
                    alert(code);
                }).then(function() {
                    $scope.updating = false;
                });
        }

    }
]);
