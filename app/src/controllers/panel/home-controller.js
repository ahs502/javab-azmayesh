/*global app*/
/*global $*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        $scope.setPageTitle('نام آزمایشگاه');

        $('#test-modal').modal('show');

    }
]);
