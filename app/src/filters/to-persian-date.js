/*global app*/
/*global persianDate*/

app.filter('toPersianDate', function() {
    return function(input, format) {
        return persianDate(new Date(input)).format(format || 'L');
    }
});