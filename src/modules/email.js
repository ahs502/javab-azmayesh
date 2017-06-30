var config = require("../../config");

var nodemailer = require('nodemailer');

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    send,
    sendHtml
};

////////////////////////////////////////////////////////////////////////////////

var transporter = nodemailer.createTransport({
    service: config.email_transporter_service,
    auth: {
        user: config.email_transporter_username,
        pass: config.email_transporter_password
    }
});

var mailOptionsFrom = '"' + config.email_sender_display_name +
    '" <' + config.email_transporter_username + '>';

function send(to, subject, text, html) {
    return new Promise(function(resolve, reject) {
        if (!to || !subject || !(text || html))
            return reject('[AHS502] Null input arguments.');

        var mailOptions = {
            from: mailOptionsFrom,
            to,
            subject
        };
        if (text) mailOptions.text = text;
        if (html) mailOptions.html = html;

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
}

function sendHtml(to, subject, html) {
    return send(to, subject, null, html);
}
