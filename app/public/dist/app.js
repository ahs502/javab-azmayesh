// AHS502 : Application javascript file :

/*
	AHS502 : Start of 'global.js'
*/

var global;

try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}

global.global = global;


/*
	AHS502 : End of 'global.js'
*/


/*
	AHS502 : Start of 'ValidationSystem.js'
*/

/*global toPersianNumber*/

(function(global) {

    global.ValidationSystem = ValidationSystem;

    ////////////////////////////////////////////////////////////////////////////

    function ValidationSystem(scope) {

        var fields = {};

        this.field = field; // Define a new field => this (so you could chain them)
        this.error = error; // Get/Set error message for a field => field's error message
        this.clear = clear; // Clear some or all error messages => nothing!
        this.see = see; // Checks some or all fields validity status without updating (setting/removing) any error messages => summary of those fields validity
        this.check = check; // Checks some or all fields validity status and tries to remove their error messages if possible => summary of those fields validity
        this.validate = validate; // Checks some or all fields validity status and updates their error messages => summary of those fields validity
        this.status = status; // Summarize some of all fields validity status without checking or updating their error messages => summary of those fields validity
        this.dictate = dictate; // Forces all fields error messages according to the errors object provided => nothing!

        function field(fieldName, validators) {
            fields[fieldName] = {
                validators: [].concat(validators),
                error: null
            };
            return this;
        }

        function error(fieldName, errorMessage) {
            if (arguments.length === 1)
                return (fields[fieldName] || {}).error || null;
            else if (arguments.length === 2)
                return (fields[fieldName] || {}).error = errorMessage || null;
        }

        function clear() {
            fieldNames(arguments).forEach(function(fieldName) {
                fields[fieldName].error = null;
            });
        }

        function see() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (run(fieldName, fieldData.validators)) valid = false;
            });
            return valid;
        }

        function check() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = fieldData.error && run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function validate() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                fieldData.error = run(fieldName, fieldData.validators);
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function status() {
            var valid = true;
            fieldNames(arguments).forEach(function(fieldName) {
                var fieldData = fields[fieldName];
                if (fieldData.error) valid = false;
            });
            return valid;
        }

        function dictate(errors) {
            Object.keys(fields).forEach(function(fieldName) {
                fields[fieldName].error = errors[fieldName] || null;
            });
        }

        function fieldNames(fieldNamesArguments) {
            var allFieldNames = Object.keys(fields);
            if (fieldNamesArguments.length) {
                return Array.from(fieldNamesArguments)
                    .filter(function(fieldName) {
                        return allFieldNames.indexOf(fieldName) >= 0;
                    });
            }
            return allFieldNames;
        }

        function run(fieldName, validators) {
            if (!validators) return null;
            var value = scope[fieldName];
            for (var i = 0; i < validators.length; i++) {
                var res = validators[i](value);
                if (res === true) break;
                if (res) return res;
            }
            return null;
        }

    }

    ////////////////////////////////////////////////////////////////////////////

    ValidationSystem.validators = {
        notEmpty: notEmptyValidator,
        notRequired: notRequiredValidator,
        nationalCode: nationalCodeValidator,
        numberCode: numberCodeValidator,
        phoneNumber: phoneNumberValidator,
        mobilePhoneNumber: mobilePhoneNumberValidator,
        minLength: minLengthValidator,
        length: lengthValidator,
        username: usernameValidator,
        integer: integerValidator,
        url: urlValidator,
        email: emailValidator,
    };

    ////////////////////////////////////////////////////////////////////////////

    function notEmptyValidator(message) {
        message = message || 'پُر کردن این فیلد الزامی است';
        return function(value) {
            return value ? null : message;
        };
    }

    function notRequiredValidator() {
        return function(value) {
            return !value;
        };
    }

    function nationalCodeValidator(message) {
        message = message || 'کد ملی صحیح نمی باشد';
        return function(value) {
            return /^[0-9]{10}$/.test(value) ? null : message;
        };
    }

    function numberCodeValidator(length, message) {
        message = message || 'کد وارد شده صحیح نمی باشد';
        return function(value) {
            return String(value).length === length && /^[0-9]+$/.test(value) ? null : message;
        };
    }

    function phoneNumberValidator(message) {
        message = message || 'شماره تلفن وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+98)?[0-9]{5,15}$/.test(value) ? null : message;
        };
    }

    function mobilePhoneNumberValidator(message) {
        message = message || 'شماره موبایل وارد شده صحیح نمی باشد';
        return function(value) {
            return /^(\+989|09)[0-9]{9}$/.test(value) ? null : message;
        };
    }

    function minLengthValidator(length, message) {
        message = message || 'این فیلد باید حداقل ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length >= length ? null : message;
        };
    }

    function lengthValidator(length, message) {
        message = message || 'این فیلد باید دقیقاً ' + toPersianNumber(length) + ' حرف داشته باشد';
        return function(value) {
            return String(value).length === length ? null : message;
        };
    }

    function usernameValidator(message) {
        message = message || 'نام کاربری فقط باید شامل حروف لاتین، ارقام، نقطه و خط زیر _ باشد';
        return function(value) {
            return /^[a-zA-Z_][a-zA-Z_0-9]+$/.test(value) ? null : message;
        };
    }

    function integerValidator(message) {
        message = message || 'در این فیلد فقط استفاده از ارقام مجاز است';
        return function(value) {
            return /^[0-9]*$/.test(value) ? null : message;
        };
    }

    function urlValidator(message) {
        message = message || 'آدرس وب سایت صحیح نمی باشد';
        return function(value) {
            return /^((http|https):\/\/)?[a-zA-Z0-9-_\.]+\.[a-zA-Z0-9]+$/.test(value) ? null : message;
        };
    }

    function emailValidator(message) {
        message = message || 'پست الکترونیکی صحیح نمی باشد';
        return function(value) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ? null : message;
        };
    }

})(global);

/*
	AHS502 : End of 'ValidationSystem.js'
*/


/*
	AHS502 : Start of 'calendar-converter.js'
*/

(function() {
    ////////////////////////////////////////////////////////////////////////////

    global.gregorianToJalali = gregorianToJalali; // ([2017, 3, 27]) => [1396, 1, 7]
    global.jalaliToGregorian = jalaliToGregorian; // ([1396, 1, 7]) => [2017, 3, 27]
    
    //// Not needed yet:
    // global.gregorianToIslamic = gregorianToIslamic; // ([2017, 3, 27]) => [1438, 6, 28]
    // global.islamicToGregorian = islamicToGregorian; // ([1438, 6, 28]) => [2017, 3, 27]
    
    //// Not needed yet:
    // global.jalaliToIslamic = jalaliToIslamic; // ([1396, 1, 7]) => [1438, 6, 28]
    // global.islamicToJalali = islamicToJalali; // ([1438, 6, 28]) => [1396, 1, 7]

    ////////////////////////////////////////////////////////////////////////////

    // Source: http://jdf.scr.ir/jdf
    function gregorianToJalali(gYMD) {
        var gy = gYMD[0],
            gm = gYMD[1],
            gd = gYMD[2];
        var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var jy = (gy <= 1600) ? 0 : 979;
        gy -= (gy <= 1600) ? 621 : 1600;
        var gy2 = (gm > 2) ? (gy + 1) : gy;
        var days = (365 * gy) + parseInt((gy2 + 3) / 4, 10) - parseInt((gy2 + 99) / 100, 10) + parseInt((gy2 + 399) / 400, 10) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * parseInt(days / 12053, 10);
        days %= 12053;
        jy += 4 * parseInt(days / 1461, 10);
        days %= 1461;
        jy += parseInt((days - 1) / 365, 10);
        if (days > 365) days = (days - 1) % 365;
        var jm = (days < 186) ? 1 + parseInt(days / 31, 10) : 7 + parseInt((days - 186) / 30, 10);
        var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return [jy, jm, jd];
    }

    // Source: http://jdf.scr.ir/jdf
    function jalaliToGregorian(jYMD) {
        var jy = jYMD[0],
            jm = jYMD[1],
            jd = jYMD[2];
        var gy = (jy <= 979) ? 621 : 1600;
        jy -= (jy <= 979) ? 0 : 979;
        var days = (365 * jy) + (parseInt(jy / 33, 10) * 8) + parseInt(((jy % 33) + 3) / 4, 10) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * parseInt(days / 146097, 10);
        days %= 146097;
        if (days > 36524) {
            gy += 100 * parseInt(--days / 36524, 10);
            days %= 36524;
            if (days >= 365) days++;
        }
        gy += 4 * parseInt((days) / 1461, 10);
        days %= 1461;
        gy += parseInt((days - 1) / 365, 10);
        if (days > 365) days = (days - 1) % 365;
        var gd = days + 1;
        var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var gm = 0; gm < 13; gm++) {
            var v = sal_a[gm];
            if (gd <= v) break;
            gd -= v;
        }
        return [gy, gm, gd];
    }

    // // Source: http://123.scr.ir
    // function gregorianToIslamic(gYMD) {
    //     var gy = gYMD[0],
    //         gm = gYMD[1],
    //         gd = gYMD[2];
    //     if (gy > 1582 || (gy == 1581 && gm > 9 && gd > 14)) {
    //         var a = parseInt((gm - 14) / 12, 10);
    //         var jd = parseInt((1461 * (gy + 4800 + a)) / 4, 10) + parseInt((367 * (gm - 2 - (12 * a))) / 12, 10) - parseInt((3 * (parseInt((gy + 4900 + a) / 100, 10))) / 4, 10) + gd - 32075;
    //     }
    //     else {
    //         jd = (367 * gy) - parseInt((7 * (gy + 5001 + parseInt((gm - 9) / 7, 10))) / 4, 10) + parseInt((275 * gm) / 9, 10) + gd + 1729777;
    //     }
    //     var l = jd - 1948440 + 10632;
    //     var n = parseInt((l - 1) / 10631, 10);
    //     l = l - 10631 * n + 354;
    //     var j = ((parseInt((10985 - l) / 5316, 10)) * (parseInt((50 * l) / 17719, 10))) + ((parseInt(l / 5670, 10)) * (parseInt((43 * l) / 15238, 10)));
    //     l = l - (parseInt((30 - j) / 15, 10)) * (parseInt((17719 * j) / 50, 10)) - (parseInt(j / 16, 10)) * (parseInt((15238 * j) / 43, 10)) + 29;
    //     gm = parseInt((24 * l) / 709, 10);
    //     gd = l - parseInt((709 * gm) / 24, 10);
    //     gy = (30 * n) + j - 30;
    //     return [gy, gm, gd];
    // }

    // // Source: http://123.scr.ir
    // function islamicToGregorian(iYMD) {
    //     var iy = iYMD[0],
    //         im = iYMD[1],
    //         id = iYMD[2];
    //     var jd = parseInt(((11 * iy) + 3) / 30, 10) + (354 * iy) + (30 * im) - parseInt((im - 1) / 2, 10) + id + 1948440 - 385;
    //     if (jd > 2299160) {
    //         var l = jd + 68569;
    //         var n = parseInt((4 * l) / 146097, 10);
    //         l = l - parseInt((146097 * n + 3) / 4, 10);
    //         var i = parseInt((4000 * (l + 1)) / 1461001, 10);
    //         l = l - parseInt((1461 * i) / 4, 10) + 31;
    //         var j = parseInt((80 * l) / 2447, 10);
    //         id = l - parseInt((2447 * j) / 80, 10);
    //         l = parseInt(j / 11, 10);
    //         im = j + 2 - (12 * l);
    //         iy = (100 * (n - 49)) + i + l;
    //     }
    //     else {
    //         j = jd + 1402;
    //         var k = parseInt((j - 1) / 1461, 10);
    //         l = j - (1461 * k);
    //         n = parseInt((l - 1) / 365, 10) - parseInt(l / 1461, 10);
    //         i = l - (365 * n, 10) + 30;
    //         j = parseInt((80 * i) / 2447, 10);
    //         id = i - parseInt((2447 * j) / 80, 10);
    //         i = parseInt(j / 11, 10);
    //         im = j + 2 - (12 * i);
    //         iy = (4 * k) + n + i - 4716;
    //     }
    //     return [iy, im, id];
    // }

    // function jalaliToIslamic(jYMD) {
    //     return gregorianToIslamic(jalaliToGregorian(jYMD));
    // }

    // function islamicToJalali(iYMD) {
    //     return gregorianToJalali(islamicToGregorian(iYMD));
    // }

    ////////////////////////////////////////////////////////////////////////////
})();

/*
	AHS502 : End of 'calendar-converter.js'
*/


/*
	AHS502 : Start of 'extensions.js'
*/

/*global gregorianToJalali*/

(function() {
    ////////////////////////////////////////////////////////////////////////////

    Date.prototype.gYMD = gYMD; // () => [2017, 3, 27]
    Date.prototype.jYMD = jYMD; // () => [1396, 1, 7]
    // Date.prototype.iYMD = iYMD; // () => [1438, 6, 28]
    Date.prototype.isValid = isValid; // (new Date()).isValid() === true
    Date.prototype.toLocalString = toLocalString; // () => "2017-03-27T18:02:34.591O+0330"    // (true) => "2017-03-27T18:02:34.591" (non-convertible to Date again)

    Date.parse = parseMaker(); // (All dates even LocalStringified) => 1490540446225

    String.prototype.toDate = toDate; // (All stringified dates even LocalStringified) => Date
    String.prototype.toPhoneNumber = toPhoneNumber; // ('  +981x23g 45 pp # ') => 012345
    String.prototype.isMobileNumber = isMobileNumber; // ('+989125557685') => true

    Array.range = range; // (2, 11, 3) => [2, 5, 8, 11]    // (7, 4) => [7, 6, 5, 4]
    Array.from = from; // ({0: true, 1: 12345, length: 2}) => [true, 12345]

    ////////////////////////////////////////////////////////////////////////////

    function gYMD() {
        var y = this.getFullYear(),
            m = this.getMonth() + 1,
            d = this.getDate();
        return [y, m, d];
    }

    function jYMD() {
        return gregorianToJalali(this.gYMD());
    }

    // function iYMD() {
    //     return gregorianToIslamic(this.gYMD());
    // }

    function isValid() {
        // NaN !== NaN, so:
        return this.getTime() === this.getTime();
    }

    function toLocalString(noGMT) {
        var d = new Date(this);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        var s = d.toISOString().slice(0, -1);
        if (!noGMT) {
            var ds = this.toString();
            var gmt = ds.indexOf('GMT') + 3;
            s += 'O' + ds.slice(gmt, gmt + 5);
        }
        return s;
    }

    function parseMaker() {
        var Date_parse = Date.parse;
        return function(str) {
            str = (str || '').toString();
            if (typeof str === 'string' && str.slice(-6, -5) === 'O') {
                var gmt = str.slice(-5);
                var offset = Number(gmt.slice(1, 3)) * 60 + Number(gmt.slice(3, 5));
                if (gmt.slice(0, 1) === '-') offset = -offset;
                return Date_parse(str.slice(0, -6) + 'Z') - offset * 60 * 1000;
            }
            return Date_parse(str);
        };
    }

    function toDate() {
        return new Date(Date.parse(this));
    }

    function toPhoneNumber() {
        var s = this.replace(/\s/g, "");
        if (s.slice(0, 3) === '+98') s = '0' + s.slice(3);
        return s.split('').filter(function(char) {
            return '0123456789'.indexOf(char) >= 0;
        }).join('');
    }

    function isMobileNumber() {
        var n = this.toPhoneNumber();
        return n.length === 11 && n.slice(0, 2) === '09';
    }

    function range(from, to, step) {
        step = step || 1;
        if (typeof from !== 'number' || typeof to !== 'number' || typeof step !== 'number') {
            throw new Error('Provided from & to & step are not all numbers.');
        }
        if (step < 0) step = -step;
        var array = [];
        if (from <= to)
            while (from <= to) array.push(from++);
        else
            while (from >= to) array.push(from--);
        return array;
    }

    function from(arrayLike) {
        if (!arrayLike) return [];
        return Array.prototype.slice.call(arrayLike);
    }

    ////////////////////////////////////////////////////////////////////////////
})();

/*
	AHS502 : End of 'extensions.js'
*/


/*
	AHS502 : Start of 'icon-js.js'
*/

