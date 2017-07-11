/*global app*/

app.controller('CommonAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

        $scope.people = [{
            name: 'نگار امین شکروی',
            description: 'کارشناس ارشد کارآفرینی گرایش بین الملل از دانشگاه تهران',
            title: 'توسعه کسب و کار',
            img: '/img/about/negar.png',
            color: 'teal'
        }, {
            name: 'مهرنوش فتحی',
            description: 'کارشناس روان شناسی از دانشگاه پیام نور',
            title: 'پشتیبانی و مدیریت داخلی',
            img: '/img/about/mehrnoosh.png',
            color: 'green'
        }, {
            name: 'حسام الدین امین شکروی',
            description: 'کارشناس ارشد مهندسی نرم افزار از دانشگاه صنعتی شریف',
            title: 'طراح و برنامه نویس',
            img: '/img/about/hessam.png',
            color: 'blue'
        }];

    }
]);
