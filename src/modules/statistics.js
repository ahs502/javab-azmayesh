var path = require("path");
var keyFileStorage = require("key-file-storage");

var config = require("../../config");

var kfsStatistics = keyFileStorage(path.join(config.storage_path, 'statistics'), 3);

var statistics = {
    dailyCount,
};

function dailyCount(subject) {
    if (!config.enable_statistics) return;

    var ymd = (new Date()).jYMD();
    var yKey =  ymd[0],
        mKey = '=' + ymd[0] + '/' + ymd[1],
        dKey = '=' + ymd[0] + '/=' + ymd[1] + '/' + ymd[2];

    return Promise.all([
            kfsStatistics(yKey),
            kfsStatistics(mKey),
            kfsStatistics(dKey)
        ])
        .then(function(data) {
            var y = data[0] || {},
                m = data[1] || {},
                d = data[2] || {};

            y[subject] = (y[subject] || 0) + 1;
            m[subject] = (m[subject] || 0) + 1;
            d[subject] = (d[subject] || 0) + 1;

            return Promise.all([
                kfsStatistics(yKey, y),
                kfsStatistics(mKey, m),
                kfsStatistics(dKey, d)
            ]);
        });
}

module.exports = statistics;