(function(global) {

    iconJs.file = file;
    global.iconJs = iconJs;

    //See this link for more SVG icons: http://www.flaticon.com/
    var dataUrls = {

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'delete': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzQ4LjMzMyAzNDguMzM0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNDguMzMzIDM0OC4zMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzM2LjU1OSw2OC42MTFMMjMxLjAxNiwxNzQuMTY1bDEwNS41NDMsMTA1LjU0OWMxNS42OTksMTUuNzA1LDE1LjY5OSw0MS4xNDUsMCw1Ni44NSAgIGMtNy44NDQsNy44NDQtMTguMTI4LDExLjc2OS0yOC40MDcsMTEuNzY5Yy0xMC4yOTYsMC0yMC41ODEtMy45MTktMjguNDE5LTExLjc2OUwxNzQuMTY3LDIzMS4wMDNMNjguNjA5LDMzNi41NjMgICBjLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1ICAgbDEwNS41NC0xMDUuNTQ5TDExLjc3NCw2OC42MTFjLTE1LjY5OS0xNS42OTktMTUuNjk5LTQxLjE0NSwwLTU2Ljg0NGMxNS42OTYtMTUuNjg3LDQxLjEyNy0xNS42ODcsNTYuODI5LDBsMTA1LjU2MywxMDUuNTU0ICAgTDI3OS43MjEsMTEuNzY3YzE1LjcwNS0xNS42ODcsNDEuMTM5LTE1LjY4Nyw1Ni44MzIsMEMzNTIuMjU4LDI3LjQ2NiwzNTIuMjU4LDUyLjkxMiwzMzYuNTU5LDY4LjYxMXoiIGZpbGw9IiNEODAwMjciLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'down triangle': 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzODYuMjU3IDM4Ni4yNTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4Ni4yNTcgMzg2LjI1NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cG9seWdvbiBwb2ludHM9IjAsOTYuODc5IDE5My4xMjksMjg5LjM3OSAzODYuMjU3LDk2Ljg3OSAiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==',

        'free file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIxOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIyOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIzOC41IiBjeT0iNDciIHI9IjMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'doc file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMTguNSwxM2gtNmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg2YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMTkuMDUyLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTIxLjUsMThoLTljLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoOWMwLjU1MiwwLDEsMC40NDgsMSwxUzIyLjA1MiwxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41Mi0wLjExLTAuNzEtMC4yOWMtMC4xOC0wLjE5LTAuMjktMC40NS0wLjI5LTAuNzFjMC0wLjI2LDAuMTEtMC41MiwwLjI5LTAuNzEgICBjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDBjMC4xOCwwLjE5LDAuMjksMC40NSwwLjI5LDAuNzFjMCwwLjI2LTAuMTEsMC41Mi0wLjI5LDAuNzFDMjYuMDIsMTcuODksMjUuNzYsMTgsMjUuNSwxOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzcuNSwxOGgtOGMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg4YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzguMDUyLDE4LDM3LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTEyLjUsMzNjLTAuMjYsMC0wLjUyLTAuMTEtMC43MS0wLjI5Yy0wLjE4LTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MWMwLTAuMjYsMC4xMS0wLjUyLDAuMjktMC43MSAgIGMwLjM3LTAuMzcsMS4wNS0wLjM3LDEuNDIsMGMwLjE4LDAuMTksMC4yOSwwLjQ0LDAuMjksMC43MWMwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDhjMC41NTIsMCwxLDAuNDQ4LDEsMVMyNS4wNTIsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWgyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDIyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzUuMDUyLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoNmMwLjU1MiwwLDEsMC40NDgsMSwxUzQ0LjA1MiwyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDRjMC41NTIsMCwxLDAuNDQ4LDEsMVMxNy4wNTIsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoMTBjMC41NTIsMCwxLDAuNDQ4LDEsMVMzMS4wNTIsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg5YzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDI4LDQzLjUsMjh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDA5NkU2OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIzLjUsNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzE5LjUwMyw1Mi45ODQsMTkuMzA3LDUzLDE5LjE4LDUzaC0zLjgxNFY0Mi45MjRIMTguNCAgICBjMC44NDgsMCwxLjU5MywwLjEzNSwyLjIzNSwwLjQwM3MxLjE3NiwwLjYyNywxLjYsMS4wNzNzMC43NCwwLjk1NSwwLjk1LDEuNTI0QzIzLjM5NSw0Ni40OTQsMjMuNSw0Ny4wOCwyMy41LDQ3LjY4MnogICAgIE0xOC42MzMsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgxOC42MzN6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMy40NzUsNDcuOTE0YzAsMC44NDgtMC4xMDcsMS41OTUtMC4zMjEsMi4yNDJjLTAuMjE0LDAuNjQ3LTAuNTExLDEuMTg1LTAuODg5LDEuNjEzICAgIGMtMC4zNzgsMC40MjktMC44MiwwLjc1Mi0xLjMyNiwwLjk3MXMtMS4wNiwwLjMyOC0xLjY2MSwwLjMyOHMtMS4xNTUtMC4xMDktMS42NjEtMC4zMjhzLTAuOTQ4LTAuNTQyLTEuMzI2LTAuOTcxICAgIGMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTNjLTAuMjE0LTAuNjQ3LTAuMzIxLTEuMzk1LTAuMzIxLTIuMjQyczAuMTA3LTEuNTkzLDAuMzIxLTIuMjM1ICAgIGMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2YzAuMzc4LTAuNDI5LDAuODItMC43NTQsMS4zMjYtMC45NzhzMS4wNi0wLjMzNSwxLjY2MS0wLjMzNXMxLjE1NSwwLjExMSwxLjY2MSwwLjMzNSAgICBzMC45NDgsMC41NDksMS4zMjYsMC45NzhjMC4zNzgsMC40MjksMC42NzQsMC45NjQsMC44ODksMS42MDZDMzMuMzY3LDQ2LjMyMSwzMy40NzUsNDcuMDY2LDMzLjQ3NSw0Ny45MTR6IE0yOS4yMzYsNTEuNzI5ICAgIGMwLjMzNywwLDAuNjU4LTAuMDY2LDAuOTY0LTAuMTk4YzAuMzA1LTAuMTMyLDAuNTc5LTAuMzQ5LDAuODItMC42NDljMC4yNDEtMC4zMDEsMC40MzEtMC42OTUsMC41NjctMS4xODMgICAgczAuMjA5LTEuMDgyLDAuMjE5LTEuNzg0Yy0wLjAwOS0wLjY4NC0wLjA4LTEuMjY1LTAuMjEyLTEuNzQzYy0wLjEzMi0wLjQ3OS0wLjMxNC0wLjg3My0wLjU0Ny0xLjE4M3MtMC40OTctMC41MzMtMC43OTMtMC42NyAgICBjLTAuMjk2LTAuMTM3LTAuNjA4LTAuMjA1LTAuOTM3LTAuMjA1Yy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5ICAgIGMtMC4yNDIsMC4zMDYtMC40MzEsMC42OTktMC41NjcsMS4xODNzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1ICAgIGMwLjEzMiwwLjQ4MywwLjMxNCwwLjg3NywwLjU0NywxLjE4M3MwLjQ5NywwLjUyOCwwLjc5MywwLjY3QzI4LjU5Niw1MS42NTgsMjguOTA4LDUxLjcyOSwyOS4yMzYsNTEuNzI5eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDIuNjA3LDUxLjk3NWMtMC4zNzQsMC4zNjQtMC43OTgsMC42MzgtMS4yNzEsMC44MmMtMC40NzQsMC4xODMtMC45ODQsMC4yNzMtMS41MzEsMC4yNzMgICAgYy0wLjYwMiwwLTEuMTU1LTAuMTA5LTEuNjYxLTAuMzI4cy0wLjk0OC0wLjU0Mi0xLjMyNi0wLjk3MWMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTMgICAgYy0wLjIxNC0wLjY0Ny0wLjMyMS0xLjM5NS0wLjMyMS0yLjI0MnMwLjEwNy0xLjU5MywwLjMyMS0yLjIzNWMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2ICAgIGMwLjM3OC0wLjQyOSwwLjgyMi0wLjc1NCwxLjMzMy0wLjk3OGMwLjUxLTAuMjI0LDEuMDYyLTAuMzM1LDEuNjU0LTAuMzM1YzAuNTQ3LDAsMS4wNTcsMC4wOTEsMS41MzEsMC4yNzMgICAgYzAuNDc0LDAuMTgzLDAuODk3LDAuNDU2LDEuMjcxLDAuODJsLTEuMTM1LDEuMDEyYy0wLjIyOC0wLjI2NS0wLjQ4MS0wLjQ1Ni0wLjc1OS0wLjU3NGMtMC4yNzgtMC4xMTgtMC41NjctMC4xNzgtMC44NjgtMC4xNzggICAgYy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5Yy0wLjI0MiwwLjMwNi0wLjQzMSwwLjY5OS0wLjU2NywxLjE4MyAgICBzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1YzAuMTMyLDAuNDgzLDAuMzE0LDAuODc3LDAuNTQ3LDEuMTgzczAuNDk3LDAuNTI4LDAuNzkzLDAuNjcgICAgYzAuMjk2LDAuMTQyLDAuNjA4LDAuMjEyLDAuOTM3LDAuMjEyczAuNjM2LTAuMDYsMC45MjMtMC4xNzhzMC41NDktMC4zMSwwLjc4Ni0wLjU3NEw0Mi42MDcsNTEuOTc1eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'xls file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM5MUNEQTA7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjAuMzc5LDQ4LjEwNUwyMi45MzYsNTNoLTEuOWwtMS42LTMuODAxaC0wLjEzN0wxNy41NzYsNTNoLTEuOWwyLjU1Ny00Ljg5NWwtMi43MjEtNS4xODJoMS44NzMgICAgbDEuNzc3LDQuMTAyaDAuMTM3bDEuOTI4LTQuMTAySDIzLjFMMjAuMzc5LDQ4LjEwNXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI3LjAzNyw0Mi45MjR2OC44MzJoNC42MzVWNTNoLTYuMzAzVjQyLjkyNEgyNy4wMzd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOS4wNDEsNTAuMjM4YzAsMC4zNjQtMC4wNzUsMC43MTgtMC4yMjYsMS4wNlMzOC40NTMsNTEuOTQsMzguMTgsNTIuMnMtMC42MTEsMC40NjctMS4wMTIsMC42MjIgICAgYy0wLjQwMSwwLjE1NS0wLjg1NywwLjIzMi0xLjM2NywwLjIzMmMtMC4yMTksMC0wLjQ0NC0wLjAxMi0wLjY3Ny0wLjAzNHMtMC40NjctMC4wNjItMC43MDQtMC4xMTYgICAgYy0wLjIzNy0wLjA1NS0wLjQ2My0wLjEzLTAuNjc3LTAuMjI2Yy0wLjIxNC0wLjA5Ni0wLjM5OS0wLjIxMi0wLjU1NC0wLjM0OWwwLjI4Ny0xLjE3NmMwLjEyNywwLjA3MywwLjI4OSwwLjE0NCwwLjQ4NSwwLjIxMiAgICBjMC4xOTYsMC4wNjgsMC4zOTgsMC4xMzIsMC42MDgsMC4xOTFjMC4yMDksMC4wNiwwLjQxOSwwLjEwNywwLjYyOSwwLjE0NGMwLjIwOSwwLjAzNiwwLjQwNSwwLjA1NSwwLjU4OCwwLjA1NSAgICBjMC41NTYsMCwwLjk4Mi0wLjEzLDEuMjc4LTAuMzljMC4yOTYtMC4yNiwwLjQ0NC0wLjY0NSwwLjQ0NC0xLjE1NWMwLTAuMzEtMC4xMDUtMC41NzQtMC4zMTQtMC43OTMgICAgYy0wLjIxLTAuMjE5LTAuNDcyLTAuNDE3LTAuNzg2LTAuNTk1cy0wLjY1NC0wLjM1NS0xLjAxOS0wLjUzM2MtMC4zNjUtMC4xNzgtMC43MDctMC4zODgtMS4wMjUtMC42MjkgICAgYy0wLjMxOS0wLjI0MS0wLjU4My0wLjUyNi0wLjc5My0wLjg1NGMtMC4yMS0wLjMyOC0wLjMxNC0wLjczOC0wLjMxNC0xLjIzYzAtMC40NDYsMC4wODItMC44NDMsMC4yNDYtMS4xODkgICAgczAuMzg1LTAuNjQxLDAuNjYzLTAuODgyYzAuMjc4LTAuMjQxLDAuNjAyLTAuNDI2LDAuOTcxLTAuNTU0czAuNzU5LTAuMTkxLDEuMTY5LTAuMTkxYzAuNDE5LDAsMC44NDMsMC4wMzksMS4yNzEsMC4xMTYgICAgYzAuNDI4LDAuMDc3LDAuNzc0LDAuMjAzLDEuMDM5LDAuMzc2Yy0wLjA1NSwwLjExOC0wLjExOSwwLjI0OC0wLjE5MSwwLjM5Yy0wLjA3MywwLjE0Mi0wLjE0MiwwLjI3My0wLjIwNSwwLjM5NiAgICBjLTAuMDY0LDAuMTIzLTAuMTE5LDAuMjI2LTAuMTY0LDAuMzA4Yy0wLjA0NiwwLjA4Mi0wLjA3MywwLjEyOC0wLjA4MiwwLjEzN2MtMC4wNTUtMC4wMjctMC4xMTYtMC4wNjMtMC4xODUtMC4xMDkgICAgcy0wLjE2Ny0wLjA5MS0wLjI5NC0wLjEzN2MtMC4xMjgtMC4wNDYtMC4yOTYtMC4wNzctMC41MDYtMC4wOTZjLTAuMjEtMC4wMTktMC40NzktMC4wMTQtMC44MDcsMC4wMTQgICAgYy0wLjE4MywwLjAxOS0wLjM1NSwwLjA3LTAuNTIsMC4xNTdzLTAuMzEsMC4xOTMtMC40MzgsMC4zMjFjLTAuMTI4LDAuMTI4LTAuMjI4LDAuMjcxLTAuMzAxLDAuNDMxICAgIGMtMC4wNzMsMC4xNTktMC4xMDksMC4zMTMtMC4xMDksMC40NThjMCwwLjM2NCwwLjEwNCwwLjY1OCwwLjMxNCwwLjg4MmMwLjIwOSwwLjIyNCwwLjQ2OSwwLjQxOSwwLjc3OSwwLjU4OCAgICBjMC4zMSwwLjE2OSwwLjY0NywwLjMzMywxLjAxMiwwLjQ5MmMwLjM2NCwwLjE1OSwwLjcwNCwwLjM1NCwxLjAxOSwwLjU4MXMwLjU3NiwwLjUxMywwLjc4NiwwLjg1NCAgICBDMzguOTM2LDQ5LjI2MSwzOS4wNDEsNDkuNywzOS4wNDEsNTAuMjM4eiIvPgoJPC9nPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yMy41LDE2di00aC0xMnY0djJ2MnYydjJ2MnYydjJ2NGgxMGgyaDIxdi00di0ydi0ydi0ydi0ydi0ydi00SDIzLjV6IE0xMy41LDE0aDh2MmgtOFYxNHogICAgTTEzLjUsMThoOHYyaC04VjE4eiBNMTMuNSwyMmg4djJoLThWMjJ6IE0xMy41LDI2aDh2MmgtOFYyNnogTTIxLjUsMzJoLTh2LTJoOFYzMnogTTQyLjUsMzJoLTE5di0yaDE5VjMyeiBNNDIuNSwyOGgtMTl2LTJoMTlWMjggICB6IE00Mi41LDI0aC0xOXYtMmgxOVYyNHogTTIzLjUsMjB2LTJoMTl2MkgyMy41eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'pdf file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQzRCNEM7IiBkPSJNMTkuNTE0LDMzLjMyNEwxOS41MTQsMzMuMzI0Yy0wLjM0OCwwLTAuNjgyLTAuMTEzLTAuOTY3LTAuMzI2ICAgYy0xLjA0MS0wLjc4MS0xLjE4MS0xLjY1LTEuMTE1LTIuMjQyYzAuMTgyLTEuNjI4LDIuMTk1LTMuMzMyLDUuOTg1LTUuMDY4YzEuNTA0LTMuMjk2LDIuOTM1LTcuMzU3LDMuNzg4LTEwLjc1ICAgYy0wLjk5OC0yLjE3Mi0xLjk2OC00Ljk5LTEuMjYxLTYuNjQzYzAuMjQ4LTAuNTc5LDAuNTU3LTEuMDIzLDEuMTM0LTEuMjE1YzAuMjI4LTAuMDc2LDAuODA0LTAuMTcyLDEuMDE2LTAuMTcyICAgYzAuNTA0LDAsMC45NDcsMC42NDksMS4yNjEsMS4wNDljMC4yOTUsMC4zNzYsMC45NjQsMS4xNzMtMC4zNzMsNi44MDJjMS4zNDgsMi43ODQsMy4yNTgsNS42Miw1LjA4OCw3LjU2MiAgIGMxLjMxMS0wLjIzNywyLjQzOS0wLjM1OCwzLjM1OC0wLjM1OGMxLjU2NiwwLDIuNTE1LDAuMzY1LDIuOTAyLDEuMTE3YzAuMzIsMC42MjIsMC4xODksMS4zNDktMC4zOSwyLjE2ICAgYy0wLjU1NywwLjc3OS0xLjMyNSwxLjE5MS0yLjIyLDEuMTkxYy0xLjIxNiwwLTIuNjMyLTAuNzY4LTQuMjExLTIuMjg1Yy0yLjgzNywwLjU5My02LjE1LDEuNjUxLTguODI4LDIuODIyICAgYy0wLjgzNiwxLjc3NC0xLjYzNywzLjIwMy0yLjM4Myw0LjI1MUMyMS4yNzMsMzIuNjU0LDIwLjM4OSwzMy4zMjQsMTkuNTE0LDMzLjMyNHogTTIyLjE3NiwyOC4xOTggICBjLTIuMTM3LDEuMjAxLTMuMDA4LDIuMTg4LTMuMDcxLDIuNzQ0Yy0wLjAxLDAuMDkyLTAuMDM3LDAuMzM0LDAuNDMxLDAuNjkyQzE5LjY4NSwzMS41ODcsMjAuNTU1LDMxLjE5LDIyLjE3NiwyOC4xOTh6ICAgIE0zNS44MTMsMjMuNzU2YzAuODE1LDAuNjI3LDEuMDE0LDAuOTQ0LDEuNTQ3LDAuOTQ0YzAuMjM0LDAsMC45MDEtMC4wMSwxLjIxLTAuNDQxYzAuMTQ5LTAuMjA5LDAuMjA3LTAuMzQzLDAuMjMtMC40MTUgICBjLTAuMTIzLTAuMDY1LTAuMjg2LTAuMTk3LTEuMTc1LTAuMTk3QzM3LjEyLDIzLjY0OCwzNi40ODUsMjMuNjcsMzUuODEzLDIzLjc1NnogTTI4LjM0MywxNy4xNzQgICBjLTAuNzE1LDIuNDc0LTEuNjU5LDUuMTQ1LTIuNjc0LDcuNTY0YzIuMDktMC44MTEsNC4zNjItMS41MTksNi40OTYtMi4wMkMzMC44MTUsMjEuMTUsMjkuNDY2LDE5LjE5MiwyOC4zNDMsMTcuMTc0eiAgICBNMjcuNzM2LDguNzEyYy0wLjA5OCwwLjAzMy0xLjMzLDEuNzU3LDAuMDk2LDMuMjE2QzI4Ljc4MSw5LjgxMywyNy43NzksOC42OTgsMjcuNzM2LDguNzEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NDNEI0QzsiIGQ9Ik00OC4wMzcsNTZINy45NjNDNy4xNTUsNTYsNi41LDU1LjM0NSw2LjUsNTQuNTM3VjM5aDQzdjE1LjUzN0M0OS41LDU1LjM0NSw0OC44NDUsNTYsNDguMDM3LDU2eiIvPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xNy4zODUsNTNoLTEuNjQxVjQyLjkyNGgyLjg5OGMwLjQyOCwwLDAuODUyLDAuMDY4LDEuMjcxLDAuMjA1ICAgIGMwLjQxOSwwLjEzNywwLjc5NSwwLjM0MiwxLjEyOCwwLjYxNWMwLjMzMywwLjI3MywwLjYwMiwwLjYwNCwwLjgwNywwLjk5MXMwLjMwOCwwLjgyMiwwLjMwOCwxLjMwNiAgICBjMCwwLjUxMS0wLjA4NywwLjk3My0wLjI2LDEuMzg4Yy0wLjE3MywwLjQxNS0wLjQxNSwwLjc2NC0wLjcyNSwxLjA0NmMtMC4zMSwwLjI4Mi0wLjY4NCwwLjUwMS0xLjEyMSwwLjY1NiAgICBzLTAuOTIxLDAuMjMyLTEuNDQ5LDAuMjMyaC0xLjIxN1Y1M3ogTTE3LjM4NSw0NC4xNjh2My45OTJoMS41MDRjMC4yLDAsMC4zOTgtMC4wMzQsMC41OTUtMC4xMDMgICAgYzAuMTk2LTAuMDY4LDAuMzc2LTAuMTgsMC41NC0wLjMzNWMwLjE2NC0wLjE1NSwwLjI5Ni0wLjM3MSwwLjM5Ni0wLjY0OWMwLjEtMC4yNzgsMC4xNS0wLjYyMiwwLjE1LTEuMDMyICAgIGMwLTAuMTY0LTAuMDIzLTAuMzU0LTAuMDY4LTAuNTY3Yy0wLjA0Ni0wLjIxNC0wLjEzOS0wLjQxOS0wLjI4LTAuNjE1Yy0wLjE0Mi0wLjE5Ni0wLjM0LTAuMzYtMC41OTUtMC40OTIgICAgYy0wLjI1NS0wLjEzMi0wLjU5My0wLjE5OC0xLjAxMi0wLjE5OEgxNy4zODV6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMi4yMTksNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzI4LjIyMiw1Mi45ODQsMjguMDI2LDUzLDI3Ljg5OCw1M2gtMy44MTRWNDIuOTI0aDMuMDM1ICAgIGMwLjg0OCwwLDEuNTkzLDAuMTM1LDIuMjM1LDAuNDAzczEuMTc2LDAuNjI3LDEuNiwxLjA3M3MwLjc0LDAuOTU1LDAuOTUsMS41MjRDMzIuMTE0LDQ2LjQ5NCwzMi4yMTksNDcuMDgsMzIuMjE5LDQ3LjY4MnogICAgIE0yNy4zNTIsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgyNy4zNTJ6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNi4yNjYsNDQuMTY4djMuMTcyaDQuMjExdjEuMTIxaC00LjIxMVY1M2gtMS42NjhWNDIuOTI0SDQwLjl2MS4yNDRIMzYuMjY2eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",

        'reader': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MCA0OTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MCA0OTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNDUsNDQ0LjA2M2M0MS4zMDktMjEuODU2LDgyLjMwNy0yOS4xNDMsMTE4LjYwMS0yOS4xNDNjNzIuNTk2LDAsMTI2LjM5OSwyOS4xNDMsMTI2LjM5OSwyOS4xNDNWNzUuMzY5ICAgYy00MC45NTEtMjIuMDgxLTgxLjkwNi0yOS40MzItMTE4LjI4LTI5LjQzMkMyOTkuMjg0LDQ1LjkzOCwyNDUsNzUuMDgxLDI0NSw3NS4wODFzLTU0LjI5My0yOS4xNC0xMjYuNzItMjkuMTQ0ICAgQzgxLjkwMSw0NS45MzYsNDAuOTU4LDUzLjI4NCwwLDc1LjM2OXYzNjguNjkzYzAsMCw1My44MTMtMjkuMTQzLDEyNi4zOTktMjkuMTQzQzE2Mi42OTksNDE0LjkyLDIwMy42ODMsNDIyLjIwMiwyNDUsNDQ0LjA2M3ogICAgTTQ1OS4zNzUsOTQuNDkxdjMwNC41OWMtMjQuNjg1LTcuNjM0LTU3LjkxNC0xNC43ODYtOTUuNzc0LTE0Ljc4NmMtMzYuMTAyLDAtNzAuNjMzLDYuODMxLTEwMy4yODgsMTkuNTdWMTAxLjY1MSAgIGM2LjczNi0zLjM0OCw1Mi43NDUtMjUuMDg4LDExMS40MDctMjUuMDg4QzQwMi42NzYsNzYuNTYzLDQzMi4wODMsODIuNTg2LDQ1OS4zNzUsOTQuNDkxeiBNMzAuNjI1LDk0LjQ5MSAgIGMyNy4yOTctMTEuOTA4LDU2LjctMTcuOTMsODcuNjUzLTE3LjkyOGM1OC44MTIsMC4wMDQsMTA0LjkzNCwyMS44NjMsMTExLjQwOSwyNS4wODV2MzAyLjIxOCAgIGMtMzIuNjU1LTEyLjc0LTY3LjE4Ny0xOS41Ny0xMDMuMjg4LTE5LjU3Yy0zNy44NTUsMC03MS4wODksNy4xNTQtOTUuNzc0LDE0Ljc4OFY5NC40OTF6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'download': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxwYXRoIGQ9Ik00ODAuNiwzNDEuNGMtMTEuMywwLTIwLjQsOS4xLTIwLjQsMjAuNHY5OC40SDUxLjh2LTk4LjRjMC0xMS4zLTkuMS0yMC40LTIwLjQtMjAuNGMtMTEuMywwLTIwLjQsOS4xLTIwLjQsMjAuNHYxMTguOCAgICBjMCwxMS4zLDkuMSwyMC40LDIwLjQsMjAuNGg0NDkuMmMxMS4zLDAsMjAuNC05LjEsMjAuNC0yMC40VjM2MS44QzUwMSwzNTAuNSw0OTEuOSwzNDEuNCw0ODAuNiwzNDEuNHoiIGZpbGw9IiMwMDAwMDAiLz4KICAgICAgPHBhdGggZD0ibTI0MSwzNjUuNmMxMS41LDExLjYgMjUuNiw1LjIgMjkuOSwwbDExNy4zLTEyNi4yYzcuNy04LjMgNy4yLTIxLjItMS4xLTI4LjktOC4zLTcuNy0yMS4yLTcuMi0yOC44LDEuMWwtODEuOSw4OC4xdi0yNjUuMmMwLTExLjMtOS4xLTIwLjQtMjAuNC0yMC40LTExLjMsMC0yMC40LDkuMS0yMC40LDIwLjR2MjY1LjNsLTgxLjktODguMWMtNy43LTguMy0yMC42LTguNy0yOC45LTEuMS04LjMsNy43LTguNywyMC42LTEuMSwyOC45bDExNy4zLDEyNi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
        'share': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwMi43NDkgNTAyLjc0OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAyLjc0OSA1MDIuNzQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzk0LjQsMTQ4LjI5OWMxLjQxNywwLDIuODMzLDAuMjgzLDQuMjUsMC4yODNsMCwwYzM5LjEsMCw3MS42ODMtMzAuODgzLDczLjk1LTY5Ljk4MyAgICBjMi4yNjctNDAuOC0yOC45LTc1LjkzMy02OS43LTc4LjQ4M2MtNDEuMDgzLTIuMjY3LTc1LjkzMywyOS4xODMtNzguMiw2OS43Yy0wLjU2Nyw5LjkxNywwLjg1LDE5LjI2NywzLjY4MywyOC4wNUwxNTIuMTUsMjAyLjk4MiAgICBjLTEzLjAzMy0xMS4wNS0yOS43NS0xNy44NS00OC4xNjctMTcuODVjLTQwLjgsMC03My45NSwzMy4xNS03My45NSw3My45NXMzMy4xNSw3My45NSw3My45NSw3My45NSAgICBjMTcuMjgzLDAsMzMuNDMzLTUuOTUsNDUuOS0xNi4xNWwxNzEuOTgzLDkzLjVjLTQuNTMzLDE3LjU2Ny0yLjI2NywzNS45ODMsNi4yMzMsNTIuMTMzYzEyLjc1LDI0LjY1LDM3Ljk2Nyw0MC4yMzMsNjUuNzMzLDQwLjIzMyAgICBsMCwwYzExLjksMCwyMy41MTctMy4xMTcsMzQtOC43ODNjMzYuMjY3LTE4LjcsNTAuNDMzLTY0LjAzMywzMS43MzMtMTAwLjAxN2MtMTIuNzUtMjQuNjUtMzcuOTY3LTM5Ljk1LTY1LjczMy0zOS45NSAgICBjLTExLjksMC0yMy41MTcsMi44MzMtMzQsOC41Yy04LjUsNC41MzMtMTYuMTUsMTAuNDgzLTIyLjEsMTcuNTY3bC0xNjYuMzE3LTkwLjM4M2M0LjI1LTkuMzUsNi44LTE5LjgzMyw2LjgtMzAuODgzICAgIGMwLTEwLjItMS45ODMtMTkuODMzLTUuNjY3LTI4LjYxN2wxNzQuMjUtMTAzLjQxN0MzNTguOTgzLDEzOS4yMzIsMzc1LjY5OSwxNDcuNDQ5LDM5NC40LDE0OC4yOTl6IE0zNTguNjk5LDcyLjA4MiAgICBjMS4xMzMtMjEuMjUsMTguNy0zNy42ODMsMzkuOTUtMzcuNjgzYzAuODUsMCwxLjcsMCwyLjI2NywwYzIyLjEsMS40MTcsMzguODE3LDIwLjExNywzNy42ODMsNDIuMjE3ICAgIGMtMS4xMzMsMjEuODE3LTIwLjExNywzOC44MTctNDIuMjE3LDM3LjY4M0MzNzQuMjgzLDExMi44ODIsMzU3LjI4Myw5My44OTksMzU4LjY5OSw3Mi4wODJ6IE02NC4wMzMsMjU5LjA4MiAgICBjMC0yMi4xLDE3Ljg1LTM5Ljk1LDM5Ljk1LTM5Ljk1czM5Ljk1LDE3Ljg1LDM5Ljk1LDM5Ljk1cy0xNy44NSwzOS45NS0zOS45NSwzOS45NVM2NC4wMzMsMjgxLjE4Miw2NC4wMzMsMjU5LjA4MnogICAgIE0zNzUuNDE2LDM5Mi44MTVjNS42NjctMy4xMTcsMTEuOS00LjUzMywxOC40MTctNC41MzNjMTUuMDE3LDAsMjguNjE3LDguMjE3LDM1LjcsMjEuNTMzYzEwLjIsMTkuNTUsMi41NSw0My45MTctMTcsNTMuODMzICAgIGMtNS42NjcsMy4xMTctMTEuOSw0LjUzMy0xOC40MTcsNC41MzNsMCwwYy0xNS4wMTcsMC0yOC42MTctOC4yMTctMzUuNy0yMS41MzNjLTQuODE3LTkuMzUtNS45NS0yMC40LTIuNTUtMzAuNiAgICBDMzU4LjY5OSw0MDYuMTMyLDM2NS43ODMsMzk3LjYzMiwzNzUuNDE2LDM5Mi44MTV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",
        'print': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxwYXRoIGQ9Im0xMC41LDEwNWgyMi45djEzLjVjMCwyLjMgMS44LDQuMSA0LjEsNC4xaDU0YzIuMywwIDQuMS0xLjggNC4xLTQuMXYtMTMuNWgyMi45YzIuMywwIDQuMS0xLjggNC4xLTQuMXYtNzIuOGMwLTIuMy0xLjgtNC4xLTQuMS00LjFoLTIyLjl2LTEzLjVjMC0yLjMtMS44LTQuMS00LjEtNC4xaC01NGMtMi4zLDAtNC4xLDEuOC00LjEsNC4xdjEzLjVoLTIyLjljLTIuMywwLTQuMSwxLjgtNC4xLDQuMXY3Mi44YzAsMi4yIDEuOSw0LjEgNC4xLDQuMXptNzYuOSw5LjRoLTQ1Ljh2LTMzLjhoNDUuOHYzMy44em0tNDUuOC05OS44aDQ1Ljh2OS40aC00NS44di05LjR6bS0yNywxNy42aDIyLjkgNTQgMjIuOXY2NC42aC0xOC44di0xNi4yaDcuM2MyLjMsMCA0LjEtMS44IDQuMS00LjFzLTEuOC00LjEtNC4xLTQuMWgtMTEuNC01NC0xMS4zYy0yLjMsMC00LjEsMS44LTQuMSw0LjFzMS44LDQuMSA0LjEsNC4xaDcuM3YxNi4yaC0xOC45di02NC42eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJtODYuMiw1My4zaDEwLjZjMi4zLDAgNC4xLTEuOCA0LjEtNC4xcy0xLjgtNC4xLTQuMS00LjFoLTEwLjZjLTIuMywwLTQuMSwxLjgtNC4xLDQuMXMxLjgsNC4xIDQuMSw0LjF6IiBmaWxsPSIjMDAwMDAwIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'laboratory': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgogIDxnPgogICAgPGc+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Im00MTAuMyw0NjAuMmgtMzA4LjZjLTAuNSwwLTAuOSwwLTEuMywwbDExMy43LTE4NC41YzItMy4yIDMtNi45IDMtMTAuN3YtMjEzLjJoNzcuNnYyMTMuMmMwLDMuOCAxLDcuNSAzLDEwLjdsMTEzLjcsMTg0LjVjLTAuMywwLTAuNywwLTEuMSwwem00MC43LTE0LjJsLTExNS4yLTE4Ni44di0xODYuNmMxMC4zLTYuMSAxNi45LTE2LjIgMTYuOS0yNy43IDAtMTktMTcuNy0zMy45LTQwLjItMzMuOWgtMTEzYy0yMi41LDAtNDAuMiwxNC45LTQwLjIsMzMuOSAwLDExLjUgNi41LDIxLjYgMTYuOSwyNy43djE4Ni43bC0xMTUuMiwxODYuN2MtNi40LDEwLjQtNi43LDIyLjktMC44LDMzLjUgNy41LDEzLjMgMjMuNCwyMS41IDQxLjUsMjEuNWgzMDguNWMxOC4xLDAgMzQtOC4yIDQxLjUtMjEuNSA2LTEwLjYgNS43LTIzLjEtMC43LTMzLjV6IiBmaWxsPSIjMDAwMDAwIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",

        'sms white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDc4LjY2NiA3OC42NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDc4LjY2NiA3OC42NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik05LjQ5LDczLjgzM2MtMS40OTQsMC0yLjk0My0wLjI0LTQuMzEtMC43MTNsLTMuMTEzLTEuMDc3bDIuMzkyLTIuMjY1YzMuMTY2LTIuOTk4LDMuOTY1LTYuNDU2LDQuMDE3LTkuMDQ2ICAgQzMuMDA0LDU0LjY2NSwwLDQ3LjA5NiwwLDM5LjMzM2MtMC4wMDEtMTkuMDIzLDE3LjY0NC0zNC41LDM5LjMzMi0zNC41czM5LjMzNCwxNS40NzcsMzkuMzM0LDM0LjUgICBjMCwxOS4wMjItMTcuNjQ2LDM0LjQ5OC0zOS4zMzQsMzQuNDk4Yy02LjQ1NywwLTEyLjgyNy0xLjM5OS0xOC41MDQtNC4wNTdDMTguNjg5LDcxLjI4OSwxNC4zNjgsNzMuODMzLDkuNDksNzMuODMzeiAgICBNMjAuMzU5LDY1LjA3OGwxLjE0OCwwLjU4MWM1LjM5NywyLjcyOSwxMS41NjEsNC4xNzMsMTcuODI0LDQuMTczYzE5LjQ4MywwLDM1LjMzNC0xMy42ODIsMzUuMzM0LTMwLjQ5OCAgIGMwLTE2LjgxOC0xNS44NTEtMzAuNS0zNS4zMzQtMzAuNVMzLjk5OCwyMi41MTYsMy45OTgsMzkuMzMzYzAsNi45ODksMi44MTQsMTMuODIyLDcuOTI1LDE5LjIzOWwwLjUyLDAuNTUxbDAuMDI0LDAuNzU3ICAgYzAuMDg4LDIuNzE5LTAuNCw2LjQwNi0yLjgxNyw5Ljk1MWM0LjYzMi0wLjA3NCw4Ljg5LTMuMjk4LDkuNzA0LTMuOTQ5TDIwLjM1OSw2NS4wNzh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMjAuMjU0LDQ4Ljc2OWMtMS40NjcsMC0yLjY1OC0wLjExNS0zLjU3OC0wLjM0NmMtMC45MTgtMC4yMjktMS41NTMtMC40NjUtMS45MDItMC43MDUgICBjLTAuMDg4LTAuMDg4LTAuMTIxLTAuMjg5LTAuMS0wLjYwN2MwLjAyMS0wLjMxNSwwLjA3MS0wLjY0NSwwLjE0OC0wLjk4M2MwLjA3Ni0wLjMzOCwwLjE3NS0wLjY0MiwwLjI5NS0wLjkwMSAgIGMwLjEyLTAuMjYyLDAuMjM0LTAuMzg0LDAuMzQ1LTAuMzYxYzAuNTY5LDAuMTk3LDEuMTg3LDAuMzg5LDEuODU0LDAuNTc0czEuNTE1LDAuMjc4LDIuNTQzLDAuMjc4ICAgYzEuMDUxLDAsMS45NDEtMC4xNTEsMi42NzYtMC40NTljMC43MzItMC4zMDcsMS4xLTAuODU0LDEuMS0xLjY0MWMwLTAuNjgxLTAuMjQyLTEuMjMyLTAuNzIzLTEuNjU4cy0xLjM0Ni0wLjg4MS0yLjU5My0xLjM2ICAgYy0wLjY3OS0wLjI2NS0xLjMxOC0wLjU1NC0xLjkyLTAuODcyYy0wLjYwMy0wLjMxNi0xLjEzMi0wLjY4OS0xLjU5Mi0xLjExNmMtMC40Ni0wLjQyNi0wLjgyLTAuOTM1LTEuMDgzLTEuNTI1ICAgYy0wLjI2My0wLjU5LTAuMzk1LTEuMjkxLTAuMzk1LTIuMTAxYzAtMC42NTYsMC4xMjctMS4yOCwwLjM3OC0xLjg3MXMwLjY0LTEuMSwxLjE2NS0xLjUyNmMwLjUyNS0wLjQyNiwxLjE5OC0wLjc2NiwyLjAxOS0xLjAxNyAgIGMwLjgyMS0wLjI1MiwxLjgtMC4zNzgsMi45MzgtMC4zNzhjMC43NDMsMCwxLjM2MiwwLjAxNywxLjg1NCwwLjA0OWMwLjQ5MiwwLjAzMywwLjg5NiwwLjA3NywxLjIxNSwwLjEzMiAgIGMwLjMxNiwwLjA1NSwwLjU3NCwwLjExNSwwLjc3MSwwLjE4MWMwLjE5NywwLjA2NiwwLjM4MywwLjEyLDAuNTU4LDAuMTY0YzAuMTUzLDAuMDY1LDAuMjMsMC4yNTcsMC4yMywwLjU3NCAgIHMtMC4wNDUsMC42NTYtMC4xMzIsMS4wMThjLTAuMDg3LDAuMzYtMC4yMDgsMC42NzgtMC4zNiwwLjk1MWMtMC4xNTQsMC4yNzQtMC4zMDcsMC4zODktMC40NiwwLjM0NSAgIGMtMC4zNzItMC4xMDktMC44ODEtMC4yMjktMS41MjYtMC4zNmMtMC42NDYtMC4xMzItMS4yNzQtMC4xOTctMS44ODctMC4xOTdjLTEuMjQ4LDAtMi4xMDYsMC4xNzYtMi41NzYsMC41MjUgICBjLTAuNDcxLDAuMzUtMC43MDYsMC44Mi0wLjcwNiwxLjQxMWMwLDAuNjM1LDAuMjYzLDEuMTQ0LDAuNzg4LDEuNTI2YzAuNTI1LDAuMzgyLDEuMzQ2LDAuNzcxLDIuNDYxLDEuMTY1ICAgYzEuNzcyLDAuNywzLjA4LDEuNTA0LDMuOTIyLDIuNDEyYzAuODQyLDAuOTA4LDEuMjY0LDIuMDUxLDEuMjY0LDMuNDNjMCwxLjAyOS0wLjE5NywxLjg4My0wLjU5LDIuNTYyICAgYy0wLjM5NSwwLjY3OC0wLjkyLDEuMjE1LTEuNTc2LDEuNjA2Yy0wLjY1NiwwLjM5Ni0xLjQwNiwwLjY3NC0yLjI0OCwwLjgzOEMyMS45ODgsNDguNjg3LDIxLjEyOSw0OC43NjksMjAuMjU0LDQ4Ljc2OXoiIGZpbGw9IiNGRkZGRkYiLz4KCTxwYXRoIGQ9Ik00My45MTcsNDguNjA1Yy0wLjQ1OSwwLTAuNzYtMC4wNzYtMC45MDEtMC4yM2MtMC4xNDQtMC4xNTItMC4yMTMtMC40NDctMC4yMTMtMC44ODdWMzYuMDAxICAgYy0wLjg3NSwxLjQyMi0xLjU1LDIuNTIxLTIuMDIxLDMuMjk4Yy0wLjQ3MiwwLjc3OC0wLjgxMywxLjM0Ny0xLjAzMywxLjcwOGMtMC4yMTksMC4zNTktMC4zNTEsMC41NzQtMC4zOTYsMC42MzkgICBjLTAuMDQzLDAuMDY2LTAuMDYzLDAuMTExLTAuMDYzLDAuMTMzYy0wLjE5NiwwLjMyOC0wLjMzNCwwLjU0MS0wLjQxLDAuNjRjLTAuMDc4LDAuMTAxLTAuMjM3LDAuMTQ3LTAuNDc3LDAuMTQ3aC0wLjUyNSAgIGMtMC4yODQsMC0wLjQ3MS0wLjA0OS0wLjU1OC0wLjE0N2MtMC4wODctMC4wOTktMC4yMTktMC4zMTItMC4zOTQtMC42NGwtMy4zNDgtNS43MXYxMS42MTljMCwwLjI4NS0wLjA0OSwwLjUxLTAuMTQ4LDAuNjc0ICAgYy0wLjA5OCwwLjE2NC0wLjM1NSwwLjI0Ni0wLjc3MSwwLjI0NmgtMS4zNzdjLTAuMzA3LDAtMC41NzQtMC4wNDktMC44MDUtMC4xNDhjLTAuMjI5LTAuMDk4LTAuMzQ1LTAuNDItMC4zNDUtMC45NjlWMzEuNzM2ICAgYzAtMC40MzgsMC4wODItMC43MjgsMC4yNDYtMC44N2MwLjE2NC0wLjE0MiwwLjM5OS0wLjIxMywwLjcwNi0wLjIxM2gxLjY0MWMwLjI0LDAsMC40NDMsMC4wMzIsMC42MDcsMC4wOTggICBzMC4zMzMsMC4yMywwLjUwOSwwLjQ5Mmw0LjM2NCw2Ljk1OGw0LjM2NS02Ljg5MmMwLjEzMi0wLjI0MSwwLjI4OS0wLjQxLDAuNDc4LTAuNTA5YzAuMTg3LTAuMDk5LDAuMzY1LTAuMTQ3LDAuNTQxLTAuMTQ3aDEuODA2ICAgYzAuNDE2LDAsMC42NTUsMC4wODcsMC43MjMsMC4yNjJjMC4wNjYsMC4xNzYsMC4wOTgsMC40NiwwLjA5OCwwLjg1NHYxNS44ODNjMCwwLjMyOC0wLjA0MywwLjU3LTAuMTMxLDAuNzI0ICAgcy0wLjM0LDAuMjI5LTAuNzU0LDAuMjI5SDQzLjkxN0w0My45MTcsNDguNjA1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTU0Ljg0OCw0OC43NjljLTEuNDY4LDAtMi42NTgtMC4xMTUtMy41NzgtMC4zNDZjLTAuOTE4LTAuMjI5LTEuNTU0LTAuNDY1LTEuOTAyLTAuNzA1ICAgYy0wLjA4OC0wLjA4OC0wLjEyMS0wLjI4OS0wLjEtMC42MDdjMC4wMjEtMC4zMTUsMC4wNjktMC42NDUsMC4xNDctMC45ODNjMC4wNzYtMC4zMzgsMC4xNzQtMC42NDIsMC4yOTUtMC45MDEgICBjMC4xMTktMC4yNjMsMC4yMzMtMC4zODQsMC4zNDUtMC4zNjFjMC41NjksMC4xOTcsMS4xODgsMC4zODksMS44NTQsMC41NzRjMC42NjYsMC4xODYsMS41MTQsMC4yNzgsMi41NDMsMC4yNzggICBjMS4wNTEsMCwxLjk0LTAuMTUxLDIuNjc2LTAuNDU5YzAuNzMxLTAuMzA3LDEuMTAxLTAuODU0LDEuMTAxLTEuNjQxYzAtMC42ODEtMC4yNDItMS4yMzItMC43MjQtMS42NThzLTEuMzQ2LTAuODgxLTIuNTk0LTEuMzYgICBjLTAuNjc5LTAuMjY1LTEuMzE3LTAuNTU0LTEuOTItMC44NzJjLTAuNjAzLTAuMzE2LTEuMTMyLTAuNjg5LTEuNTkzLTEuMTE2Yy0wLjQ1OS0wLjQyNi0wLjgxOS0wLjkzNS0xLjA4Mi0xLjUyNSAgIGMtMC4yNjQtMC41OTEtMC4zOTUtMS4yOTEtMC4zOTUtMi4xMDFjMC0wLjY1NiwwLjEyNy0xLjI4LDAuMzc3LTEuODcxYzAuMjUyLTAuNTkxLDAuNjQxLTEuMSwxLjE2Ni0xLjUyNiAgIGMwLjUyNS0wLjQyNiwxLjE5Ny0wLjc2NiwyLjAxOC0xLjAxN2MwLjgyMi0wLjI1MiwxLjgwMi0wLjM3OCwyLjkzOC0wLjM3OGMwLjc0NCwwLDEuMzYzLDAuMDE3LDEuODU0LDAuMDQ5ICAgYzAuNDkyLDAuMDMzLDAuODk2LDAuMDc3LDEuMjE2LDAuMTMyYzAuMzE1LDAuMDU1LDAuNTczLDAuMTE1LDAuNzcxLDAuMTgxYzAuMTk2LDAuMDY1LDAuMzgzLDAuMTIsMC41NTksMC4xNjQgICBjMC4xNTIsMC4wNjUsMC4yMjksMC4yNTcsMC4yMjksMC41NzRzLTAuMDQ1LDAuNjU2LTAuMTMzLDEuMDE4Yy0wLjA4NiwwLjM2LTAuMjA3LDAuNjc4LTAuMzU4LDAuOTUxICAgYy0wLjE1NCwwLjI3NC0wLjMwOCwwLjM4OS0wLjQ2MSwwLjM0NWMtMC4zNzEtMC4xMDktMC44ODItMC4yMjktMS41MjUtMC4zNmMtMC42NDYtMC4xMzItMS4yNzUtMC4xOTctMS44ODctMC4xOTcgICBjLTEuMjQ4LDAtMi4xMDcsMC4xNzYtMi41NzYsMC41MjVjLTAuNDcxLDAuMzUtMC43MDcsMC44Mi0wLjcwNywxLjQxMWMwLDAuNjM1LDAuMjY0LDEuMTQ0LDAuNzg5LDEuNTI2ICAgYzAuNTI0LDAuMzgyLDEuMzQ2LDAuNzcxLDIuNDYxLDEuMTY1YzEuNzcxLDAuNywzLjA4LDEuNTA0LDMuOTIyLDIuNDEyYzAuODQyLDAuOTA4LDEuMjY0LDIuMDUxLDEuMjY0LDMuNDMgICBjMCwxLjAyOS0wLjE5NywxLjg4My0wLjU5LDIuNTYyYy0wLjM5NSwwLjY3OC0wLjkyLDEuMjE1LTEuNTc2LDEuNjA2Yy0wLjY1NiwwLjM5Ni0xLjQwNiwwLjY3NC0yLjI0OCwwLjgzOCAgIEM1Ni41NzksNDguNjg3LDU1LjcyMyw0OC43NjksNTQuODQ4LDQ4Ljc2OXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'email white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQ0IDQ0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0NCA0NCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KICA8Zz4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNNDMsNkgxQzAuNDQ3LDYsMCw2LjQ0NywwLDd2MzBjMCwwLjU1MywwLjQ0NywxLDEsMWg0MmMwLjU1MiwwLDEtMC40NDcsMS0xVjdDNDQsNi40NDcsNDMuNTUyLDYsNDMsNnogTTQyLDMzLjU4MSAgICAgTDI5LjYxMiwyMS4xOTRsLTEuNDE0LDEuNDE0TDQxLjU5LDM2SDIuNDFsMTMuMzkyLTEzLjM5MmwtMS40MTQtMS40MTRMMiwzMy41ODFWOGg0MFYzMy41ODF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICAgIDxnPgogICAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNMzkuOTc5LDhMMjIsMjUuOTc5TDQuMDIxLDhIMnYwLjgwN0wyMS4yOTMsMjguMWMwLjM5MSwwLjM5MSwxLjAyMywwLjM5MSwxLjQxNCwwTDQyLDguODA3VjhIMzkuOTc5eiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'telegram white': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGcgaWQ9IlhNTElEXzQ5Nl8iPgoJPHBhdGggaWQ9IlhNTElEXzQ5N18iIGQ9Ik01LjI5OSwxNDQuNjQ1bDY5LjEyNiwyNS44bDI2Ljc1Niw4Ni4wNDdjMS43MTIsNS41MTEsOC40NTEsNy41NDgsMTIuOTI0LDMuODkxbDM4LjUzMi0zMS40MTIgICBjNC4wMzktMy4yOTEsOS43OTItMy40NTUsMTQuMDEzLTAuMzkxbDY5LjQ5OCw1MC40NTdjNC43ODUsMy40NzgsMTEuNTY0LDAuODU2LDEyLjc2NC00LjkyNkwyOTkuODIzLDI5LjIyICAgYzEuMzEtNi4zMTYtNC44OTYtMTEuNTg1LTEwLjkxLTkuMjU5TDUuMjE4LDEyOS40MDJDLTEuNzgzLDEzMi4xMDItMS43MjIsMTQyLjAxNCw1LjI5OSwxNDQuNjQ1eiBNOTYuODY5LDE1Ni43MTFsMTM1LjA5OC04My4yMDcgICBjMi40MjgtMS40OTEsNC45MjYsMS43OTIsMi44NDEsMy43MjZMMTIzLjMxMywxODAuODdjLTMuOTE5LDMuNjQ4LTYuNDQ3LDguNTMtNy4xNjMsMTMuODI5bC0zLjc5OCwyOC4xNDYgICBjLTAuNTAzLDMuNzU4LTUuNzgyLDQuMTMxLTYuODE5LDAuNDk0bC0xNC42MDctNTEuMzI1Qzg5LjI1MywxNjYuMTYsOTEuNjkxLDE1OS45MDcsOTYuODY5LDE1Ni43MTF6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",

        //Format:    'key': "data_url",
    };

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || dataUrlTitle || '';
    }

    function file(filename) {
        var previewIcon = 'free file';
        if (isOneOfThese(['doc', 'docx']))
            previewIcon = 'doc file';
        if (isOneOfThese(['xls', 'xlsx']))
            previewIcon = 'xls file';
        if (isOneOfThese(['pdf']))
            previewIcon = 'pdf file';

        return iconJs(previewIcon);

        function isOneOfThese(arrayOfTypes) {
            for (var i = 0; i < arrayOfTypes.length; i++)
                if (filename.slice(-1 - arrayOfTypes[i].length) === '.' + arrayOfTypes[i])
                    return true;
            return false;
        }
    }

})(global);

