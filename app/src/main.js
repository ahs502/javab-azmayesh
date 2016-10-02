/*global angular*/

var app = angular.module('test', ['ui.router']);

app.controller('ctrl', ['$scope', function($scope) {
    $scope.data = 'Data !';
}]);
