var path = require("path");
var autoLoad = require("auto-load");

module.exports = autoLoad(path.join(__dirname, 'modules'));