/*
	AHS502 : End of 'icon-js.js'
*/


/*
	AHS502 : Start of 'persian-number.js'
*/

(function(global) {

    global.toPersianNumber = toPersianNumber;

    var persianDigitConvertions = {
        0: '۰',
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

    function toPersianNumber(text) {
        text = String(text || '');
        var chars = text.split('');
        return chars.map(function(char) {
            if (persianDigitConvertions[char] != undefined)
                return persianDigitConvertions[char];
            else
                return char;
        }).join('');
    }

})(global);

/*
	AHS502 : End of 'persian-number.js'
*/


/*
	AHS502 : Start of 'app.js'
*/

/*global angular*/

var app = angular.module('JavabAzmayesh', [
    'ui.router',
    'vcRecaptcha', 
    // 'virtualRepeat',
]);


/*
	AHS502 : End of 'app.js'
*/


/*
	AHS502 : Start of 'app-config.js'
*/

/*global app*/

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$compileProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$compileProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'home.html',
                        controller: 'HomeController',
                    },
                    menu: {
                        templateUrl: 'home/menu.html'
                    },
                    footer: {
                        templateUrl: 'home/footer.html'
                    },
                },
                abstract: true
            })
            .state('home.find', {
                url: '/find',
                templateUrl: 'home/find.html',
                controller: 'HomeFindController'
            })
            .state('home.otp', {
                url: '/otp',
                templateUrl: 'home/otp.html',
                controller: 'HomeOtpController'
            })
            .state('home.history', {
                url: '/history',
                params: {
                    nationalCode: null,
                    otpId: null,
                    requestCode: null
                },
                templateUrl: 'home/history.html',
                controller: 'HomeHistoryController'
            })
            .state('home.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('home.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('history', {
                url: '/history',
                params: {
                    nationalCode: null
                },
                views: {
                    '': {
                        templateUrl: 'history.html',
                        controller: 'HistoryController'
                    },
                    header: {
                        templateUrl: 'history/header.html'
                    }
                }
            });

        $stateProvider
            .state('answer', {
                url: '/answer?p&n', // p := nationalCode, n := postCode
                params: {
                    previousState: null,
                    previousStateData: null
                },
                views: {
                    '': {
                        templateUrl: 'answer.html',
                        controller: 'AnswerController'
                    },
                    menu: {
                        templateUrl: 'answer/menu.html',
                    },
                    header: {
                        templateUrl: 'answer/header.html',
                    },
                    footer: {
                        templateUrl: 'answer/footer.html',
                    },
                }
            })
            .state('answer.post', {
                url: '/post',
                templateUrl: 'answer/post.html'
            })
            .state('answer.download', {
                url: '/download',
                templateUrl: 'answer/download.html'
            })
            .state('answer.share', {
                url: '/share',
                templateUrl: 'answer/share.html'
            })
            .state('answer.laboratory', {
                url: '/laboratory',
                templateUrl: 'answer/laboratory.html'
            });

        $stateProvider
            .state('lab', {
                url: '/lab',
                views: {
                    '': {
                        templateUrl: 'lab.html',
                        controller: 'LabController',
                    },
                    menu: {
                        templateUrl: 'lab/menu.html'
                    },
                    footer: {
                        templateUrl: 'lab/footer.html'
                    },
                },
                abstract: true
            })
            .state('lab.login', {
                url: '/login',
                templateUrl: 'lab/login.html',
                controller: 'LabLoginController'
            })
            .state('lab.register', {
                url: '/register',
                params: {
                    username: null
                },
                templateUrl: 'lab/register.html',
                controller: 'LabRegisterController'
            })
            .state('lab.validate', {
                url: '/validate',
                params: {
                    username: null
                },
                templateUrl: 'lab/validate.html',
                controller: 'LabValidateController'
            })
            .state('lab.signedup', {
                url: '/signedup',
                templateUrl: 'lab/signedup.html'
            })
            .state('lab.forget', {
                url: '/forget',
                templateUrl: 'lab/forget.html',
                controller: 'LabForgetController'
            })
            .state('lab.password', {
                url: '/password',
                templateUrl: 'lab/password.html'
            })
            .state('lab.about', {
                url: '/about',
                params: {
                    previousState: null
                },
                templateUrl: 'common/about.html',
                controller: 'CommonAboutController'
            })
            .state('lab.contact', {
                url: '/contact',
                params: {
                    previousState: null
                },
                templateUrl: 'common/contact.html',
                controller: 'CommonContactController'
            });

        $stateProvider
            .state('panel', {
                url: '/panel',
                views: {
                    '': {
                        templateUrl: 'panel.html',
                        controller: 'PanelController',
                    },
                    menu: {
                        templateUrl: 'panel/menu.html'
                    },
                    header: {
                        templateUrl: 'panel/header.html'
                    },
                },
                abstract: true
            })
            .state('panel.home', {
                url: '/home',
                templateUrl: 'panel/home.html',
                controller: 'PanelHomeController'
            })
            .state('panel.history', {
                url: '/history',
                templateUrl: 'panel/history.html',
                controller: 'PanelHistoryController'
            })
            .state('panel.post', {
                url: '/post',
                templateUrl: 'panel/post.html',
                controller: 'PanelPostController'
            })
            .state('panel.send', {
                url: '/send',
                templateUrl: 'panel/send.html',
                controller: 'PanelSendController'
            })
            .state('panel.balance', {
                url: '/balance',
                templateUrl: 'panel/balance.html',
                controller: 'PanelBalanceController'
            })
            .state('panel.account', {
                url: '/account',
                templateUrl: 'panel/account.html',
                controller: 'PanelAccountController',
                abstract: true
            })
            .state('panel.account.summary', {
                url: '/summary',
                templateUrl: 'panel/account/summary.html',
                controller: 'PanelAccountSummaryController'
            })
            .state('panel.account.edit', {
                url: '/edit',
                templateUrl: 'panel/account/edit.html',
                controller: 'PanelAccountEditController'
            })
            .state('panel.account.password', {
                url: '/password',
                templateUrl: 'panel/account/password.html',
                controller: 'PanelAccountPasswordController'
            })
            .state('panel.account.confirm', {
                url: '/confirm',
                params: {
                    action: null
                },
                templateUrl: 'panel/account/confirm.html',
                controller: 'PanelAccountConfirmController'
            });

        $urlRouterProvider.otherwise('/home/find');

        // $locationProvider.html5Mode(true);
        
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|tg):/);

    }
]);


