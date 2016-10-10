/*global app*/

app.controller('AnswerController', ['$scope', '$state',
    function($scope, $state) {

        $scope.onBackClicked(function() {
            $state.go('home.find');
        });

    }
]);
