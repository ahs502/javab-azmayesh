(function(global) {

    global.toPersianNumber = toPersianNumber;
    global.toLatinNumber = toLatinNumber;

    var persianDigitConvertions = {
        0: '۰', // \u06F0 Farsi
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹'
    };

    var latinDigitConvertions = {
        '۰': '0', // \u06F0 Farsi
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '٠': '0', // \u0660 Arabic (iPhone)
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9'
    };

    function toPersianNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            return persianDigitConvertions[char] || char;
        }).join('');
    }

    function toLatinNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            return latinDigitConvertions[char] || char;
        }).join('');
    }

})(global);
