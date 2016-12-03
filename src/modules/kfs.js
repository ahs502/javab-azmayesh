var config = require("../../config");

var keyFileStorage = require("key-file-storage");

var kfs = keyFileStorage(config.storage_path, false);

module.exports = kfs;
