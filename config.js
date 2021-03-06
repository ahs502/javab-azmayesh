var path = require("path");

////////////////////////////////////////////////////////////////////////////////

var config = {

    /*-------------------------------------*/
    env: /*--------------------------------*/ ["dev", "test", "demo", "live"][0],
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
    long_user_access_key_expires_after: /*-*/ 24, // Hours
    /*-------------------------------------*/
    cryptr_key: /*-------------------------*/ "- dev 1234567890 cryptr key -",
    /*-------------------------------------*/
    nik_sms_username: /*-------------------*/ "09337770720",
    nik_sms_password: /*-------------------*/ "nspassword",
    nik_sms_main_number: /*----------------*/ "50004545454545",
    /*-------------------------------------*/
    email_transporter_service: /*----------*/ 'gmail',
    email_transporter_username: /*---------*/ 'ahs502@gmail.com',
    email_transporter_password: /*---------*/ 'gpassword',
    email_sender_display_name: /*----------*/ "(DEV) Javab Azmayesh [DO NOT REPLY]",
    /*-------------------------------------*/
    telegram_bot_name: /*------------------*/ "@JaDevBot",
    telegram_bot_api_token: /*-------------*/ "419656073:AAE-Hv1imGLchkIlHWeGq2GMWeJisXxEb5A",
    /*-------------------------------------*/
    google_recaptcha: /*-------------------*/ false,
    google_recaptcha_secret_key: /*--------*/ "",
    google_recaptcha_public_key: /*--------*/ "",
    /*-------------------------------------*/
    enable_statistics: /*------------------*/ true,
    enable_sms_limits: /*------------------*/ false, // See: ./src/modules/sms.js >> smsLimits
    /*-------------------------------------*/
    zarinpal_merchant_code: /*-------------*/ "7b0be51c-6f9c-11e7-8b69-005056a205be", // Empty to disable
    /*-------------------------------------*/
    cost_profiles: /*----------------------*/ [0, 1000, 2000, 3000], // What the patient pays in tomans
    cost_minimum_charge: /*----------------*/ 1000, // Tomans
    cost_paper_delivery: /*----------------*/ 5000, // Tomans
    /*-------------------------------------*/
    minified_app_sources: /*---------------*/ false,
    developer_modal: /*--------------------*/ true,
    /*-------------------------------------*/

    client_config: [
        'env',
        'google_recaptcha',
        'google_recaptcha_public_key',
        'cost_profiles',
        'cost_minimum_charge',
        'cost_paper_delivery',
        'developer_modal',
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
