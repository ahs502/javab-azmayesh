var kfs = require("./kfs");
var fs = require("fs-extra");

////////////////////////////////////////////////////////////////////////////////

module.exports = {

    resEndByCode, // (res, code, data)

    generateIdSync, // ('counter/name') => 123
    generateId, // ('counter/name') => Promise->123
    generateRandomCode, // (6) => 108273    // (4, ['7355', '6038']) => '9351'

    moveFile, // ('path/to/a/file', 'path/to/a/folder') => Promise

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
            counters[counter] = kfs.counters[counter] || 0;
        }
        catch (err) {
            counters[counter] = 0;
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
        counters[counter] = count = (count || 0) + 1;
        return kfs('counter/' + counter, count).then(function() {
            return count;
        });
    }).catch(function(error) {
        return counters[counter] = 1;
    });
}

function generateRandomCode(numberOfDigits, notAllowedCodes) {
    var code;
    notAllowedCodes = notAllowedCodes || [];
    do {
        code = "";
        for (var i = 0; i < numberOfDigits; i += 2)
            code += Math.floor(Math.random() * 90) + 10;
        code = code.slice(0, numberOfDigits);
    } while (notAllowedCodes.indexOf(code) >= 0);
    //console.log('#######################', code, '#######################'); //TODO: remove this line later.
    return code;
}

function moveFile(src, des) {
    return new Promise(function(resolve, reject) {
        fs.move(src, des, {
            clobber: true
        }, function(error) {
            if (error) reject(error);
            else resolve();
        });
    });
}
