/*global app*/

app.controller('AdminPetientController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setPageTitle('بیمارها');

        $scope.defineSubmenus(null);

    }
]);
