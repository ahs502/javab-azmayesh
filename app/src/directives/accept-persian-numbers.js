/*global app*/
/*global toPersianNumber*/
/*global toLatinNumber*/

app.directive('acceptPersianNumbers', function() {
    return {
        restrict: 'A',
        require: 'ngModel',

        replace: false,
        transclude: false,
        scope: false,

        link: function(scope, instanceElement, instanceAttributes, ngModel) {

            ngModel.$formatters.push(function(value) {
                return toPersianNumber(value);
            });

            ngModel.$parsers.push(function(value) {
                var viewValue = toPersianNumber(value);
                if (viewValue !== ngModel.$viewValue) {
                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                }
                return toLatinNumber(value);
            });

        }
    };
});
