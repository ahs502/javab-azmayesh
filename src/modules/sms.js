var config = require("../../config");

var utils = require("./utils");
var kfs = require("./kfs");
var nikSms = require("./nik-sms");

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    send: {
        validationCodeForRegisteration,
        validationCodeForUpdatingAccount,
        passwordRecovery,
        postAnswer,
        otpGenerated,
    }
};

////////////////////////////////////////////////////////////////////////////////

function validationCodeForRegisteration(relatedKeys, user, validationCode) {
    var numbers = [user.mobilePhoneNumber];
    var message = "" + user.labName + "\nسلام!\n" +
        "به سامانه جواب آزمایش خوش آمدید.\n" +
        "کد اعتبار سنجی: " + validationCode;
    return sendSms('vericodeusrreg', numbers, message, {
        relatedKeys,
        user,
        validationCode
    });
}

function validationCodeForUpdatingAccount(relatedKeys, newUser, validationCode) {
    var numbers = [newUser.mobilePhoneNumber];
    var message = "کاربر گرامی " + newUser.username + "\nسلام!\n" +
        "برای تکمیل فرآیند بروزرسانی اطلاعات خود از کد زیر استفاده کنید:\n" +
        "کد اعتبار سنجی: " + validationCode;
    return sendSms('vericodeusrupd', numbers, message, {
        relatedKeys,
        newUser,
        validationCode
    });
}

function passwordRecovery(relatedKeys, user) {
    var numbers = [user.mobilePhoneNumber];
    var message = "کاربر گرامی " + user.username + "\nسلام!\n" +
        "کلمه عبور شما این است:\n" +
        user.password;
    return sendSms('passrecovery', numbers, message, {
        relatedKeys,
        user
    });
}

function postAnswer(relatedKeys, patient, post) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "نتایج آزمایش شما هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس است.\n" +
        "شماره آزمایش: " + post.postCode + "\n" /*+ post.labName*/ +
        "می توانید از طریق لینک زیر نتایج آزمایش خو را مشاهده کنید:\n" +
        'http://javabazmayesh.ir/#/answer?p=' + patient.nationalCode + '&n=' + post.postCode;
    return sendSms('postans', numbers, message, {
        relatedKeys,
        patient,
        post
    });
}

function otpGenerated(relatedKeys, otp, patient) {
    var numbers = [otp.mobilePhoneNumber];
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "رمز یکبار مصرف: " + otp.otp;
    return sendSms('otp', numbers, message, {
        relatedKeys,
        otp,
        patient
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
                //TODO: Implement message re-sending and restriction mechanism.
            });
        });
    });
}
