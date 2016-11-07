/*global app*/
/*global toPersianNumber*/

app.filter('toPersianNumber', function() {
    return function(input) {
        return toPersianNumber(String(input));
    }
});