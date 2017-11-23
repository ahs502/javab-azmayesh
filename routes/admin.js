var express = require('express');
var router = module.exports = express.Router();

var fs = require("fs-extra");
var path = require("path");

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
        smsKeyCollections.forEach(smsKeyCollection => smsKeyCollection.sort((k1, k2) => {
            return Number(k1.match(/([0-9]+)$/g)[0]) - Number(k1.match(/([0-9]+)$/g)[0]);
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

router.post('/getAllNewC2cPaymentReceipts', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    kfs('balance/c2c/new/', function(err, c2cReceiptKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        Promise.all(c2cReceiptKeys.map(c2cReceiptKey => kfs(c2cReceiptKey)))
            .then(function(c2cReceiptCodes) {
                utils.resEndByCode(res, 0, {
                    c2cReceiptCodes
                });
            }, function(err) {
                if (err) {
                    console.error(err);
                    utils.resEndByCode(res, 5);
                }
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/chargeLabFromC2c', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var c2cReceiptId = req.body.c2cReceiptId;
    var labUsername = req.body.labUsername;
    var amount = req.body.amount;
    var labKey = 'user/active/' + labUsername;
    var c2cNewKey = 'balance/c2c/new/' + c2cReceiptId;
    var c2cPaidKey = 'balance/c2c/paied/' + c2cReceiptId;
    kfs(c2cNewKey, function(err, c2cReceipt) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        kfs(labKey, function(err, labData) {
            if (err || !labData) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            labData.balance = Number(labData.balance || 0) + Number(amount || 0);
            kfs(labKey, labData, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                kfs(c2cPaidKey, c2cReceipt, function(err) {
                    if (err) {
                        console.error(err);
                        return utils.resEndByCode(res, 5);
                    }
                    new kfs(c2cNewKey, function(err) {
                        if (err) {
                            console.error(err);
                            return utils.resEndByCode(res, 5);
                        }
                        sms.send.c2cReceiptCodeApproved([labKey, c2cPaidKey], labData, c2cReceipt, amount);
                        utils.resEndByCode(res, 0);
                    });
                });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/declineC2cReceipt', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var c2cReceiptId = req.body.c2cReceiptId;
    var c2cNewKey = 'balance/c2c/new/' + c2cReceiptId;
    var c2cDeclinedKey = 'balance/c2c/declined/' + c2cReceiptId;
    kfs(c2cNewKey, function(err, c2cReceipt) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        var labUsername = c2cReceipt.username;
        var labKey = 'user/active/' + labUsername;
        kfs(labKey, function(err, labData) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            kfs(c2cDeclinedKey, c2cReceipt, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                new kfs(c2cNewKey, function(err) {
                    if (err) {
                        console.error(err);
                        return utils.resEndByCode(res, 5);
                    }
                    sms.send.c2cReceiptCodeDeclined([labKey, c2cDeclinedKey], labData, c2cReceipt);
                    utils.resEndByCode(res, 0);
                });
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/getNewFeedbacks', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    kfs('feedback/new/', function(err, feedbackKeys) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        feedbackKeys = feedbackKeys.sort((k1, k2) => {
            return Number(k1.match(/([0-9]+)$/g)[0]) - Number(k1.match(/([0-9]+)$/g)[0]);
        });
        Promise.all(feedbackKeys.map(feedbackKey => kfs(feedbackKey)))
            .then(function(feedbacks) {
                utils.resEndByCode(res, 0, {
                    feedbacks
                });
            }, function(err) {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/checkFeedback', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var feedbackId = req.body.feedbackId;
    var feedbackNewKey = 'feedback/new/' + feedbackId;
    var feedbackCheckedKey = 'feedback/checked/' + feedbackId;
    kfs(feedbackNewKey, function(err, feedback) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        kfs(feedbackCheckedKey, feedback, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            new kfs(feedbackNewKey, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                utils.resEndByCode(res, 0);
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/respondFeedback', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var feedbackId = req.body.feedbackId;
    var message = req.body.message;
    var feedbackNewKey = 'feedback/new/' + feedbackId;
    var feedbackCheckedKey = 'feedback/checked/' + feedbackId;
    kfs(feedbackNewKey, function(err, feedback) {
        if (err) {
            console.error(err);
            return utils.resEndByCode(res, 5);
        }
        kfs(feedbackCheckedKey, feedback, function(err) {
            if (err) {
                console.error(err);
                return utils.resEndByCode(res, 5);
            }
            new kfs(feedbackNewKey, function(err) {
                if (err) {
                    console.error(err);
                    return utils.resEndByCode(res, 5);
                }
                sms.send.respondFeedback([feedbackCheckedKey], feedback, message);
                utils.resEndByCode(res, 0);
            });
        });
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/getStatistics', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    let date = new Date();
    let daysPromises = [];
    let daysYMDs = [];
    for (let i = 0; i < 31; i++) {
        let ymd = date.jYMD();
        daysYMDs.push(ymd);
        date.setDate(date.getDate() - 1);
        let dKey = 'statistics/=' + ymd[0] + '/=' + ymd[1] + '/' + ymd[2];
        daysPromises.push(kfs(dKey));
    }
    let monthsPromises = [];
    let monthsYMDs = [];
    for (let i = 0; i < 12; i++) {
        let ymd = (new Date()).jYMD();
        if ((ymd[1] -= i) > 1) {
            ymd = [ymd[0], ymd[1]];
        }
        else {
            ymd = [ymd[0] - 1, ymd[1] + 12];
        }
        monthsYMDs.push(ymd);
        let mKey = 'statistics/=' + ymd[0] + '/' + ymd[1];
        monthsPromises.push(kfs(mKey));
    }
    let yearsPromises = [];
    let years = [];
    for (let i = 0; i < 10; i++) {
        let ymd = (new Date()).jYMD();
        let year = ymd[0] - i;
        years.push(year);
        let yKey = 'statistics/' + year;
        yearsPromises.push(kfs(yKey));
    }
    Promise.all([Promise.all(daysPromises).then(daysStatistics => daysStatistics.map((ds, i) => ({
            y: daysYMDs[i][0],
            m: daysYMDs[i][1],
            d: daysYMDs[i][2],
            stat: ds
        })).filter(days => !!days.stat)),
        Promise.all(monthsPromises).then(monthsStatistics => monthsStatistics.map((ms, i) => ({
            y: monthsYMDs[i][0],
            m: monthsYMDs[i][1],
            stat: ms
        })).filter(months => !!months.stat)),
        Promise.all(yearsPromises).then(yearsStatistics => yearsStatistics.map((ys, i) => ({
            y: years[i],
            stat: ys
        })).filter(years => !!years.stat))
    ]).then(allStat => {
        var stat = {
            daily: allStat[0],
            monthly: allStat[1],
            yearly: allStat[2]
        };
        utils.resEndByCode(res, 0, {
            stat
        });
    }, err => {
        console.error(err);
        utils.resEndByCode(res, 5);
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

router.post('/findPatientByNationalCode', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var nationalCode = req.body.nationalCode;
    kfs('patient/data/' + nationalCode, function(err, patient) {
        if (err) {
            console.error(err);
            utils.resEndByCode(res, 5);
        }
        utils.resEndByCode(res, 0, {
            patient
        });
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

router.post('/broadcastMessage', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var message = req.body.message;
    kfs('user/active/')
        .then(userKeys => Promise.all(userKeys.map(userKey => kfs(userKey))))
        .then(users => users
            .filter(user => user.userType === 'laboratory')
            .map(user => user.mobilePhoneNumber))
        .then(mobilePhoneNumbers => {
            let obj = {};
            mobilePhoneNumbers.forEach(mobilePhoneNumber => obj[mobilePhoneNumber] = null);
            return Object.keys(obj);
        })
        .then(mobilePhoneNumbers => sms.simplySendSms(mobilePhoneNumbers, message))
        .then(() => utils.resEndByCode(res, 0),
            err => {
                console.error(err);
                utils.resEndByCode(res, 5);
            });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/getNikSmsCredit', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    nikSms.credit().then(function(credit) {
        utils.resEndByCode(res, 0, {
            credit
        });
    }, function(err) {
        console.error(err);
        utils.resEndByCode(res, 5);
    });
});

////////////////////////////////////////////////////////////////////////////////

router.post('/findAllPhoneNumbers', function(req, res, next) {
    var userInfo = access.decodeUserInfo(req, res, 'administrator');
    if (!userInfo) return;
    // var username = userInfo.username;
    var allPhoneNumbersFilename = path.join(config.storage_path, "allPhoneNumbers");
    var writer = fs.createWriteStream(allPhoneNumbersFilename, {
        flags: 'w',
        defaultEncoding: 'utf8',
        fd: null,
        mode: 0o666,
        autoClose: true
    });
    writer.on('open', () => {
        Promise.all([
                kfs('user/active/').then(userKeys =>
                    Promise.all(userKeys.map(userKey => kfs(userKey))))
                .then(users => users.forEach(user =>
                    (user.userType === 'laboratory') && writer.write(user.mobilePhoneNumber + '\n'))),
                kfs('patient/data/').then(patientKeys =>
                    Promise.all(patientKeys.map(patientKey => kfs(patientKey))))
                .then(patients => patients.forEach(patient =>
                    patient.numbers.forEach(number =>
                        number.isMobileNumber() && writer.write(number + '\n'))))
            ])
            .then(() => writer.end(), err => {
                if (res) {
                    console.error(err);
                    utils.resEndByCode(res, 5);
                    res = null;
                }
            });
    });
    writer.on('error', err => {
        if (res) {
            console.error(err);
            utils.resEndByCode(res, 5);
            res = null;
        }
    });
    writer.on('finish', () => res && utils.resEndByCode(res, 0));
});

////////////////////////////////////////////////////////////////////////////////

router.get('/allPhoneNumbers', function(req, res, next) {
    // var userInfo = access.decodeUserInfo(req, res, 'administrator');
    // if (!userInfo) return;
    // // var username = userInfo.username;
    var allPhoneNumbersFilename = path.join(config.storage_path, "allPhoneNumbers");
    res.set('Content-Type', 'text/plain; charset=UTF-8');
    res.sendFile(allPhoneNumbersFilename);
});

////////////////////////////////////////////////////////////////////////////////
