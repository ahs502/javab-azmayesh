/*global toPersianNumber*/

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
        updatePatient,
        postAnswer,
        deleteAnswer,
        updateAnswer,
        otpGenerated,
        newUserApproved,
        newUserDeclined,
        c2cReceiptCodeApproved,
        c2cReceiptCodeDeclined,
        respondFeedback,
    },
    simplySendSms,
    status
};

////////////////////////////////////////////////////////////////////////////////

// SMS limit on a mobile phone number for a SMS type, maximum (n) messages per (p) hours:
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
    var numbers = [user.mobilePhoneNumber, user.phoneNumber];
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
    var numbers = [newUser.mobilePhoneNumber, newUser.phoneNumber];
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
    var numbers = [user.mobilePhoneNumber, user.phoneNumber];
    var message = "کاربر گرامی " + user.username + "\nسلام!\n" +
        "کلمه عبور شما این است:\n" +
        user.password;
    return sendSms('passrecovery', numbers, message, {
        relatedKeys,
        user
    });
}

function updatePatient(relatedKeys, patient, telegramContactExists) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "اطلاعات شما در سامانه جواب آزمایش به روز رسانی شدند.";
    if (!telegramContactExists) {
        message +=
            "\nدر صورتی که تمایل دارید هنگام آماده شدن جواب آزمایشتان از طریق تلگرام نیز مطلع شوید، به روبات تلگرامی\n" +
            config.telegram_bot_name + "\n متصل شوید و دکمه Start را بزنید.\n" +
            "برای این منظور می توانید از لینک زیر استفاده کنید:\n" +
            'https://t.me/' + config.telegram_bot_name.slice(1);
    }
    return sendSms('updatepatient', numbers, message, {
        relatedKeys,
        patient
    });
}

function postAnswer(relatedKeys, patient, post, url) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "نتایج آزمایش شما هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.\n" +
        "شماره آزمایش: " + post.postCode + "\n" /*+ post.labName*/ +
        "می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:\n" + url;
    return sendSms('postans', numbers, message, {
        relatedKeys,
        patient,
        post,
        url
    });
}

function deleteAnswer(relatedKeys, patient, postCode) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "نتایج آزمایش شما به شماره آزمایش " + postCode + " توسط آزمایشگاه از سامانه حذف شدند.";
    return sendSms('deleteans', numbers, message, {
        relatedKeys,
        patient,
        postCode
    });
}

function updateAnswer(relatedKeys, patient, post, url) {
    var numbers = patient.numbers;
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "نتایج آزمایش شما به روز رسانی شدند و هم اکنون در سامانه جواب آزمایش به آدرس javabazmayesh.ir در دسترس هستند.\n" +
        "شماره آزمایش: " + post.postCode + "\n" /*+ post.labName*/ +
        "می توانید از طریق لینک زیر نتایج آزمایش خود را مشاهده کنید:\n" + url;
    return sendSms('updateans', numbers, message, {
        relatedKeys,
        patient,
        post,
        url
    });
}

function otpGenerated(relatedKeys, otp, patient) {
    var numbers = [otp.mobilePhoneNumber].concat(patient.numbers);
    var message = "" + patient.fullName + " عزیز، سلام!\n" +
        "رمز یکبار مصرف: " + otp.otp;
    return sendSms('otp', numbers, message, {
        relatedKeys,
        otp,
        patient
    });
}

function newUserApproved(relatedKeys, user) {
    var numbers = [user.mobilePhoneNumber];
    var message = user.labName + "،\nحساب کاربری شما تأیید و فعال شد!";
    if (user.balance) {
        message += "\nبرای حساب شما " + toPersianNumber(user.balance) + " تومان شارژ اولیه در نظر گرفته شده است.";
    }
    return sendSms('approvesignup', numbers, message, {
        relatedKeys,
        user
    });
}

function newUserDeclined(relatedKeys, user) {
    var numbers = [user.mobilePhoneNumber];
    var message = user.labName + "،\nمتأسفانه عضویت شما در سامانه JavabAzmayesh.ir تأیید نشد.\n" +
        "جهت اطلاعات بیشتر می توانید با ما تماس بگیرید.";
    return sendSms('declinesignup', numbers, message, {
        relatedKeys,
        user
    });
}

