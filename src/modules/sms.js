var config = require("../../config");

var utils = require("./utils");
var kfs = require("./kfs");
var nikSms = require("./nik-sms");

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    send: {
        validationCodeForRegisteration,
        postAnswer,
    }
};

////////////////////////////////////////////////////////////////////////////////

function validationCodeForRegisteration(relatedKeys, user, validationCode) {
    var numbers = [user.mobilePhoneNumber];
    var message = "" + user.labName + "\nسلام!\n" +
        "به سامانه جواب آزمایش خوش آمدید.\n" +
        "کد اعتبار سنجی: " + validationCode;
    return sendSms('verification code', numbers, message, {
        relatedKeys,
        user,
        validationCode
    });
}

function postAnswer(relatedKeys, patient, post) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "نتایج آزمایش شما هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس است.\n" +
        "شماره آزمایش: " + post.postCode + "\n" + post.labName;
    return sendSms('post', numbers, message, {
        relatedKeys,
        patient,
        post
    });
}

////////////////////////////////////////////////////////////////////////////////

function sendSms(type, numbers, message, data) {
    return utils.generateId('sms').then(function(smsId) {
        smsId = ('0000000000' + smsId).slice(-10);
        data.type = type;
        data.numbers = numbers;
        data.message = message;
        var smsKey = 'sms/' + smsId.slice(0, -2) + '/' + smsId.slice(-2);
        return kfs(smsKey, data).then(function() {
            var number = numbers.filter(number => number.isMobileNumber())[0];
            return nikSms.sendSms(config.nik_sms_main_number, number, message, smsId).then(function(result) {
                //TODO: Implement message re-sending mechanism.
            });
        });
    });
}
