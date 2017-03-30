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