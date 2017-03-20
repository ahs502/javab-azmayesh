/*global app*/

app.controller('HistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.postClicked = postClicked;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.patientInfo = $rootScope.data.patientInfo;
        $scope.history = $rootScope.data.history;
        if (!$scope.patientInfo) {
            return $state.go('home.otp');
        }

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        $scope.setMenuHandlers(false);

        $scope.setHeaderHandlers({
            paitentName: $scope.patientInfo.fullName
        });

        $scope.setFooterHandlers(false);

        $scope.$on('$destroy', function() {
            delete $rootScope.data.patientInfo;
            delete $rootScope.data.history;
        });

        function postClicked(post) {
            $state.go('answer', {
                p: post.nationalCode,
                n: post.postCode,
                previousState: 'history',
                previousStateData: {
                    patientInfo: $scope.patientInfo,
                    history: $scope.history
                }
            });
        }

    }
]);
