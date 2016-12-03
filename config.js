var path = require("path");

var config = {

    storage_path: path.join(__dirname, '_data'),
    upload_temporary_path: path.join(__dirname, '_upload_temp'),

    confirmation_expires_after: 10, // Hours
    access_key_expires_after: 20, // Hours

};

module.exports = config;
