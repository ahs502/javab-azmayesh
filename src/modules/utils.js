var kfs = require("./kfs");

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    resEndByCode,
    generateIdSync,
    generateId,
};

////////////////////////////////////////////////////////////////////////////////

function resEndByCode(res, code, data) {
    data = data || {};
    data.code = code;
    return res.status(200).json(data).end();
}

var counters = {};

function generateIdSync(counter) {
    if (!counters[counter]) {
        try {
            counters[counter] = kfs.counters[counter] || 1;
        }
        catch (err) {
            counters[counter] = 1;
        }
    }
    counters[counter]++;
    try {
        kfs.counters[counter] = counters[counter];
    }
    catch (err) {}
    return counters[counter];
}

function generateId(counter) {
    var promise;
    if (!counters[counter]) promise = kfs('counter/' + counter);
    else promise = Promise.resolve(counters[counter]);
    return promise.then(function(count) {
        counters[counter] = count = (count || 1) + 1;
        return kfs('counter/' + counter, count).then(function() {
            return count;
        });
    }).catch(function(error) {
        return counters[counter] = 1;
    });
}
