/*global app*/
/*global sscAlert*/

app.controller('PanelAcceptanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'UserService', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, userService, answerService) {

        $scope.acceptanceClicked = acceptanceClicked;

        $scope.nationalCode = '';
        $scope.acceptances = [];

        $scope.setLoading(true);
        answerService.getAcceptances()
            .then(function(acceptances) {
                $scope.acceptances = acceptances;
            })
            .catch(function(code) {
                sscAlert(code);
                $scope.redirectToLoginPageIfRequired(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('پذیرش های جاری آزمایشگاه');

        function acceptanceClicked(acceptance) {
            $state.go('panel.send', {
                nationalCode: acceptance.nationalCode,
                previousState: 'panel.acceptance'
            });
        }

    }
]);