function c2cReceiptCodeApproved(relatedKeys, user, c2cReceipt, amount) {
    var numbers = [user.mobilePhoneNumber];
    var message = user.labName + "،\nکُد رهگیری ثبت شده شما به شماره " +
        toPersianNumber(c2cReceipt.c2cReceiptCode) + " تأیید شد و مبلغ " +
        toPersianNumber(amount) + " تومان به حساب شما واریز شد. \nشارژ باقیمانده:\n" +
        toPersianNumber(user.balance) + " تومان";
    return sendSms('approvec2c', numbers, message, {
        relatedKeys,
        user,
        c2cReceipt,
        amount
    });
}

function c2cReceiptCodeDeclined(relatedKeys, user, c2cReceipt) {
    var numbers = [user.mobilePhoneNumber];
    var message = user.labName + "،\nمتأسفانه کُد رهگیری ثبت شده شما به شماره " +
        toPersianNumber(c2cReceipt.c2cReceiptCode) + " مورد تأیید سامانه قرار نگرفت.\n" +
        "جهت اطلاعات بیشتر می توانید با ما تماس بگیرید.";
    return sendSms('declinec2c', numbers, message, {
        relatedKeys,
        user,
        c2cReceipt
    });
}

function respondFeedback(relatedKeys, feedback, message) {
    var numbers = [feedback.mobilePhoneNumber];
    return sendSms('respondfeedback', numbers, message, {
        relatedKeys,
        feedback
    });
}

////////////////////////////////////////////////////////////////////////////////

var smsTypeDescription = {
    'vericodeusrreg': "کُد اعتبارسنجی برای ثبت نام آزمایشگاه",
    'vericodeusrupd': "کُد اعتبارسنجی برای به روز رسانی اطلاعات آزمایشگاه",
    'passrecovery': "بازیابی کلمه عبور آزمایشگاه",
    'updatepatient': "اعلام ثبت اطلاعات و پیشنهاد عضویت در تلگرام بیمار",
    'postans': "ارسال نتیجه آزمایش بیمار",
    'postans': "حذف نتیجه آزمایش بیمار",
    'updateans': "به روز رسانی نتیجه آزمایش بیمار",
    'otp': "رمز یک بار مصرف مشاهده سوابق بیمار",
    'approvesignup': "تأیید حساب کاربری آزمایشگاه جدید",
    'declinesignup': "عدم تأیید حساب کاربری آزمایشگاه جدید",
    'approvec2c': "تأیید کُد رهگیری پرداخت کارت به کارت آزمایشگاه",
    'declinec2c': "عدم تأیید کُد رهگیری پرداخت کارت به کارت آزمایشگاه",
    'respondfeedback': "پاسخ به بازخورد ثبت شده",
};

function sendSms(type, numbers, message, data) {
    var jYMD = (new Date()).jYMD();
    return utils.generateId('sms/' + jYMD[0] + '/' + jYMD[1] + '/' + jYMD[2]).then(function(smsId) {
        var smsKey = 'sms/' + jYMD[0] + '/' + jYMD[1] + '/' + jYMD[2] + '/' + smsId;
        data.smsKey = smsKey;
        data.type = type;
        data.typeDescription = smsTypeDescription[type];
        data.numbers = numbers;
        data.message = message;
        data.timeStamp = Date.now();
        data.checked = false;
        return kfs(smsKey, data).then(function() {
            var number = numbers.find(number => number.isMobileNumber());
            return nikSms.sendSms(config.nik_sms_main_number, number, message).then(function(result) {
                delete result.NikIds;
                data.nikSmsResult = result;
                return kfs(smsKey, data).catch(function(err) {
                    console.error(err);
                });
            });
        });
    });
}

function simplySendSms(phoneNumber, message) {
    return nikSms.sendSms(config.nik_sms_main_number, phoneNumber, message);
}

function status(smsNikId) {
    return nikSms.smsStatus(smsNikId);
}
