// AHS502 : Application javascript file :

/*
	AHS502 : Start of 'main.js'
*/

/*global angular*/

var app = angular.module('test', ['ui.router']);

app.controller('ctrl', ['$scope', function($scope) {
    $scope.data = 'Data !';
}]);


/*
	AHS502 : End of 'main.js'
*/