/*
	AHS502 : End of 'app-config.js'
*/


/*
	AHS502 : Start of 'app-run.js'
*/

/*global app*/
/*global $*/
/*global localStorage*/

app.run(['$rootScope', '$state', '$stateParams', '$window', 'UserService',
    function($rootScope, $state, $stateParams, $window, userService) {

        // No need to initial loader anymore
        $('#ja-initial-loader').hide();
        $('#ja-main-site-content').show();
        $('#ja-sidebar-menu').show();

        if ($window.location.hash.indexOf('#/answer') !== 0) {
            $state.go(localStorage.startState || 'home.find');
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.data = {};

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                //NOTE: Use  event.preventDefault()  if it's needed.

                if (toState.name.indexOf('panel.') === 0) {
                    if (!userService.current()) {
                        event.preventDefault();
                        $state.go('lab.login');
                    }
                }
                else {
                    delete $rootScope.data.postCache;
                    delete $rootScope.data.historyState;
                    if (userService.current()) {
                        userService.logout();
                    }
                }

            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {

                //...

            });

    }
]);


/*
	AHS502 : End of 'app-run.js'
*/


/*
	AHS502 : Start of 'answer-service.js'
*/

/*global app*/

app.service('AnswerService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.patientInfo = patientInfo;
        this.send = send;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 71, 100, 101
        // Resolves to patient personal information
        function patientInfo(nationalCode) {
            return utils.httpPromiseHandler($http.post('/answer/patient/info', {
                    nationalCode: nationalCode
                }))
                .then(function(body) {
                    return {
                        fullName: body.fullName,
                        numbers: body.numbers || [],
                        email: body.email
                    };
                });
        }

        // May reject by code : 1, 2, 5, 50, 80, 100, 101, 120
        function send(person, files, notes, invalidPersonHandler) {
            return utils.httpPromiseHandler($http.post('/answer/send', {
                timeStamp: Date.now(),
                person: {
                    nationalCode: person.nationalCode,
                    fullName: person.fullName,
                    mobilePhoneNumber: person.mobilePhoneNumber,
                    phoneNumber: person.phoneNumber,
                    extraPhoneNumber: person.extraPhoneNumber,
                    email: person.email
                },
                files: files.map(function(file) {
                    return {
                        serverName: file.serverName,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    };
                }),
                notes: notes
            }), function(data) {
                if (invalidPersonHandler)
                    invalidPersonHandler(data.errors || {});
            });
        }

        /////////////////////////////////////////////////////

    }
]);

