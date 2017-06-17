/*global app*/

app.filter('currencySeparator', function() {
    return function(input, seperator) {
        input = String(input || '');
        seperator = seperator || ',';
        var output = '';
        while (input.length) {
            output = input.slice(-3) + output;
            input = input.slice(0, -3);
            if (input.length) output = seperator + output;
        }
        return output;
    }
});
