/*global app*/
/*global $*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.sendAnswer = sendAnswer;

        $scope.sendingAnswer = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ارسال نتایج');

        //$scope.fullName
        //$scope.nationalCode
        //$scope.mobilePhoneNumber
        //$scope.phoneNumber
        //$scope.extraPhoneNumber

$scope.files=[{
    name:'file1.qwe',
    size:1234,
    type:'application/qwe',
},];

        function sendAnswer() {
            // body...
        }

    }
]);
