// For more information, see: http://niksms.com/fa/panel/#/programming-features/webservice-api

var soap = require("soap");

var nikSmsUrl = "http://niksms.com:1370/NiksmsWebservice.svc?wsdl";

module.export = function nikSms(username, password) {

    if (typeof username !== 'string' || typeof password !== 'string' || username.length <= 0 || password.length <= 0) {
        throw new Error('Empty username or password.');
    }

    //////////////////////////////////////////////////////////////////////////////

    return {
        sendSms: sendSms,
        getSmsStatus: getSmsStatus,
        // getSmsInfo: getSmsInfo, //TODO: Not working yet.
    };

    //////////////////////////////////////////////////////////////////////////////

    /*** Send PTP SMS :

     >> Inputs
          * from            :   Sender number (string)
          * to              :   Receiver's number (string or array of strings)
          * message         :   Message body (string or array of strings, single message for one reciever or group sms)
            id              :   Given id to each sms (string/long or array of strings/longs, will map to recievers' numbers)
            at              :   Sending date-time (Date or ISO formated stringOfDate, right now by default)
            type            :   Type of sms sending (string, 'Normal' by default)
        
     >> Outputs
          * Status          :   Request status (string, described below)
            Id              :   Request id (stringOfLong)
            WarningMessage  :   Request warning message (string)
            NikIds          :   Nik ids per each sms as the receipt code (array of stringOfLongs)
            NikId           :   Nik id of the sms as the receipt code (stringOfLong, only in single sms mode)

     -> Status
            1	Successful	پیام شما با موفقیت ارسال شده است.
            2	UnknownError	خطای نامشخصی رخ داده است که پیش بینی نشده بوده و باید با پشتیبانی فنی تماس بگیرید. (احتمال رخ دادن این خطا نزدیک به صفر بوده ولی جهت اطمینان، در مستندات ارائه می شود)
            3	InsufficientCredit	موجودی یا اعتبار شما برای انجام عملیات کافی نیست.
            4	ForbiddenHours	شما مجاز به ارسال در این ساعت نمی باشید.
            5	Filtered	پیام شما از نظر متنی مشکلی داشته که باعث فیلتر شدن آن شده است.
            6	NoFilters	این پیام شامل فیلترینگ نمی شود.
            7	PrivateNumberIsDisable	شماره اختصاصی که برای ارسال پیام خود انتخاب کرده اید، غیر فعال شده است.
            8	ArgumentIsNullOrIncorrect	پارامترهای هایی که برای ارسال پیام خود به سیستم فرستاده اید، اشتباه است.
            9	MessageBodyIsNullOrEmpty	پیام ارسالی شما دارای متن نبوده است، متن پیام را باید حتما وارد نمایید.
            10	PrivateNumberIsIncorrect	شماره اختصاصی وارد شده اشتباه است و یا به شما تعلق ندارد.
            11	ReceptionNumberIsIncorrect	شماره موبایل های ارسالی اشتباه است.
            12	SentTypeIsIncorrect	نوع ارسالی که انتخاب کرده اید با محتوای ارسالی شما مطابقت نداشته و اشتباه است.
            13	Warning	متن شما هشداری را به همراه داشته است ولی عملیات ارسال شما صورت گرفته است.
            14	PanelIsBlocked	پنل کاربری شما مسدود شده است و باید با پشتیبانی تماس بگیرید.
            15	SiteUpdating	سایت در حال عملیات به روزرسانی می باشد لطفا دقایقی دیگیر مجددا اقدام به ارسال نمایید.
            16	AudioMessageNotAllowed	مجوز تایید نشده در پنل موجود است.
            17	AudioMessageFileSizeNotAllowed	حجم فایل صوتی بیش از حد مجاز می باشد.
    ***/
    function sendSms(from, to, message, id, at, type) {

        var singlePtpSmsMode = !Array.isArray(message) && !Array.isArray(to) && !Array.isArray(id);
        var multiplePtpSmsMode = Array.isArray(message) && Array.isArray(to) && Array.isArray(id);
        var groupSmsMode = !Array.isArray(message) && Array.isArray(to) && Array.isArray(id);

        // console.log(singlePtpSmsMode, multiplePtpSmsMode, groupSmsMode);

        if (!singlePtpSmsMode && !multiplePtpSmsMode && !groupSmsMode) {
            return Promise.reject('Invalid input arguments.');
        }

        if (Array.isArray(id)) {
            id = id.map(function(i) {
                return String(i);
            });
        }
        else if (id) {
            id = String(id);
        }

        if (at && typeof at !== 'string') {
            at = at.toISOString();
        }

        var data = {
            "model": {
                "Numbers": [{
                    "string": to
                }],
                "SenderNumber": from
            }
        };
        data["model"]["SendType"] = type || 'Normal';
        at && (data["model"]["SendOn"] = at);
        id && (data["model"]["YourMessageId"] = [{
            "long": id
        }]);

        if (groupSmsMode) {
            data["model"]["Message"] = message;
        }
        else {
            data["model"]["Message"] = [{
                "string": message
            }];
        }

        return nikSmsWebServiceApiPromise(groupSmsMode ? 'GroupSms' : 'PtpSms', data, function(result) {
            if (result["NikIds"]) {
                result["NikIds"] = result["NikIds"]["long"];
                if (singlePtpSmsMode) {
                    result["NikId"] = result["NikIds"][0];
                }
            }
            return result;
        });
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get SMS Status by NikId :

     >> Input
          * id              :   Recieved nik id for the sms (string/long, provided in sendSms method's output)

     >> Output              :   Sms status (string, described below)

     -> Sms status
            0	NotFound	هنگامی که کاربر درخواست مشاهده نتیجه پیامی را دارد که قبلا برای ما ارسال نکرده و در دیتابیس وجود ندارد.
            1	DoNotSend	در انتظار تاریخ ارسال
            2	InQueue	پیام شما در صف ارسال است.
            3	Sent	پیام شما ارسال شده است.
            4	InsufficientCredit	موجودی ناکافی است.
            6	Block	پیام شما مسدود شده است.
            9	NotDeliverdSmsAdvertisingBlock	به علت مسدودی پیامک تبلیغاتی، تحویل نشده است .
            10	NotDeliverdBlackList	به علت وجود شماره مخاطب در لیست سیاه کاربر، پیامک تحویل نشده است.
            11	NotDeliverdDelay	به علت طولانی تر شدن مدت زمان انتظار ارسال از حداکثر میزان تاخیر مجاز تعیین شده توسط کاربر، ارسال متوقف و بازگشت خورده است.
            8	NotDeliverdCanceled	به دلیل لغو ارسال دستی توسط کاربر، ارسال متوقف و برگشت خورده است.
            14	NotDeliverdFiltering	به علت استفاده از کلمه/کلمات غیر قابل قبول از سوی مخابرات، فیلتر و متوقف شده است.
            15	WaitingForRecheckInOprator	به دلیل قطع شدن اینترنت یا .. این بسته نامشخص باقی مانده و باید تک تک پیامک هایش با اپراتور بررسی شود که تکراری ارسال نشود
            16	OpratorFault	اپراتور انتخابی برای ارسال پیامک شما جوابی به سرورهای ما ارسال نمی کند، احتمالا دچار نقص در سیستم ارسال خود شده است، با برطرف شدن این مشکل ارسال ها به روال عادی خود بر خواهند گشت.
            17	NotDeliveredBlocked	ارسال نشده است.
            18	SendedButStatusNotUpdated	در قسمت کنترل مجدد اپراتور مشخص شد که ارسال شده ولی وضعیتش هنوز به روزرسانی نشده.
            19	NotDeliveredDuplicate	تکراری بوده مخصوصا در ارسال منطقه ای.
            20	NotDeliveredBlockPanel	تحویل نشده - مسدودی پنل
            21	NotDeliveredUnknownNumber	تحویل نشده - شماره نادرست
            22	WaitingForDeliveryBeforeSend	در صف ارسال مخابرات
            23	NotDeliveredUnAccessible	تحویل نشده - عدم دسترسی
            24	NotDeliveredNotAnswered	تحویل نشده - عدم پاسخ
            25	NotDeliveredLineIsBusy	تحویل نشده - مشغولی
    ***/
    function getSmsStatus(id) {

        id = String(id);

        var data = {
            "nikIds": [{
                "long": id
            }]
        };

        return nikSmsWebServiceApiPromise('GetSmsDelivery', data, result => result["SmsStatus"][0]);
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get SMS NikId and Status by Id :

     >> Input
          * id              :   Declared sms id (string/long, provided in sendSms method's input)

     >> Output              :   Sms status (string, described below)

     -> Sms status
            0	NotFound	هنگامی که کاربر درخواست مشاهده نتیجه پیامی را دارد که قبلا برای ما ارسال نکرده و در دیتابیس وجود ندارد.
            1	DoNotSend	در انتظار تاریخ ارسال
            2	InQueue	پیام شما در صف ارسال است.
            3	Sent	پیام شما ارسال شده است.
            4	InsufficientCredit	موجودی ناکافی است.
            6	Block	پیام شما مسدود شده است.
            9	NotDeliverdSmsAdvertisingBlock	به علت مسدودی پیامک تبلیغاتی، تحویل نشده است .
            10	NotDeliverdBlackList	به علت وجود شماره مخاطب در لیست سیاه کاربر، پیامک تحویل نشده است.
            11	NotDeliverdDelay	به علت طولانی تر شدن مدت زمان انتظار ارسال از حداکثر میزان تاخیر مجاز تعیین شده توسط کاربر، ارسال متوقف و بازگشت خورده است.
            8	NotDeliverdCanceled	به دلیل لغو ارسال دستی توسط کاربر، ارسال متوقف و برگشت خورده است.
            14	NotDeliverdFiltering	به علت استفاده از کلمه/کلمات غیر قابل قبول از سوی مخابرات، فیلتر و متوقف شده است.
            15	WaitingForRecheckInOprator	به دلیل قطع شدن اینترنت یا .. این بسته نامشخص باقی مانده و باید تک تک پیامک هایش با اپراتور بررسی شود که تکراری ارسال نشود
            16	OpratorFault	اپراتور انتخابی برای ارسال پیامک شما جوابی به سرورهای ما ارسال نمی کند، احتمالا دچار نقص در سیستم ارسال خود شده است، با برطرف شدن این مشکل ارسال ها به روال عادی خود بر خواهند گشت.
            17	NotDeliveredBlocked	ارسال نشده است.
            18	SendedButStatusNotUpdated	در قسمت کنترل مجدد اپراتور مشخص شد که ارسال شده ولی وضعیتش هنوز به روزرسانی نشده.
            19	NotDeliveredDuplicate	تکراری بوده مخصوصا در ارسال منطقه ای.
            20	NotDeliveredBlockPanel	تحویل نشده - مسدودی پنل
            21	NotDeliveredUnknownNumber	تحویل نشده - شماره نادرست
            22	WaitingForDeliveryBeforeSend	در صف ارسال مخابرات
            23	NotDeliveredUnAccessible	تحویل نشده - عدم دسترسی
            24	NotDeliveredNotAnswered	تحویل نشده - عدم پاسخ
            25	NotDeliveredLineIsBusy	تحویل نشده - مشغولی
    ***/
    function getSmsInfo(id) {

        id = String(id);

        var data = {
            "yourId": {
                "long": id
            }
        };

        return nikSmsWebServiceApiPromise('GetSmsDeliveryWithClientId', data);
    }

    //////////////////////////////////////////////////////////////////////////////

    function nikSmsWebServiceApiPromise(method, data, modify) {
        return new Promise(function(resolve, reject) {
            soap.createClient(nikSmsUrl, function(err, client) {
                if (err) {
                    reject(err);
                }
                else {
                    data = data || {};
                    data['security'] = {
                        Username: username,
                        Password: password
                    };
                    client[method](data, function(err, result, body) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            result = result[method + 'Result'];
                            (typeof modify === 'function') && (result = modify(result));
                            resolve(result);
                        }
                    });
                }
            });
        });
    }

};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////







// sendSms('50004545454545',
//         '09101821367',
//         "سلام !\nحسام ام و اینپیام رو با کامپیوترم بدون گوشی ام می فرستم.",
//         34567
//     )
//     .then(function(result) {
//         logJSON(result);
//         getSmsStatusByNikId(result.NikId).then(logJSONTerminate, logJSONTerminate);
//     }, logJSONTerminate);


// getSmsStatus(173623667).then(logJSONTerminate, logJSONTerminate);


// sendSms('50004545454545',
//         '09337770720',
//         "سلام !\nحسام ام و اینپیام رو با کامپیوترم بدون گوشی ام می فرستم.",
//         1
//     )
//     .then(logJSONTerminate, logJSONTerminate);


// getSmsInfo(1).then(logJSONTerminate, logJSONTerminate);








// function log(data) {
//     console.log(data);
// }

// function logJSON(data) {
//     log(JSON.stringify(data, null, 4));
// }

// function logJSONTerminate(data) {
//     logJSON(data);
//     terminate = true;
// }

// var terminate = false;
// (function wait() {
//     if (!terminate)
//         setTimeout(wait, 1000);
// })();
