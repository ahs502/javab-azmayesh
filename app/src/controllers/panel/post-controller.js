/*global app*/
/*global toPersianNumber*/
/*global persianDate*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', 'PostService',
    function($scope, $rootScope, $state, $stateParams, postService) {

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.setLoading(true);
        postService.getOnePost(postSummary.nationalCode, postSummary.postCode)
            .then(function(post) {
                $scope.post = post;
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
                //TODO: Handle errors...
                alert(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

    }
]);
