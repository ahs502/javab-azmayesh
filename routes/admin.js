var express = require('express');
var router = module.exports = express.Router();

var config = require("../config");
var src = require("../src"),
    kfs = src.kfs,
    utils = src.utils,
    access = src.access,
    sms = src.sms,
    nikSms = src.nikSms,
    statistics = src.statistics;

////////////////////////////////////////////////////////////////////////////////

router.post('/getNotSentSmses', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    Promise.all([yesterday, today].map(date => {
        var jYMD = date.jYMD();
        return kfs('sms/' + jYMD[0] + '/' + jYMD[1] + '/' + jYMD[2] + '/');
    })).then(smsKeyCollections => {
        smsKeyCollections.forEach(smsKeyCollection => smsKeyCollection.sort((sk1, sk2) => {
            return Number(sk1.match(/([0-9]+)$/g)[0]) - Number(sk1.match(/([0-9]+)$/g)[0]);
        }));
        var smsKeys = smsKeyCollections.reduce((allSmsKeys, smsKeysCollection) => allSmsKeys.concat(smsKeysCollection));
        return Promise.all(smsKeys.map((smsKey) => kfs(smsKey)));
    }).then(smsDataList => {
        smsDataList = smsDataList.filter(smsData => !smsData.checked);
        return Promise.all(smsDataList.map(smsData => {
            if (smsData.nikSmsResult.Status !== 'Successful') {
                return Promise.resolve({
                    state: 'not sent',
                    status: smsData.nikSmsResult.Status,
                    data: smsData
                });
            }
            return sms.status(smsData.nikSmsResult.NikId).then(status => {
                if (status !== 'Sent') {
                    return {
                        state: 'not delivered',
                        status: status,
                        data: smsData
                    };
                }
                smsData.checked = true;
                return kfs(smsData.smsKey, smsData).then(() => {
                    return {
                        state: 'delivered'
                    };
                });
            });
        }));
    }).then(smsStateStatusList => {
        smsStateStatusList = smsStateStatusList.filter(smsStateStatus => smsStateStatus.state !== 'delivered');
        smsStateStatusList.forEach(smsStateStatus => {
            if (smsStateStatus.state === 'not sent')
                smsStateStatus.statusDescription = notSentStatusDescription[smsStateStatus.status];
            else if (smsStateStatus.state === 'not delivered')
                smsStateStatus.statusDescription = notDeliveredStatusDescription[smsStateStatus.status];
        });
        utils.resEndByCode(res, 0, {
            smsStateStatusList
        });
    }).catch(function(err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    });
});

var notSentStatusDescription = {
    'Successful': "پیام شما با موفقیت ارسال شده است.",
    'UnknownError': "خطای نامشخصی رخ داده است که پیش بینی نشده بوده و باید با پشتیبانی فنی تماس بگیرید. (احتمال رخ دادن این خطا نزدیک به صفر بوده ولی جهت اطمینان، در مستندات ارائه می شود)",
    'InsufficientCredit': "موجودی یا اعتبار شما برای انجام عملیات کافی نیست.",
    'ForbiddenHours': "شما مجاز به ارسال در این ساعت نمی باشید.",
    'Filtered': "پیام شما از نظر متنی مشکلی داشته که باعث فیلتر شدن آن شده است.",
    'NoFilters': "این پیام شامل فیلترینگ نمی شود.",
    'PrivateNumberIsDisable': "شماره اختصاصی که برای ارسال پیام خود انتخاب کرده اید، غیر فعال شده است.",
    'ArgumentIsNullOrIncorrect': "پارامترهای هایی که برای ارسال پیام خود به سیستم فرستاده اید، اشتباه است.",
    'MessageBodyIsNullOrEmpty': "پیام ارسالی شما دارای متن نبوده است، متن پیام را باید حتما وارد نمایید.",
    'PrivateNumberIsIncorrect': "شماره اختصاصی وارد شده اشتباه است و یا به شما تعلق ندارد.",
    'ReceptionNumberIsIncorrect': "شماره موبایل های ارسالی اشتباه است.",
    'SentTypeIsIncorrect': "نوع ارسالی که انتخاب کرده اید با محتوای ارسالی شما مطابقت نداشته و اشتباه است.",
    'Warning': "متن شما هشداری را به همراه داشته است ولی عملیات ارسال شما صورت گرفته است.",
    'PanelIsBlocked': "پنل کاربری شما مسدود شده است و باید با پشتیبانی تماس بگیرید.",
    'SiteUpdating': "سایت در حال عملیات به روزرسانی می باشد لطفا دقایقی دیگیر مجددا اقدام به ارسال نمایید.",
    'AudioMessageNotAllowed': "مجوز تایید نشده در پنل موجود است.",
    'AudioMessageFileSizeNotAllowed': "حجم فایل صوتی بیش از حد مجاز می باشد.",
};

