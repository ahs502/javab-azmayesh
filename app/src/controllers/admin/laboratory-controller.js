/*global app*/

app.controller('AdminLaboratoryController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setPageTitle('آزمایشگاه ها');

        $scope.defineSubmenus(null);

    }
]);