/*
	AHS502 : End of 'answer-service.js'
*/


/*
	AHS502 : Start of 'history-serveice.js'
*/

/*global app*/

app.service('HistoryService', ['$http', 'Utils',
    function($http, utils) {

        this.generateOtp = generateOtp;
        this.findHistory = findHistory;
        this.loadAnswer = loadAnswer;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 51, 60, 120
        // Resolves to an object containing: otpId, requestCode
        function generateOtp(nationalCode, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/history/generate/otp', {
                    nationalCode: nationalCode,
                    mobilePhoneNumber: mobilePhoneNumber
                }))
                .then(function(body) {
                    return {
                        otpId: body.otpId,
                        requestCode: body.requestCode
                    };
                });
        }

        // May reject by code : 1, 2, 5, 40, /*70*/, 71
        // Resolves to patient's information and history
        function findHistory(nationalCode, otpId, requestCode, otp) {
            return utils.httpPromiseHandler($http.post('/history/find/history', {
                    nationalCode: nationalCode,
                    otpId: otpId,
                    requestCode: requestCode,
                    otp: otp
                }))
                .then(function(body) {
                    return {
                        // accessKey = body.accessKey,
                        patientInfo: body.patientInfo,
                        history: body.history
                    };
                });
        }

        // May reject by code : 1, 2, 5, 71, 72, 73, 74
        // Resolves to patient's answer content
        function loadAnswer(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/history/load/answer', {
                    nationalCode: nationalCode,
                    postCode: postCode
                }))
                .then(function(body) {
                    return {
                        patientName: body.patientName,
                        postDate: new Date(body.timeStamp),
                        notes: body.notes,
                        files: body.files.map(function(file) {
                            return {
                                serverName: file.serverName,
                                name: file.name,
                                size: file.size,
                                type: file.type
                            };
                        }),
                        lab: {
                            name: body.lab.name,
                            mobilePhoneNumber: body.lab.mobilePhoneNumber,
                            phoneNumber: body.lab.phoneNumber,
                            address: body.lab.address,
                            postalCode: body.lab.postalCode,
                            websiteAddress: body.lab.websiteAddress
                        }
                    };
                });
        }

    }
]);

/*
	AHS502 : End of 'history-serveice.js'
*/


/*
	AHS502 : Start of 'post-serveice.js'
*/

/*global app*/

app.service('PostService', ['$q', '$http', 'Utils',
    function($q, $http, utils) {

        this.getPosts = getPosts;
        this.getOnePost = getOnePost;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 50, 100, 101
        // Resolves to user's posts: { '1396/1': [{...post-data...}, ...], ... }
        function getPosts(year, months) {
            return utils.httpPromiseHandler($http.post('/post/load/all', {
                    year: year,
                    months: months
                }))
                .then(function(body) {
                    var postPacks = body.postPacks || {};
                    for (var postPackKey in postPacks) {
                        var encodedPosts = postPacks[postPackKey] || '';
                        var posts = encodedPosts.split('|')
                            .filter(function(encodedPost) {
                                return !!encodedPost;
                            })
                            .map(function(encodedPost) {
                                return {
                                    nationalCode: encodedPost.slice(0, 10),
                                    filesCount: Number(encodedPost.slice(10, 12)),
                                    postCode: encodedPost.slice(12, 16),
                                    postDate: new Date(Number(encodedPost.slice(16, 29)))
                                };
                            });
                        postPacks[postPackKey] = posts;
                    }
                    return postPacks;
                });
        }

        // May reject by code : 1, 2, 5, 50, 71, 72, 73, 100, 101
        // Resolves to the answer data
        function getOnePost(nationalCode, postCode) {
            return utils.httpPromiseHandler($http.post('/post/load/one', {
                    nationalCode: nationalCode,
                    postCode: postCode
                }))
                .then(function(body) {
                    return {
                        fullName: body.fullName,
                        nationalCode: body.nationalCode,
                        numbers: body.numbers || [],
                        email: body.email,
                        postCode: body.postCode,
                        postDate: new Date(body.timeStamp),
                        notes: body.notes,
                        files: body.files || []
                    };
                });
        }

    }
]);

/*
	AHS502 : End of 'post-serveice.js'
*/


/*
	AHS502 : Start of 'user-service.js'
*/

/*global app*/