var notDeliveredStatusDescription = {
    'NotFound': "هنگامی که کاربر درخواست مشاهده نتیجه پیامی را دارد که قبلا برای ما ارسال نکرده و در دیتابیس وجود ندارد.",
    'DoNotSend': "در انتظار تاریخ ارسال",
    'InQueue': "پیام شما در صف ارسال است.",
    'Sent': "پیام شما ارسال شده است.",
    'InsufficientCredit': "موجودی ناکافی است.",
    'Block': "پیام شما مسدود شده است.",
    'NotDeliverdSmsAdvertisingBlock': "به علت مسدودی پیامک تبلیغاتی، تحویل نشده است .",
    'NotDeliverdBlackList': "به علت وجود شماره مخاطب در لیست سیاه کاربر، پیامک تحویل نشده است.",
    'NotDeliverdDelay': "به علت طولانی تر شدن مدت زمان انتظار ارسال از حداکثر میزان تاخیر مجاز تعیین شده توسط کاربر، ارسال متوقف و بازگشت خورده است.",
    'NotDeliverdCanceled': "به دلیل لغو ارسال دستی توسط کاربر، ارسال متوقف و برگشت خورده است.",
    'NotDeliverdFiltering': "به علت استفاده از کلمه/کلمات غیر قابل قبول از سوی مخابرات، فیلتر و متوقف شده است.",
    'WaitingForRecheckInOprator': "به دلیل قطع شدن اینترنت یا .. این بسته نامشخص باقی مانده و باید تک تک پیامک هایش با اپراتور بررسی شود که تکراری ارسال نشود",
    'OpratorFault': "اپراتور انتخابی برای ارسال پیامک شما جوابی به سرورهای ما ارسال نمی کند، احتمالا دچار نقص در سیستم ارسال خود شده است، با برطرف شدن این مشکل ارسال ها به روال عادی خود بر خواهند گشت.",
    'NotDeliveredBlocked': "ارسال نشده است.",
    'SendedButStatusNotUpdated': "در قسمت کنترل مجدد اپراتور مشخص شد که ارسال شده ولی وضعیتش هنوز به روزرسانی نشده.",
    'NotDeliveredDuplicate': "تکراری بوده مخصوصا در ارسال منطقه ای.",
    'NotDeliveredBlockPanel': "تحویل نشده - مسدودی پنل",
    'NotDeliveredUnknownNumber': "تحویل نشده - شماره نادرست",
    'WaitingForDeliveryBeforeSend': "در صف ارسال مخابرات",
    'NotDeliveredUnAccessible': "تحویل نشده - عدم دسترسی",
    'NotDeliveredNotAnswered': "تحویل نشده - عدم پاسخ",
    'NotDeliveredLineIsBusy': "تحویل نشده - مشغولی",
};

////////////////////////////////////////////////////////////////////////////////

router.post('/tryAgainNotSentSms', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var smsKey = req.body.smsKey;
    kfs(smsKey, function(err, smsData) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        var number = smsData.numbers.find(number => number.isMobileNumber());
        var message = smsData.message;
        return nikSms.sendSms(config.nik_sms_main_number, number, message).then(function(result) {
            delete result.NikIds;
            smsData.nikSmsResult = result;
            return kfs(smsKey, smsData).catch(function(err) {
                console.error(err);
            });
        }).then(function() {
            utils.resEndByCode(res, 0);
        }, function(err) {
            console.error(err);
            utils.resEndByCode(res, 5);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/checkNotSentSms', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var smsKey = req.body.smsKey;
    kfs(smsKey, function(err, smsData) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        smsData.checked = true;
        kfs(smsKey, smsData, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/getNotActivatedLabs', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    kfs('user/inactive/', function(err, inactiveUserKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        if (!inactiveUserKeys || !inactiveUserKeys.length) {
            return utils.resEndByCode(res, 0, {
                inactiveLabs: []
            });
        }
        Promise.all(inactiveUserKeys.map(inactiveUserKey => kfs(inactiveUserKey)))
            .then(inactiveUsers => {
                utils.resEndByCode(res, 0, {
                    inactiveLabs: inactiveUsers
                });
            }, err => {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/approveInactiveLab', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labData = req.body.labData;
    var labUsername = labData.username;
    var labKey = 'user/active/' + labUsername;
    kfs(labKey, labData, function(err) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        new kfs('user/inactive/' + labUsername, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            sms.send.newUserApproved([labKey], labData);
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/declineInactiveLab', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labUsername = req.body.labUsername;
    var labKey = 'user/inactive/' + labUsername;
    kfs(labKey, function(err, labData) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        new kfs(labKey, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            sms.send.newUserDeclined([], labData);
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/getAllLaboratories', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    kfs('user/active/', function(err, allUserKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        Promise.all(allUserKeys.map(userKey => kfs(userKey)))
            .then(function(allUsers) {
                allUsers = allUsers.filter(user => user && user.userType === 'laboratory');
                allUsers.forEach(user => {
                    delete user.password;
                });
                utils.resEndByCode(res, 0, {
                    laboratories: allUsers
                });
            }, function(err) {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/editLaboratory', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labUsername = req.body.labUsername;
    var labData = req.body.labData;
    var userKey = 'user/active/' + labUsername;
    kfs(userKey, function(err, user) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        user.labName = labData.labName;
        user.mobilePhoneNumber = labData.mobilePhoneNumber;
        user.phoneNumber = labData.phoneNumber;
        user.address = labData.address;
        user.postalCode = labData.postalCode;
        user.websiteAddress = labData.websiteAddress;
        user.balance = labData.balance;
        kfs(userKey, user, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            utils.resEndByCode(res, 0);
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/removeLaboratory', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var labUsername = req.body.labUsername;
    var userKey = 'user/active/' + labUsername;
    new kfs(userKey, function(err) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        utils.resEndByCode(res, 0);
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/sendDummySms', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var phoneNumber = req.body.phoneNumber;
    var message = req.body.message;
    sms.simplySendSms(phoneNumber, message).then(function() {
        utils.resEndByCode(res, 0);
    }, function(err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    });
});

////////////////////////////////////////////////////////////////////////////////
