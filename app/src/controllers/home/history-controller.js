/*global app*/

app.controller('HomeHistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    function($rootScope, $scope, $state, $stateParams, $timeout) {

        $scope.findHistory = findHistory;

        $scope.nationalCode = $stateParams.nationalCode;

        $scope.findingHistory = false;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        //$scope.otp

        function findHistory() {
            //TODO: check for validity
            $scope.sendingOtp = true;
            $timeout(function() {
                return {
                    paitentName: "علی رضا محمودی",
                    paitentTests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(function(t) {
                        return {
                            laboratoryName: "آمایشگاه رازی مرکزی",
                            testNumber: 6822,
                            testDate: new Date(),
                            answerDate: new Date(),
                            id: t
                        };
                    })
                };
            }, 400).then(function(res) {
                //TODO: validate result
                $rootScope.data.paitentName = res.paitentName;
                $rootScope.data.paitentTests = res.paitentTests;
                $state.go('history', {
                    nationalCode: $scope.nationalCode
                });
            });
        }

    }
]);
