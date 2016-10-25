/*global app*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.login = login;

        $scope.loggingIn = false;

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        function login() {
            // //TODO: check for validity
            // $scope.findingAnswer = true;
            // $timeout(function() { //TODO: resolve answer
            //     return {
            //         testNumber: 1234,
            //         nationalCode: '1234567890',
            //         paitentName: 'حسام شکروی',
            //         testDate: new Date(),
            //         answerDate: new Date(),
            //         laboratoryName: "آزمایشگاه دکتر شاهپوری"
            //     };
            // }, 400).then(function(answer) {
            //     //TODO: validate result
            //     $rootScope.data.answer = answer;
            //     $state.go('answer', {
            //         nationalCode: $scope.nationalCode,
            //         testNumber: $scope.testNumber,
            //         previousState: 'home.find'
            //     });
            // });
        }

    }
]);
