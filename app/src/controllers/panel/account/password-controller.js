/*global app*/
/*global $*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setBackHandler(function () {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

    }
]);