app.service('UserService', ['$q', '$http', '$window', 'Utils',
    function($q, $http, $window, utils) {

        this.register = register;
        this.registerConfirm = registerConfirm;

        this.editAccount = editAccount;
        this.editPassword = editPassword;
        this.editConfirm = editConfirm;

        this.login = login;
        this.refresh = refresh;
        this.logout = logout;
        this.current = current;
        this.restorePassword = restorePassword;

        /////////////////////////////////////////////////////

        // May reject by code : 1, 2, 5, 10, 11, 80
        function register(model, invalidModelHandler) {
            return utils.httpPromiseHandler($http.post('/user/register', {
                userData: {
                    labName: model.labName,
                    mobilePhoneNumber: model.mobilePhoneNumber,
                    phoneNumber: model.phoneNumber,
                    address: model.address,
                    postalCode: model.postalCode,
                    websiteAddress: model.websiteAddress,
                    username: model.username,
                    password: model.password
                },
                recaptcha: model.response
            }), function(data) {
                if (invalidModelHandler)
                    invalidModelHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32
        function registerConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/register/confirm', {
                username: username,
                validationCode: validationCode
            }));
        }

        // May reject by code : 1, 2, 3, 5, 50, 51, 80, 100, 101, 120
        function editAccount(newAccount, invalidNewAccountHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/account', {
                newAccount: {
                    labName: newAccount.labName,
                    mobilePhoneNumber: newAccount.mobilePhoneNumber,
                    phoneNumber: newAccount.phoneNumber,
                    address: newAccount.address,
                    postalCode: newAccount.postalCode,
                    websiteAddress: newAccount.websiteAddress,
                }
            }), function(data) {
                if (invalidNewAccountHandler)
                    invalidNewAccountHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 50, 51, 80, 100, 101, 120
        function editPassword(oldPassword, newPassword, invalidNewPasswordHandler) {
            return utils.httpPromiseHandler($http.post('/user/edit/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }), function(data) {
                if (invalidNewPasswordHandler)
                    invalidNewPasswordHandler(data.errors || {});
            });
        }

        // May reject by code : 1, 2, 5, 30, 31, 32, 50, 100, 101
        // Resolves to current user new info
        function editConfirm(username, validationCode) {
            return utils.httpPromiseHandler($http.post('/user/edit/confirm', {
                    username: username,
                    validationCode: validationCode
                }))
                .then(function(body) {
                    var userInfo = processUserInfo(body.userInfo);
                    setCurrent(undefined, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 40
        // Resolves to current user info
        function login(username, password) {
            return utils.httpPromiseHandler($http.post('/user/login', {
                    username: username,
                    password: password
                }))
                .then(function(body) {
                    var accessKey = body.accessKey,
                        userInfo = processUserInfo(body.userInfo);
                    $http.defaults.headers.common['X-Access-Token'] = accessKey;
                    setCurrent(accessKey, userInfo);
                    return userInfo;
                });
        }

        // May reject by code : 1, 2, 5, 50, 51, 100, 101
        // Resolves to current user new info
        function refresh() {
            if (current() === null) {
                return $q.reject(50);
            }
            return utils.httpPromiseHandler($http.post('/user/refresh', {}))
                .then(function(body) {
                    var userInfo = processUserInfo(body.userInfo);
                    setCurrent(undefined, userInfo);
                    return userInfo;
                });
        }

        // No rejection
        function logout() {
            delete $http.defaults.headers.common['X-Access-Token'];
            delete $window.sessionStorage['CurrentUser'];
            return $q.when();
        }

        // Returns current user
        function current() {
            try {
                var currentUserEncoded = $window.sessionStorage['CurrentUser'];
                if (!currentUserEncoded) return null;
                var currentUser = JSON.parse(currentUserEncoded);
                if (!currentUser) return null;
                var userInfo = processUserInfo(currentUser.userInfo);
                if (!userInfo) return null;
                return userInfo;
            }
            catch (err) {
                return null;
            }
        }

        // May reject by code : 1, 2, 5, 51, 60, 120
        function restorePassword(username, mobilePhoneNumber) {
            return utils.httpPromiseHandler($http.post('/user/restorePassword', {
                username: username,
                mobilePhoneNumber: mobilePhoneNumber
            }));
        }

        /////////////////////////////////////////////////////

        function setCurrent(accessKey, userInfo) {
            var data;
            try {
                data = JSON.parse($window.sessionStorage['CurrentUser'] || '{}') || {};
            }
            catch (err) {
                data = {};
            }
            (accessKey !== undefined) && (data.accessKey = accessKey);
            (userInfo !== undefined) && (data.userInfo = userInfo);
            $window.sessionStorage['CurrentUser'] = JSON.stringify(data);
        }

        function processUserInfo(userInfo) {
            if (userInfo) {
                userInfo.subscriptionDate = new Date(userInfo.timeStamp);
                // delete userInfo.timeStamp; // DO NOT ACTIVATE THIS LINE EVER AGAIN!
            }
            return userInfo;
        }

    }
]);

/*
	AHS502 : End of 'user-service.js'
*/


/*
	AHS502 : Start of 'utils.js'
*/

/*global app*/

app.factory('Utils', ['$q', '$http', '$window',
    function($q, $http, $window) {

        return {
            httpPromiseHandler: httpPromiseHandler,
        };

        function httpPromiseHandler(promise, rejectionDataProcessor) {
            return promise.then(successHandlerMaker(rejectionDataProcessor), failureHandler);
        }

        function successHandlerMaker(rejectionDataProcessor) {
            return function successHandler(response) {
                if (response.status != 200) {
                    console.log(response.status, response.data);
                    return $q.reject(1);
                }
                if (response.data.code !== 0) {
                    if (typeof rejectionDataProcessor === 'function') {
                        rejectionDataProcessor(response.data);
                    }
                    return $q.reject(response.data.code || 1);
                }
                return response.data;
            };
        }

        function failureHandler(err) {
            console.error(err);
            return $q.reject(2);
        }

    }
]);


/*
	AHS502 : End of 'utils.js'
*/


/*
	AHS502 : Start of 'common/about-controller.js'
*/

/*global app*/

app.controller('CommonAboutController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/about-controller.js'
*/


/*
	AHS502 : Start of 'common/contact-controller.js'
*/

/*global app*/

app.controller('CommonContactController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $scope.previousState = $stateParams.previousState;

        $scope.setBackHandler(function() {
            $state.go($scope.previousState);
        });

    }
]);


/*
	AHS502 : End of 'common/contact-controller.js'
*/


/*
	AHS502 : Start of 'home/find-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global localStorage*/

app.controller('HomeFindController', ['$rootScope', '$scope', '$state', '$timeout',
    function($rootScope, $scope, $state, $timeout) {

        $scope.seeAnswer = seeAnswer;

        $scope.findingAnswer = false; // No need to!

        localStorage.startState = "home.find";

        $scope.setBackHandler(false);

        //$scope.nationalCode
        //$scope.postCode

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('postCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function seeAnswer() {
            if (!$scope.vs.validate()) return;
            
            $state.go('answer', {
                p: $scope.nationalCode,
                n: $scope.postCode,
                previousState: 'home.find',
                previousStateData: null
            });
        }

    }
]);


/*
	AHS502 : End of 'home/find-controller.js'
*/


/*
	AHS502 : Start of 'home/history-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('HomeHistoryController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $stateParams, $timeout, historyService) {

        $scope.findHistory = findHistory;

        $scope.nationalCode = $stateParams.nationalCode;
        var otpId = $stateParams.otpId;
        var requestCode = $stateParams.requestCode;

        $scope.findingHistory = false;

        $scope.setBackHandler(function() {
            $state.go('home.otp');
        });

        //$scope.otp

        $scope.vs = new ValidationSystem($scope)
            .field('otp', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(6)
            ]);

        function findHistory() {
            if (!$scope.vs.validate()) return;

            $scope.findingHistory = true;
            historyService.findHistory($scope.nationalCode, otpId, requestCode, $scope.otp)
                .then(function(data) {
                    $rootScope.data.patientInfo = data.patientInfo;
                    $rootScope.data.history = data.history;
                    $state.go('history', {
                        nationalCode: $scope.nationalCode
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.findingHistory = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/history-controller.js'
*/


/*
	AHS502 : Start of 'home/otp-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('HomeOtpController', ['$rootScope', '$scope', '$state', '$timeout', 'HistoryService',
    function($rootScope, $scope, $state, $timeout, historyService) {

        $scope.sendOtp = sendOtp;

        $scope.sendingOtp = false;

        $scope.setBackHandler(function() {
            $state.go('home.find');
        });

        //$scope.nationalCode
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function sendOtp() {
            if (!$scope.vs.validate()) return;

            $scope.sendingOtp = true;
            historyService.generateOtp($scope.nationalCode, $scope.mobilePhoneNumber)
                .then(function(data) {
                    $state.go('home.history', {
                        nationalCode: $scope.nationalCode,
                        otpId: data.otpId,
                        requestCode: data.requestCode
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.sendingOtp = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'home/otp-controller.js'
*/


/*
	AHS502 : Start of 'lab/forget-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabForgetController', ['$rootScope', '$scope', '$state', '$timeout', 'UserService',
    function($rootScope, $scope, $state, $timeout, userService) {

        $scope.restorePassword = restorePassword;

        $scope.restoringPassword = false;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.username
        //$scope.mobilePhoneNumber

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ]);

        function restorePassword() {
            if (!$scope.vs.validate()) return;

            $scope.restoringPassword = true;
            return userService.restorePassword($scope.username, $scope.mobilePhoneNumber)
                .then(function() {
                    $state.go('lab.password');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.restoringPassword = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/forget-controller.js'
*/


/*
	AHS502 : Start of 'lab/login-controller.js'
*/

/*global app*/
/*global ValidationSystem*/
/*global localStorage*/

app.controller('LabLoginController', ['$rootScope', '$scope', '$state', 'UserService',
    function($rootScope, $scope, $state, userService) {

        $scope.login = login;

        $scope.loggingIn = false;

        localStorage.startState = "lab.login";

        $scope.setBackHandler(false);

        //$scope.username
        //$scope.password

        $scope.vs = new ValidationSystem($scope)
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4)
            ]);

        function login() {
            if (!$scope.vs.validate()) return;

            $scope.loggingIn = true;
            return userService.login($scope.username, $scope.password)
                .then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                    $state.go('panel.home');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.loggingIn = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/login-controller.js'
*/


/*
	AHS502 : Start of 'lab/register-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabRegisterController', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout',
    'vcRecaptchaService', 'UserService', 'Config',
    function($rootScope, $scope, $state, $stateParams, $timeout,
        vcRecaptchaService, userService, config) {

        $scope.setResponse = setResponse;
        $scope.setWidgetId = setWidgetId;
        $scope.cbExpiration = cbExpiration;
        $scope.sendRegisterationForm = sendRegisterationForm;

        $scope.showGoogleRecaptcha = config.google_recaptcha;
        $scope.key = config.google_recaptcha_public_key;
        $scope.sendingRegisterationForm = false;
        $scope.model = {};

        $scope.model.username = $stateParams.username;

        $scope.setBackHandler(function() {
            $state.go('lab.login');
        });

        //$scope.model.labName
        //$scope.model.mobilePhoneNumber
        //$scope.model.phoneNumber
        //$scope.model.address
        //$scope.model.postalCode
        //$scope.model.websiteAddress
        //$scope.model.username
        //$scope.model.password
        //$scope.model.passwordAgain
        //$scope.model.acceptRules

        $scope.vs = new ValidationSystem($scope.model)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ])
            .field('username', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.username(),
                ValidationSystem.validators.minLength(4)
            ])
            .field('password', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.passwordAgain && $scope.model.passwordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('passwordAgain', [
                function(value) {
                    if (!$scope.model.password) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.model.password != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('acceptRules', [
                ValidationSystem.validators.notEmpty('پذیرفتن قوانین و مقررات الزامی است')
            ]);

        function setResponse(response) {
            $scope.response = response;
        }

        function setWidgetId(widgetId) {
            $scope.widgetId = widgetId;
        }

        function cbExpiration() {
            config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        }

        function sendRegisterationForm() {
            if (!$scope.vs.validate()) return;

            $scope.sendingRegisterationForm = true;
            config.google_recaptcha && ($scope.model.response = $scope.response);
            return userService.register($scope.model, $scope.vs.dictate)
                .then(function() {
                    $state.go('lab.validate', {
                        username: $scope.model.username
                    });
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.sendingRegisterationForm = false;
                    alert(code);
                    config.google_recaptcha && vcRecaptchaService.reload($scope.widgetId);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/register-controller.js'
*/


/*
	AHS502 : Start of 'lab/validate-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('LabValidateController', ['$rootScope', '$scope', '$state', '$stateParams', 'UserService',
    function($rootScope, $scope, $state, $stateParams, userService) {

        $scope.confirmRegisteration = confirmRegisteration;

        $scope.username = $stateParams.username;

        $scope.confirmingRegisteration = false;

        $scope.setBackHandler(function() {
            $state.go('lab.register', {
                username: $scope.username
            });
        });

        //$scope.validationCode

        $scope.vs = new ValidationSystem($scope)
            .field('validationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirmRegisteration() {
            if (!$scope.vs.validate()) return;

            $scope.confirmingRegisteration = true;
            return userService.registerConfirm($scope.username, $scope.validationCode)
                .then(function() {
                    $scope.confirmingRegisteration = false;
                    $state.go('lab.signedup');
                }, function(code) {
                    //TODO: Handle errors...
                    $scope.confirmingRegisteration = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'lab/validate-controller.js'
*/


/*
	AHS502 : Start of 'panel/account-controller..js'
*/

/*global app*/
/*global $*/

app.controller('PanelAccountController', ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

        // User data has been loaded !

    }
]);


/*
	AHS502 : End of 'panel/account-controller..js'
*/


/*
	AHS502 : Start of 'panel/balance-controller..js'
*/

/*global app*/
/*global $*/
/*global toPersianNumber*/

app.controller('PanelBalanceController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.c2cPayment = c2cPayment;
        $scope.zpPayment = zpPayment;

        $scope.balance = 125000;
        $scope.preparingPayment = false;

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('وضعیت حساب و تأمین اعتبار');

        //$scope.c2cReceiptCode
        //$scope.zpChargeAmount

        $scope.testCount = Math.floor($scope.balance / 1000);

        $scope.balanceForDisplay = toPersianNumber($scope.balance);
        $scope.testCountForDisplay = $scope.testCount >= 0 ?
            toPersianNumber($scope.testCount) : '–';

        if ($scope.testCount >= 200)
            $scope.balanceColor = 'green';
        else if ($scope.testCount >= 50)
            $scope.balanceColor = 'olive';
        else if ($scope.testCount >= 20)
            $scope.balanceColor = 'yellow';
        else if ($scope.testCount > 0)
            $scope.balanceColor = 'orange';
        else
            $scope.balanceColor = 'red';

        function c2cPayment() {
            //TODO: check for validity
            $scope.preparingPayment = true;
            $timeout(function() {
                $scope.preparingPayment = false;
                $scope.showMessage('درخواست شما ثبت شد',
                        'درخواست شما در اسرع وقت مورد بررسی قرار خواهد گرفت و حساب شما شارژ خواهد شد')
                    .then(function() {
                        $state.go('panel.home');
                    });
            }, 400);
        }

        function zpPayment() {
            // body...
        }

    }
]);


/*
	AHS502 : End of 'panel/balance-controller..js'
*/


/*
	AHS502 : Start of 'panel/history-controller.js'
*/

/*global app*/
/*global $*/

