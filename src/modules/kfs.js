var keyFileStorage = require("key-file-storage");

var kfs = keyFileStorage('./data', false);

module.exports = kfs;
