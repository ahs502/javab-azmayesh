/*global app*/

app.filter('emptyCheck', function() {
    return function(input, defaultValue) {
        if (input === undefined || input === null || input === '')
            return defaultValue || '\u2013';
        else
            return String(input);
    };
});