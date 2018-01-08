/*global app*/

app.controller('HomeHintController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        $scope.showConfirmMessage("انتخاب نوع کاربری از سامانه",
            "آیا شما می خواهید به عنوان آزمایشگاه به سامانه وارد شوید یا به عنوان آزمایش دهنده؟",
            "آزمایش دهنده", "آزمایشگاه",
            'green', 'green').catch(function() {
            $state.go('lab.login');
        });

    }
]);
