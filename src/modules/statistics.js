var config = require("../../config");
var kfs = require("./kfs");

var statistics = {
    dailyCount,
};

function dailyCount(subject) {
    if (!config.enable_statistics) return;

    var ymd = (new Date()).jYMD();
    var yKey = 'statistics/' + ymd[0],
        mKey = 'statistics/=' + ymd[0] + '/' + ymd[1],
        dKey = 'statistics/=' + ymd[0] + '/=' + ymd[1] + '/' + ymd[2];

    return Promise.all([
            kfs(yKey),
            kfs(mKey),
            kfs(dKey)
        ])
        .then(function(data) {
            var y = data[0] || {},
                m = data[1] || {},
                d = data[2] || {};

            y[subject] = (y[subject] || 0) + 1;
            m[subject] = (m[subject] || 0) + 1;
            d[subject] = (d[subject] || 0) + 1;

            return Promise.all([
                kfs(yKey, y),
                kfs(mKey, m),
                kfs(dKey, d)
            ]);
        });
}

module.exports = statistics;