var path = require("path");
var autoLoad = require("auto-load");

require("colors");

module.exports = autoLoad(path.join(__dirname, 'modules'));