app.controller('PanelHistoryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', 'UserService', 'PostService',
    function($scope, $rootScope, $state, $stateParams, $timeout, $window, userService, postService) {

        $scope.postClicked = postClicked;

        $scope.maxCount = 500;

        var userInfo = userService.current(),
            userYear = userInfo.subscriptionDate.jYMD()[0],
            jYMD = (new Date()).jYMD(),
            currentYear = jYMD[0],
            currentMonth = jYMD[1];

        $scope.allYears = Array.range(currentYear, userYear);
        $scope.persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        var historyState = $rootScope.data.historyState = $rootScope.data.historyState || {};
        $scope.nationalCode = historyState.nationalCode;

        $scope.selectedYear = historyState.selectedYear || $scope.allYears[0];
        $scope.selectedMonthFrom = historyState.selectedMonthFrom || currentMonth;
        $scope.selectedMonthFromText = $scope.persianMonths[$scope.selectedMonthFrom - 1];
        $scope.selectedMonthTo = historyState.selectedMonthTo || currentMonth;
        $scope.selectedMonthToText = $scope.persianMonths[$scope.selectedMonthTo - 1];

        var postCache = $rootScope.data.postCache = $rootScope.data.postCache || [];
        $scope.posts = [];
        loadPosts(true).then(function() {
            $timeout(function() {
                $window.scrollTo($window.scrollX, historyState.scrollY);
            });
        });

        $scope.$watch('nationalCode', function() {
            historyState.nationalCode = $scope.nationalCode;
        });

        $window.addEventListener('scroll', windowScrollHandler);
        $scope.$on('$destroy', function() {
            $window.removeEventListener('scroll', windowScrollHandler);
        });

        function windowScrollHandler(event) {
            historyState.scrollY = $window.scrollY;
        }

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('سوابق نتایج ثبت شده');

        $('#select-year').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                $scope.selectedYear = historyState.selectedYear = value;
                loadPosts();
                // });
            }
        });

        $('#select-month-from').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthFrom = historyState.selectedMonthFrom = value;
                $scope.selectedMonthFromText = $scope.persianMonths[value - 1];
                var selectedMonthTo = $scope.selectedMonthTo > $scope.selectedMonthFrom ? $scope.selectedMonthTo : $scope.selectedMonthFrom;
                if (selectedMonthTo != $scope.selectedMonthTo)
                    $('#select-month-to').dropdown('set selected', $scope.selectedMonthTo = historyState.selectedMonthTo = selectedMonthTo);
                loadPosts();
                // });
            }
        });

        $('#select-month-to').dropdown({
            onChange: function(value, text) {
                // $timeout(function() {
                value = Number(value);
                $scope.selectedMonthTo = historyState.selectedMonthTo = value;
                $scope.selectedMonthToText = $scope.persianMonths[value - 1];
                var selectedMonthFrom = $scope.selectedMonthFrom < $scope.selectedMonthTo ? $scope.selectedMonthFrom : $scope.selectedMonthTo;
                if (selectedMonthFrom != $scope.selectedMonthFrom)
                    $('#select-month-from').dropdown('set selected', $scope.selectedMonthFrom = historyState.selectedMonthFrom = selectedMonthFrom);
                loadPosts();
                // });
            }
        });

        function loadPosts(forceReload) {
            $scope.setLoading(true);

            var yearPostCache = postCache[$scope.selectedYear] = postCache[$scope.selectedYear] || [],
                months = Array.range($scope.selectedMonthFrom, $scope.selectedMonthTo),
                filteredMonths = months.filter(function(month) {
                    return !yearPostCache[month];
                });
            if (forceReload && $scope.selectedYear == currentYear &&
                months.indexOf(currentMonth) >= 0 && filteredMonths.indexOf(currentMonth) < 0) {
                filteredMonths.push(currentMonth);
            }

            var promise;
            if (Object.keys(filteredMonths).length) {
                promise = postService.getPosts($scope.selectedYear, filteredMonths)
                    .catch(function(code) {
                        //TODO: Handle errors...
                        alert(code);
                    });
            }
            else {
                promise = Promise.resolve({});
            }

            return promise
                .then(function(postPacks) {
                    $scope.posts = [];
                    for (var month = 12; month >= 1; month--)
                        if (months.indexOf(month) >= 0) {
                            yearPostCache[month] = postPacks[$scope.selectedYear + '/' + month] || yearPostCache[month] || [];
                            $scope.posts = $scope.posts.concat(yearPostCache[month]);
                        }
                        // $scope.topPostIndex = 0;
                })
                .then(function() {
                    $scope.setLoading(false);
                });
        }

        function postClicked(post) {
            $rootScope.data.post = post;
            $state.go('panel.post');
        }

    }
]);


/*
	AHS502 : End of 'panel/history-controller.js'
*/


/*
	AHS502 : Start of 'panel/home-controller.js'
*/

/*global app*/

app.controller('PanelHomeController', ['$scope', '$rootScope', '$state', '$stateParams', 'UserService',
    function($scope, $rootScope, $state, $stateParams, userService) {

        $scope.setBackHandler($scope.menuHandlers.logout);

        var userInfo = userService.current();

        $scope.setPageTitle((userInfo && userInfo.labName) || ' ');

    }
]);


/*
	AHS502 : End of 'panel/home-controller.js'
*/


/*
	AHS502 : Start of 'panel/post-controller.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global persianDate*/

app.controller('PanelPostController', ['$scope', '$rootScope', '$state', '$stateParams', 'PostService',
    function($scope, $rootScope, $state, $stateParams, postService) {

        var postSummary = $rootScope.data.post;

        $scope.setBackHandler(function() {
            $state.go('panel.history');
        });

        $scope.setPageTitle('لطفاً کمی صبر کنید...');

        $scope.setLoading(true);
        postService.getOnePost(postSummary.nationalCode, postSummary.postCode)
            .then(function(post) {
                $scope.post = post;
                $scope.setPageTitle($scope.post.fullName);

                $scope.postDataForDisplay = [{
                    label: 'نام بیمار',
                    value: toPersianNumber(post.fullName)
                }, {
                    label: 'کد ملی بیمار',
                    value: toPersianNumber(post.nationalCode)
                }, {
                    label: 'تلفن های تماس بیمار',
                    value: toPersianNumber(post.numbers.join(' - '))
                }, {
                    label: 'آدرس پست الکترونیکی بیمار',
                    value: post.email
                }, {
                    label: 'شماره آزمایش',
                    value: toPersianNumber(post.postCode)
                }, {
                    label: 'تاریخ ارسال نتایج آزمایش',
                    value: persianDate(post.postDate).format('L')
                }, {
                    label: 'تعداد فایل های پیوست',
                    value: toPersianNumber(post.files.length)
                }];

            }, function(code) {
                //TODO: Handle errors...
                alert(code);
            })
            .then(function() {
                $scope.setLoading(false);
            });

    }
]);


/*
	AHS502 : End of 'panel/post-controller.js'
*/


/*
	AHS502 : Start of 'panel/send-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/
/*global iconJs*/

app.controller('PanelSendController', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$timeout', '$http', 'AnswerService',
    function($scope, $rootScope, $state, $stateParams, $window, $timeout, $http, answerService) {

        $scope.loadPatientInfo = loadPatientInfo;
        $scope.sendAnswer = sendAnswer;
        $scope.selectFilesDialog = selectFilesDialog;
        $scope.abortUpload = abortUpload;
        $scope.removeFile = removeFile;

        $scope.sendingAnswer = false;
        $scope.files = [];
        /* Each file has :
            status:         Preparing, Uploading, Uploded, Error, Aborting, Aborted, Removing, Removed
            name:           alpha.beta
            size:           1024
            type:           application/beta
            lastModified:   
            id:             4
            srcPreview:     pdf file
            xhr:            Uploading XHR for this file
            progress:       73
            serverName:     1234567
        */

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('ارسال نتایج');

        var inputFile = $window.document.getElementById('input-file');
        var dropZone = $window.document.getElementById('drop-zone');

        inputFile.addEventListener('change', inputFile_OnChange, false);
        $window.document.addEventListener("dragover", document_OnDragOver, false);
        $window.document.addEventListener("dragleave", document_OnDragLeave, false);
        $window.document.addEventListener("drop", document_OnDrag, false);
        $scope.$on('$destroy', function() {
            inputFile.removeEventListener('change', inputFile_OnChange);
            $window.document.removeEventListener("dragover", document_OnDragOver);
            $window.document.removeEventListener("dragleave", document_OnDragLeave);
            $window.document.removeEventListener("drop", document_OnDrag);
        });

        $scope.person = {};
        //$scope.person.nationalCode
        //$scope.person.fullName
        //$scope.person.mobilePhoneNumber
        //$scope.person.phoneNumber
        //$scope.person.extraPhoneNumber
        //$scope.person.email
        //$scope.notes

        $scope.vs = new ValidationSystem($scope.person)
            .field('nationalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.nationalCode()
            ])
            .field('fullName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(3)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('extraPhoneNumber', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('email', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.email()
            ]);

        var fileId = 0;

        function loadPatientInfo() {
            if (!$scope.vs.see('nationalCode')) return;

            if ($scope.person.fullName && $scope.person.mobilePhoneNumber && $scope.person.phoneNumber &&
                $scope.person.extraPhoneNumber && $scope.person.email) return;

            $scope.sendingAnswer = true;
            return answerService.patientInfo($scope.person.nationalCode)
                .then(function(patient) {

                    $scope.person.fullName = $scope.person.fullName || patient.fullName;
                    $scope.person.mobilePhoneNumber = $scope.person.mobilePhoneNumber || patient.numbers[0];
                    $scope.person.phoneNumber = $scope.person.phoneNumber || patient.numbers[1];
                    $scope.person.extraPhoneNumber = $scope.person.extraPhoneNumber || patient.numbers[2];
                    $scope.person.email = $scope.person.email || patient.email;

                    $scope.vs.check('fullName', 'mobilePhoneNumber', 'phoneNumber', 'extraPhoneNumber', 'email');

                }, function(code) {
                    // No problem!
                })
                .then(function() {
                    $scope.sendingAnswer = false;
                });
        }

        function sendAnswer() {
            if (!$scope.vs.validate()) return;

            $scope.sendingAnswer = true;
            answerService.send($scope.person, $scope.files, $scope.notes, $scope.vs.dictate)
                .then(function() {
                    $scope.sendingAnswer = false;
                    $scope.showMessage('ازسال موفقیت آمیز نتایج آزمایش',
                            'نتایج آزمایش ثبت شده و اطلاع رسانی لازم به بیمار صورت خواهد گرفت.')
                        .then(function() {
                            $state.go('panel.home');
                        });
                }, function(code) {
                    $scope.sendingAnswer = false;
                    alert(code);
                });
        }

        function selectFilesDialog() {
            inputFile.click();
        }

        function inputFile_OnChange(e) {
            var files = toArray(inputFile.files);
            inputFile.value = '';
            addNewFiles(files);
        }

        function processDragEvent(e) {
            dropZone.className = (e.type === 'dragover' && e.path.indexOf(dropZone) >= 0) ? 'drag-on' : '';
            e.stopPropagation();
            e.preventDefault();
        }

        function document_OnDragOver(e) {
            processDragEvent(e);
        }

        function document_OnDragLeave(e) {
            processDragEvent(e);
        }

        function document_OnDrag(e) {
            processDragEvent(e);
            if (e.path.indexOf(dropZone) >= 0) {
                var files = toArray(e.target.files || e.dataTransfer.files);
                addNewFiles(files);
            }
        }

        function addNewFiles(files) {

            // filter bad / duplicated / veryLarge files
            files = files.filter(function(file) {
                return file.size > 0 && file.size <= 10 * 1024 * 1024 && file.type != '' &&
                    $scope.files.filter(function(existingFile) {
                        return existingFile.name === file.name &&
                            existingFile.size === file.size &&
                            existingFile.type === file.type &&
                            existingFile.lastModified === file.lastModified;
                    }).length === 0;
            });

            // assign id & try to make a preview image for the file
            files.forEach(function(file) {
                file.id = fileId++;

                file.srcPreview = iconJs.file(file.name);

                if (file.type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $timeout(function() {
                            file.srcPreview = e.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });

            // start uploading the file
            files.forEach(uploadFile);

            // show all files
            $scope.files = $scope.files.concat(files);
            $scope.$$phase || $scope.$apply();
        }

        function uploadFile(file) {

            file.status = 'Preparing';

            var formData = new FormData();
            formData.append(file.name, file);

            var xhr = new XMLHttpRequest();
            file.xhr = xhr;
            xhr.open('post', '/answer/file/upload', true);
            xhr.setRequestHeader('X-Access-Token', $http.defaults.headers.common['X-Access-Token']);
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    file.progress = Math.floor((e.loaded / e.total) * 100);
                    $('#progress-' + file.id).progress({
                        percent: file.progress
                    });
                    $scope.$$phase || $scope.$apply();
                }
            };
            xhr.onerror = function(e) {
                file.status = 'Error';
                $scope.$$phase || $scope.$apply();
            };
            xhr.onabort = function(e) {
                (file.status === 'Aborting') && (file.status = 'Aborted');
                $scope.$$phase || $scope.$apply();
            };
            xhr.onload = function(e) {
                try {
                    if (e.currentTarget.status != 200)
                        throw e.currentTarget.response;
                    file.serverName = JSON.parse(e.currentTarget.response).filename;
                    file.status = 'Uploaded';
                }
                catch (err) {
                    file.status = 'Error';
                }
                $scope.$$phase || $scope.$apply();
            };

            file.status = 'Uploading';
            file.progress = 0;
            $('#progress-' + file.id).progress({
                percent: file.progress
            });
            $scope.$$phase || $scope.$apply();

            xhr.send(formData);
        }

        function abortUpload(file) {
            file.status = 'Aborting';
            file.xhr.abort();
        }

        function removeFile(file) {
            //TODO: lock this file interface
            abortUpload(file);
            file.status = 'Removing';
            $timeout(function() {
                file.status = 'Removed';
                $scope.files.splice($scope.files.indexOf(file), 1);
            } /*, 500*/ );
        }

        // convert object to array
        // e.g.: Convert FileList to Array of File
        function toArray(arrayLikeObject) {
            return Array.apply(null, {
                    length: arrayLikeObject.length
                }).map(Number.call, Number)
                .map(function(i) {
                    return arrayLikeObject[i];
                });
            /* or */
            // return Array.prototype.slice.call(arrayLikeObject);
        }

    }
]);


/*
	AHS502 : End of 'panel/send-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/confirm-controller.js'
*/

/*global app*/
/*global $*/
/*global ValidationSystem*/

app.controller('PanelAccountConfirmController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.confirm = confirm;

        $scope.confirming = false;

        $scope.action = $stateParams.action;

        $scope.setBackHandler(function() {
            if ($scope.action === 'change password')
                $state.go('panel.account.password');
            else if ($scope.action === 'edit account')
                $state.go('panel.account.edit');
            else
                $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تأیید عملیات');

        // $scope.verificationCode

        $scope.vs = new ValidationSystem($scope)
            .field('verificationCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.numberCode(4)
            ]);

        function confirm() {
            if (!$scope.vs.validate()) return;

            $scope.confirming = true;
            userService.editConfirm($rootScope.data.labData.username, $scope.verificationCode)
                .then(function() {
                    $scope.confirming = false;
                    $scope.showMessage('عملیات با موفقیت انجام شد',
                            $scope.action === 'change password' ?
                            'رمز عبور شما با موفقیت تغییر کرد' :
                            $scope.action === 'edit account' ?
                            'اصلاحات مورد نظر با موفقیت در سامانه ثبت شدند' : '')
                        .then(function() {
                            return $scope.refreshUserData()
                        })
                        .then(function() {
                            $state.go('panel.account.summary');
                        });;
                }, function(code) {
                    $scope.confirming = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/confirm-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/edit-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('PanelAccountEditController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.editAccount = editAccount;

        $scope.editingAccount = false;

        $scope.user = {
            labName: $rootScope.data.labData.labName,
            mobilePhoneNumber: $rootScope.data.labData.mobilePhoneNumber,
            phoneNumber: $rootScope.data.labData.phoneNumber,
            address: $rootScope.data.labData.address,
            postalCode: $rootScope.data.labData.postalCode,
            websiteAddress: $rootScope.data.labData.websiteAddress,
        };

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('ویرایش اطلاعات کاربری آزمایشگاه');

        $scope.vs = new ValidationSystem($scope.user)
            .field('labName', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(5)
            ])
            .field('mobilePhoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.mobilePhoneNumber()
            ])
            .field('phoneNumber', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.phoneNumber()
            ])
            .field('address', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(10)
            ])
            .field('postalCode', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.integer(),
                ValidationSystem.validators.length(10)
            ])
            .field('websiteAddress', [
                ValidationSystem.validators.notRequired(),
                ValidationSystem.validators.minLength(5),
                ValidationSystem.validators.url()
            ]);

        function editAccount() {
            if (!$scope.vs.validate()) return;

            $scope.editingAccount = true;
            userService.editAccount($scope.user, $scope.vs.dictate)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'edit account'
                    });
                    $scope.editingAccount = false;
                }, function(code) {
                    $scope.editingAccount = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/edit-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/password-controller.js'
*/

/*global app*/
/*global ValidationSystem*/

app.controller('PanelAccountPasswordController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'UserService',
    function($scope, $rootScope, $state, $stateParams, $timeout, userService) {

        $scope.changePassword = changePassword;

        $scope.changingPassword = false;

        $scope.setBackHandler(function() {
            $state.go('panel.account.summary');
        });

        $scope.setPageTitle('تغییر کلمه عبور');

        // $scope.oldPassword
        // $scope.newPassword
        // $scope.newPasswordAgain

        $scope.vs = new ValidationSystem($scope)
            .field('oldPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
            ])
            .field('newPassword', [
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPasswordAgain && $scope.newPasswordAgain != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ])
            .field('newPasswordAgain', [
                function(value) {
                    if (!$scope.newPassword) return true;
                },
                ValidationSystem.validators.notEmpty(),
                ValidationSystem.validators.minLength(4),
                function(value) {
                    if ($scope.newPassword != value) {
                        return 'کلمه های عبور وارد شده یکسان نیستند';
                    }
                }
            ]);

        function changePassword() {
            if (!$scope.vs.validate()) return;

            $scope.changingPassword = true;
            userService.editPassword($scope.oldPassword, $scope.newPassword, $scope.vs.dictate)
                .then(function() {
                    $state.go('panel.account.confirm', {
                        action: 'change password'
                    });
                    $scope.changingPassword = false;
                }, function(code) {
                    //TODO: handle error...
                    $scope.changingPassword = false;
                    alert(code);
                });
        }

    }
]);


