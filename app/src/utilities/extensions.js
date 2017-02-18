////////////////////////////////////////////////////////////////////////////////

Date.prototype.toLocalString = toLocalString;

Date.parse = parse();

String.prototype.toDate = toDate;
String.prototype.toPhoneNumber = toPhoneNumber;
String.prototype.isMobileNumber = isMobileNumber;

////////////////////////////////////////////////////////////////////////////////

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

function parse() {
    var Date_parse = Date.parse;
    return function(str) {
        if (typeof str === 'string' && str.slice(-6, -5) === 'O') {
            var gmt = str.slice(-5);
            var offset = Number(gmt.slice(1, 3)) * 60 + Number(gmt.slice(3, 5));
            if (gmt.slice(0, 1) === '-') offset = -offset;
            return Date_parse(str.slice(0, -6) + 'Z') - offset;
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
