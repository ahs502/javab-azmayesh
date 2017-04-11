/*global app*/
/*global ValidationSystem*/
/*global localStorage*/

app.controller('HomeFindController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false; // No need to!

        localStorage.startState = "home.find";

        $scope.setBackHandler(false);

        //$scope.nationalCode
        //$scope.postCode

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('postCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function seeAnswer() {
            if (!$scope.vs.validate()) return;
            
            $state.go('answer', {
                p: $scope.nationalCode,
                n: $scope.postCode,
                previousState: 'home.find',
                previousStateData: null
            });
        }

    }
]);
