var config = require("../../config");

var utils = require("./utils");
var kfs = require("./kfs");
var nikSms = require("./nik-sms");

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    allowanceCheck,
    send: {
        validationCodeForRegisteration,
        validationCodeForUpdatingAccount,
        passwordRecovery,
        postAnswer,
        otpGenerated,
    },
    simplySendSms
};

////////////////////////////////////////////////////////////////////////////////

// SMS limit on a mobile phon number for a SMS type, maximum (n) messages per (p) hours:
//     "type": n // p = 24 hours
//  or "type": [n, p]
var smsLimits = {
        "sendans": 3,
        "otp": [5, 3],
        "vericodeusrupd": 5,
        "passrecovery": [1, 72],
    },
    maxCount = 0;
for (let type in smsLimits) {
    if (typeof smsLimits[type] === 'number') smsLimits[type] = [smsLimits[type], 24];
    maxCount = maxCount > smsLimits[type][0] ? maxCount : smsLimits[type][0];
}

function allowanceCheck(numbers, type) {
    if (!config.enable_sms_limits) {
        return Promise.resolve();
    }
    var mobilePhoneNumber = !Array.isArray(numbers) ? numbers :
        numbers.find(number => number.isMobileNumber());
    var key = 'sms-counts/' + mobilePhoneNumber;
    return kfs(key)
        .then(function(stat) {
            stat = stat || {};
            stat[type] = stat[type] || [];
            let now = Date.now(),
                count = (smsLimits[type] || [])[0] || (maxCount + 100),
                index = stat[type].length - count,
                then = stat[type][index],
                period = ((smsLimits[type] || [])[1] || 24) * 3600000,
                allowed = !then || then < now - period;
            if (allowed) stat[type] = stat[type].concat(now).slice(-maxCount - 1);
            else return Promise.reject();
            kfs(key, stat);
        }, function() {
            new kfs(key);
        });
}

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
        "می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:\n" +
        config.protocol + '://' + config.domain + '/#/answer?p=' + patient.nationalCode + '&n=' + post.postCode;
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
            var number = numbers.find(number => number.isMobileNumber());
            return nikSms.sendSms(config.nik_sms_main_number, number, message, smsId).then(function(result) {
                //TODO: Implement message re-sending and restriction mechanism.
            });
        });
    });
}

function simplySendSms(phoneNumber, message) {
    return nikSms.sendSms(config.nik_sms_main_number, phoneNumber, message);
}