/*
	AHS502 : End of 'panel/account/password-controller.js'
*/


/*
	AHS502 : Start of 'panel/account/summary-controller.js'
*/

/*global app*/
/*global toPersianNumber*/
/*global persianDate*/

app.controller('PanelAccountSummaryController', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout',
    function($scope, $rootScope, $state, $stateParams, $timeout) {

        $scope.editAccountData = editAccountData;
        $scope.changePassword = changePassword;

        $scope.userDataForDisplay = [{
            label: 'نام آزمایشگاه',
            value: toPersianNumber($rootScope.data.labData.labName)
        }, {
            label: 'تلفن همراه ارتباطی اصلی',
            value: toPersianNumber($rootScope.data.labData.mobilePhoneNumber)
        }, {
            label: 'تلفن تماس دوم',
            value: toPersianNumber($rootScope.data.labData.phoneNumber)
        }, {
            label: 'آدرس',
            value: toPersianNumber($rootScope.data.labData.address)
        }, {
            label: 'کد پستی',
            value: toPersianNumber($rootScope.data.labData.postalCode)
        }, {
            label: 'آدرس درگاه اینترنتی',
            value: $rootScope.data.labData.websiteAddress
        }, {
            label: 'نام کاربری',
            value: $rootScope.data.labData.username
        }, {
            label: 'تاریخ عضویت',
            value: persianDate($rootScope.data.labData.subscriptionDate).format('L')
        }];

        $scope.setBackHandler(function() {
            $state.go('panel.home');
        });

        $scope.setPageTitle('اطلاعات کاربری آزمایشگاه');

        function editAccountData() {
            $state.go('panel.account.edit');
        }

        function changePassword() {
            $state.go('panel.account.password');
        }

    }
]);


/*
	AHS502 : End of 'panel/account/summary-controller.js'
*/


/*
	AHS502 : Start of 'answer-controller.js'
*/

/*global app*/
/*global persianDate*/
/*global toPersianNumber*/
/*global Clipboard*/
/*global simpleQueryString*/

app.controller('AnswerController', ['$rootScope', '$scope', '$timeout', '$window', '$location', '$state', '$stateParams', 'HistoryService',
    function($rootScope, $scope, $timeout, $window, $location, $state, $stateParams, historyService) {

        $scope.nationalCode = $stateParams.p;
        $scope.postCode = $stateParams.n;

        var clipboard, url = $location.absUrl();
        url = url.slice(0, url.indexOf('#') + 2) + 'answer' + url.slice(url.indexOf('?'));

        var previousState = $stateParams.previousState,
            previousStateData = $stateParams.previousStateData;

        $scope.copySharedUrl = copySharedUrl;

        $scope.setBackHandler(function() {
            if (!$state.is('answer.post'))
                $state.go('answer.post');
            else {
                if (previousState === 'history') {
                    $rootScope.data.patientInfo = previousStateData.patientInfo;
                    $rootScope.data.history = previousStateData.history;
                    $state.go(previousState, {
                        nationalCode: $scope.nationalCode
                    });
                }
                else {
                    $state.go(previousState || 'home.find');
                }
            }
        });

        $scope.setMenuHandlers({
            viewFile: function() {
                $state.go('answer.post');
            },
            saveFile: function() {
                $state.go('answer.download');
            },
            shareFile: function() {
                clipboard = undefined;
                $scope.sharedUrl = url;
                $scope.sharingViaSms = 'sms:;?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد:\n\n' + url
                });
                $scope.sharingViaEmail = 'mailto:?&' + simpleQueryString.stringify({
                    body: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد:\n\n' + url,
                    subject: 'نتایج آزمایش ' + $scope.answer.patientName
                });
                $scope.sharingViaTelegram = 'https://telegram.me/share/url?' + simpleQueryString.stringify({
                    text: 'سلام!\n' + $scope.answer.patientName + ' می خواهد نتایج آزمایش خود را با شما به اشتراک بگذارد.',
                    url: url
                });
                $state.go('answer.share');
            },
            printFile: function() {
                // print file ...
            },
            goToLaboratory: function() {
                $state.go('answer.laboratory');
            },
            goToLaboratoryWebsite: function() {
                var url = $scope.answer && $scope.answer.lab && $scope.answer.lab.websiteAddress;
                if (url) {
                    if (url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0)
                        url = 'http://' + url;
                    window.open(url, '_blank').focus();
                }
            },
            labGetter: function() {
                return ($scope.answer && $scope.answer.lab) || {};
            },
        });

        $scope.setHeaderHandlers({
            paitentNameGetter: function() {
                return $scope.answer ? $scope.answer.patientName : ' ';
            }
        });

        $scope.setFooterHandlers({
            postDateGetter: function() {
                return $scope.answer ? persianDate($scope.answer.postDate).format('L') : ' ';
            },
            postCodeGetter: function() {
                return toPersianNumber($scope.postCode);
            }
        });

        // $('#answer-test-number').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        // $('#answer-laboratory-name').popup({
        //     inline: true,
        //     transition: 'scale'
        // });

        $state.go('answer.post');

        $scope.loading = true;
        historyService.loadAnswer($scope.nationalCode, $scope.postCode)
            .then(function(answer) {
                answer.files.forEach(function(file) {
                    file.url = '/answer/file/download?p=' + $scope.nationalCode +
                        '&n=' + $scope.postCode + '&f=' + file.serverName;
                    file.urlWithoutContentType = file.url + '&t=false'; // To prevent default downloader applications to interfere.
                    if (file.type.indexOf('image') >= 0) file.material = 'image';
                    else if (file.type === 'application/pdf') file.material = 'pdf';
                });
                $scope.answer = answer;
                $scope.loading = false;
            }, function(code) {
                //TODO: Handle errors...
                $scope.loading = false;
                alert(code);
            })
            .then(function() {
                $scope.answer = $scope.answer || {};
                $scope.answer.lab = $scope.answer.lab || {};
                $scope.labDataForDisplay = [{
                    label: 'نام آزمایشگاه',
                    value: toPersianNumber($scope.answer.lab.name)
                }, {
                    label: 'تلفن تماس',
                    value: !$scope.answer.lab ? '' : toPersianNumber($scope.answer.lab.mobilePhoneNumber + ' - ' + $scope.answer.lab.phoneNumber)
                }, {
                    label: 'آدرس',
                    value: toPersianNumber($scope.answer.lab.address)
                }, {
                    label: 'کد پستی',
                    value: toPersianNumber($scope.answer.lab.postalCode)
                }, {
                    label: 'آدرس درگاه اینترنتی',
                    value: $scope.answer.lab.websiteAddress
                }];
            });

        function copySharedUrl() {
            if (!clipboard) {
                clipboard = new Clipboard('#ja-shared-url-copy');
                clipboard.on('success', function(e) {
                    console.info('Success', e.action, e.text);
                    e.clearSelection();
                });
                clipboard.on('error', function(e) {
                    console.info('Error', e.action, e.text);
                });
            }
        }

    }
]);


/*
	AHS502 : End of 'answer-controller.js'
*/


/*
	AHS502 : Start of 'history-controller.js'
*/

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


/*
	AHS502 : End of 'history-controller.js'
*/


/*
	AHS502 : Start of 'home-controller.js'
*/

/*global app*/
/*global $*/

app.controller('HomeController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToHomeOtp: function() {
                $state.go('home.otp');
            },
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToHomeAbout: function() {
                $state.go('home.about', {
                    previousState: $state.current
                });
            },
            goToHomeContact: function() {
                $state.go('home.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

        $('#home-contact-us').popup({
            inline: true,
            transition: 'scale'
        });

    }
]);


/*
	AHS502 : End of 'home-controller.js'
*/


/*
	AHS502 : Start of 'lab-controller.js'
*/

/*global app*/
/*global $*/

app.controller('LabController', ['$scope', '$state',
    function($scope, $state) {

        $scope.setMenuHandlers({
            goToLabLogin: function() {
                $state.go('lab.login');
            },
            goToLabRegister: function() {
                $state.go('lab.register');
            },
            goToHomeFind: function() {
                $state.go('home.find');
            },
            goToLabAbout: function() {
                $state.go('lab.about', {
                    previousState: $state.current
                });
            },
            goToLabContact: function() {
                $state.go('lab.contact', {
                    previousState: $state.current
                });
            },
        });

        $scope.setHeaderHandlers(false);

        $scope.setFooterHandlers(true);

    }
]);


/*
	AHS502 : End of 'lab-controller.js'
*/


/*
	AHS502 : Start of 'master-controller.js'
*/

/*global app*/
/*global $*/

app.controller('MasterController', ['$scope', '$rootScope', '$q', '$window',
    function($scope, $rootScope, $q, $window) {

        // $scope.log = function() {
        //     console.log.apply(console, Array.prototype.slice.call(arguments));
        // };

        $scope.setBackHandler = setBackHandler;
        $scope.setMenuHandlers = setMenuHandlers;
        $scope.setHeaderHandlers = setHeaderHandlers;
        $scope.setFooterHandlers = setFooterHandlers;

        $scope.toggleMenu = toggleMenu;

        $scope.showMessage = showMessage;

        $scope.backHandler = undefined;
        $scope.menuHandlers = undefined;
        $scope.headerHandlers = undefined;
        $scope.footerHandlers = undefined;

        $scope.iconJs = $window.iconJs;

        function setBackHandler(handler) {
            $scope.backHandler = handler;
        }

        function setMenuHandlers(handlerObject) {
            $scope.menuHandlers = handlerObject;
        }

        function setHeaderHandlers(handlerObject) {
            $scope.headerHandlers = handlerObject;
        }

        function setFooterHandlers(handlerObject) {
            $scope.footerHandlers = handlerObject;
        }

        function toggleMenu() {
            $('#ja-sidebar-menu')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('setting', 'mobileTransition', 'overlay')
                .sidebar('toggle');
        }

        function showMessage(title, message, ok) {
            $scope.modal = {
                title: title,
                message: message,
                ok: ok || 'تأیید'
            };
            var defer = $q.defer();
            $('#ja-informer-modal')
                .modal({
                    onHide: function() {
                        defer.resolve();
                    }
                })
                .modal('show');
            return defer.promise;
        }

    }
]);


/*
	AHS502 : End of 'master-controller.js'
*/


/*
	AHS502 : Start of 'panel-controller.js'
*/

/*global app*/

app.controller('PanelController', ['$scope', '$rootScope', '$state', '$stateParams',
    '$timeout', '$interval', 'UserService',
    function($scope, $rootScope, $state, $stateParams,
        $timeout, $interval, userService) {

        $scope.setLoading = setLoading;
        $scope.setPageTitle = setPageTitle;
        $scope.refreshUserData = refreshUserDataProvider(false);

        $scope.loading = $scope.loadingMessage = false;

        // Refresh user info every 1 minute
        var refreshUserDataPromise = $interval(refreshUserDataProvider(true), 60000);
        $scope.$on('$distroy', function() {
            $interval.cancel(refreshUserDataPromise);
        });

        $scope.setMenuHandlers({
            goToMainPage: function() {
                $state.go('panel.home');
            },
            goToSendResults: function() {
                $state.go('panel.send');
            },
            goToResultsHistory: function() {
                $state.go('panel.history');
            },
            goToChargeAccount: function() {
                $state.go('panel.balance');
            },
            goToUserAccount: function() {
                $state.go('panel.account.summary');
            },
            logout: function() {
                setLoading(true);
                return userService.logout().then(function() {
                    setLoading(false);
                    $state.go('lab.login');
                });
            }
        });

        var headerHandlers = {
            pageTitle: ''
        };

        $scope.setHeaderHandlers(headerHandlers);

        $scope.setFooterHandlers(false);

        function setLoading(loading) {
            $timeout(function() {
                $scope.loading = loading;
                $scope.loadingMessage = false;
                loading && $timeout(function() {
                    $scope.loadingMessage = true;
                }, 1500);
            });
        }

        function setPageTitle(title) {
            headerHandlers.pageTitle = title;
        }

        function refreshUserDataProvider(silent) {
            return function() {
                silent || $scope.setLoading(true);
                return userService.refresh().then(function(userInfo) {
                    $rootScope.data.labData = userInfo;
                    silent || $scope.setLoading(false);
                });
            };
        }

    }
]);


/*
	AHS502 : End of 'panel-controller.js'
*/


/*
	AHS502 : Start of 'pdf.js'
*/

/*global angular*/
/*global app*/
/*global resourceLoader*/
/*global PDFJS*/

app.directive('pdf', ['$timeout', '$window', function($timeout, $window) {
    return {
        restrict: 'E',
        replace: true,

        scope: {
            src: '@ngSrc',
            width: '@'
        },

        template: [
            '<div>',
            '    <p class="nazanin ja-rtl ja-align-right" ng-show="loading">',
            '        در حال بارگذاری اطلاعات، لطفاً کمی صبر کنید...',
            '    </p>',
            '    <div ng-hide="loading" class="pdf-canvas-container"></div>',
            '</div>',
        ].join(''),

        link: function(scope, instanceElement, instanceAttributes) {
            if (!scope.src) return;

            var container = angular.element(instanceElement[0].querySelector('.pdf-canvas-container'));
            container.css('width', scope.width || '100%');
            var allPages = null,
                desiredWidth;

            scope.loading = true;
            resourceLoader.js('/dist/lib/pdf.min.js', function() {
                scope.loading = !!PDFJS;
                PDFJS && PDFJS.getDocument(scope.src).then(function(pdf) {
                    return Promise.all(Array.range(1, pdf.numPages).map(function(pageNumber) {
                        return pdf.getPage(pageNumber);
                    }));
                }).then(function(pages) {
                    allPages = pages;
                    renderPages();
                }).catch(function(err) {
                    console.error(err);
                }).then(function() {
                    $timeout(function() {
                        scope.loading = false;
                    });
                });

            });

            $window.addEventListener('resize', resizeEventHandler);
            scope.$on('$destroy', function() {
                $window.removeEventListener('resize', resizeEventHandler);
            });

            function resizeEventHandler(event) {
                if (desiredWidth != calculateDesiredWidth()) renderPages();
            }

            function renderPages() {
                if (!allPages) return;
                container.empty();
                desiredWidth = calculateDesiredWidth();
                var canvasArray = allPages.map(function(page) {
                    var viewport = page.getViewport(1);
                    viewport = page.getViewport(desiredWidth / viewport.width);
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                    return canvas;
                });
                for (var i = 0; i < canvasArray.length; i++) {
                    container.append(canvasArray[i]);
                }
            }

            function calculateDesiredWidth() {
                return instanceElement[0].offsetWidth || instanceElement[0].clientWidth;
            }

        },
    };
}]);


/*
	AHS502 : End of 'pdf.js'
*/


/*
	AHS502 : Start of 'empty-check.js'
*/

/*global app*/

app.filter('emptyCheck', function() {
    return function(input, defaultValue) {
        if (input === undefined || input === null || input === '')
            return defaultValue || '\u2013';
        else
            return String(input);
    }
});

/*
	AHS502 : End of 'empty-check.js'
*/


/*
	AHS502 : Start of 'to-persian-date.js'
*/

/*global app*/
/*global persianDate*/

app.filter('toPersianDate', function() {
    return function(input, format) {
        return persianDate(new Date(input)).format(format || 'L');
    }
});

/*
	AHS502 : End of 'to-persian-date.js'
*/


/*
	AHS502 : Start of 'to-persian-number.js'
*/

/*global app*/
/*global toPersianNumber*/

app.filter('toPersianNumber', function() {
    return function(input) {
        return toPersianNumber(String(input));
    }
});

/*
	AHS502 : End of 'to-persian-number.js'
*/
