var path = require("path");

////////////////////////////////////////////////////////////////////////////////

var config = {

    /*-------------------------------------*/
    env: /*--------------------------------*/ ["dev", "test", "demo", "prod"][0],
    /*-------------------------------------*/
    port: /*-------------------------------*/ 50302,
    domain: /*-----------------------------*/ "dev.javabazmayesh.ir",
    /*-------------------------------------*/
    protocol: /*---------------------------*/ ["http", "https"][0],
    private_key_path: /*-------------------*/ "",
    certificate_path: /*-------------------*/ "",
    /*-------------------------------------*/
    storage_path: /*-----------------------*/ path.join(__dirname, "_data"),
    upload_path: /*------------------------*/ path.join(__dirname, "_file"),
    /*-------------------------------------*/
    confirmation_expires_after: /*---------*/ 1, // Hours
    user_access_key_expires_after: /*------*/ 1, // Hours
    /*-------------------------------------*/
    cryptr_key: /*-------------------------*/ "- dev 1234567890 cryptr key -",
    /*-------------------------------------*/
    nik_sms_username: /*-------------------*/ "09337770720",
    nik_sms_password: /*-------------------*/ "nspassword",
    nik_sms_main_number: /*----------------*/ "50004545454545",
    /*-------------------------------------*/
    google_recaptcha: /*-------------------*/ false,
    google_recaptcha_secret_key: /*--------*/ "",
    google_recaptcha_public_key: /*--------*/ "",
    /*-------------------------------------*/
    enable_statistics: /*------------------*/ false,
    /*-------------------------------------*/

    client_config: [
        'env',
        'google_recaptcha',
        'google_recaptcha_public_key',
    ]

};

////////////////////////////////////////////////////////////////////////////////

(function(mainConfig) {
    /* COMMENT START */
    var config = {};
    /* COMMENT END */
    /* ENVIRONMENT SPECIFIC CONFIG */
    for (var key in config)
        mainConfig[key] = config[key];
})(config);

////////////////////////////////////////////////////////////////////////////////

var clientConfigKeys = config.client_config;
config.client_config = {};
clientConfigKeys.forEach(key => config.client_config[key] = config[key]);

////////////////////////////////////////////////////////////////////////////////

module.exports = config;
