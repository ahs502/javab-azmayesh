var path = require("path");

////////////////////////////////////////////////////////////////////////////////

var config = {

    /*-------------------------------------*/
    env: /*--------------------------------*/ ['dev', 'test', 'prod'][0],
    /*-------------------------------------*/
    storage_path: /*-----------------------*/ path.join(__dirname, '_data'),
    upload_path: /*------------------------*/ path.join(__dirname, '_file'),
    /*-------------------------------------*/
    confirmation_expires_after: /*---------*/ 10, // Hours
    user_access_key_expires_after: /*------*/ 24, // Hours
    /*-------------------------------------*/
    cryptr_key: /*-------------------------*/ '0123456789InTheNameOfGod9876543210',
    /*-------------------------------------*/
    nik_sms_username: /*-------------------*/ '09337770720',
    nik_sms_password: /*-------------------*/ 'nspassword',
    nik_sms_main_number: /*----------------*/ '50004545454545',
    /*-------------------------------------*/
    google_recaptcha: /*-------------------*/ true,
    google_recaptcha_secret_key: /*--------*/ '6LexDAwUAAAAAP7U7z8YEIcI006D8KGajx3WtR31',
    google_recaptcha_public_key: /*--------*/ '6LexDAwUAAAAAPXalUBl6eGUWa3dz7PrXXa-a7EG',
    /*-------------------------------------*/

    client_config: [
        'env',
        'google_recaptcha',
        'google_recaptcha_public_key',
    ]

};

////////////////////////////////////////////////////////////////////////////////

var clientConfigKeys = config.client_config;
config.client_config = {};
clientConfigKeys.forEach(key => config.client_config[key] = config[key]);

////////////////////////////////////////////////////////////////////////////////

module.exports = config;
