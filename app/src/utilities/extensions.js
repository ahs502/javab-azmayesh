var global;
try {
    global = Function('return this')() || (502, eval)('this');
}
catch (e) {
    global = window;
}

////////////////////////////////////////////////////////////////////////////////

global.global = global;
global.gregorianToJalali = gregorianToJalali; // ([2017, 3, 27]) => [1396, 1, 7]
global.jalaliToGregorian = jalaliToGregorian; // ([1396, 1, 7]) => [2017, 3, 27]

Date.prototype.gYMD = gYMD; // () => [2017, 3, 27]
Date.prototype.jYMD = jYMD; // () => [1396, 1, 7]
Date.prototype.isValid = isValid; // (new Date()).isValid() === true
Date.prototype.toLocalString = toLocalString; // () => "2017-03-27T18:02:34.591O+0330"    // (true) => "2017-03-27T18:02:34.591" (non-convertible to Date again)

Date.parse = parseMaker(); // (All dates even LocalStringified) => 1490540446225

String.prototype.toDate = toDate; // (All stringified dates even LocalStringified) => Date
String.prototype.toPhoneNumber = toPhoneNumber; // ('  +981x23g 45 pp # ') => 012345
String.prototype.isMobileNumber = isMobileNumber; // ('+989125557685') => true

////////////////////////////////////////////////////////////////////////////////

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

function gYMD() {
    var y = this.getFullYear(),
        m = this.getMonth() + 1,
        d = this.getDate();
    return [y, m, d];
}

function jYMD() {
    return gregorianToJalali(this.gYMD());
}

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
