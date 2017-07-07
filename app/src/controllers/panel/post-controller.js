/*global app*/
/*global toPersianNumber*/
/*global persianDate*/
/*global sscAlert*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', '$q', 'PostService', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $q, postService, userService) {

        $scope.seePostAsPatient = seePostAsPatient;
        $scope.updatePost = updatePost;
        $scope.deletePost = deletePost;

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.$on('$destroy', function() {
            delete $rootScope.data.panelPostData;
        });

        $scope.setLoading(true);
        ($rootScope.data.panelPostData ? $q.when($rootScope.data.panelPostData) :
            postService.getOnePost(postSummary.nationalCode, postSummary.postCode))
        .then(function(post) {
                post.files = post.files || [];
                post.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + post.nationalCode +
                        '&n=' + post.postCode + '&f=' + file.serverName;
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.post = post;
                $rootScope.data.panelPostData = post;
                $scope.setPageTitle($scope.post.fullName);

                $scope.postDataForDisplay = [{
                    label: 'نام بیمار',
                    value: toPersianNumber(post.fullName)
                }, {
                    label: 'کد ملی بیمار',
                    value: toPersianNumber(post.nationalCode)
                }, {
                    label: 'تلفن های تماس بیمار',
                    value: toPersianNumber(post.numbers.join(' - '))
                }, {
                    label: 'آدرس پست الکترونیکی بیمار',
                    value: post.email
                }, {
                    label: 'شماره آزمایش',
                    value: toPersianNumber(post.postCode)
                }, {
                    label: 'تاریخ ارسال نتایج آزمایش',
                    value: persianDate(post.postDate).format('L')
                }, {
                    label: 'تعداد فایل های پیوست',
                    value: toPersianNumber(post.files.length)
                }];

            }, function(code) {
                sscAlert(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

        function seePostAsPatient() {
            $state.go('answer', {
                p: $scope.post.nationalCode,
                n: $scope.post.postCode,
                previousState: 'panel.post',
                previousStateData: {
                    postCache: $rootScope.data.postCache,
                    historyState: $rootScope.data.historyState,
                    panelPostData: $scope.post,
                    userSession: userService.getUserSession()
                }
            });
        }

        function updatePost() {
            // Use: postService.updateOnePost(nationalCode, postCode, postData)
        }

        function deletePost() {
            $scope.showConfirmMessage('حذف پُست از سامانه',
                'آیا مطمئن هستید که می خواهید این پُست را برای همیشه از سامانه پاک کنید؟',
                'بله، پاک شود', 'خیر، پاک نشود',
                'red', 'basic green').then(function() {
                $scope.setLoading(true);
                postService.deleteOnePost(postSummary.nationalCode, postSummary.postCode)
                    .then(function() {
                        $scope.showMessage('حذف موفقیت آمیز پُست از سامانه',
                            'پُست مورد نظر شما از سامانه پاک شد و اطلاع رسانی لازم به بیمار خواهد شد.').then(function() {
                            delete $rootScope.data.postCache;
                            $state.go('panel.history');
                        });
                    }, function(code) {
                        sscAlert(code);
                    })
                    .then(function() {
                        $scope.setLoading(false);
                    });
            });
        }

    }
]);
