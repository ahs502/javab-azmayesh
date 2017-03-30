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