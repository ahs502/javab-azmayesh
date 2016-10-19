// For more information, see: http://niksms.com/fa/panel/#/programming-features/webservice-api

var soap = require("soap");

var nikSmsUrl = "http://niksms.com:1370/NiksmsWebservice.svc?wsdl";

module.exports = function nikSms(username, password) {

    if (typeof username !== 'string' || typeof password !== 'string' || username.length <= 0 || password.length <= 0) {
        throw new Error('Empty username or password.');
    }

    //////////////////////////////////////////////////////////////////////////////

    return {
        sendSms: sendSms,
        smsStatus: smsStatus,
        // smsInfo: smsInfo, //TODO: Not working yet.
        receiveSms: receiveSms,
        credit: credit,
        discount: discount,
        panelExpireDate: panelExpireDate,
        receiveSmsAgain: receiveSmsAgain,
        senderNumbers: senderNumbers,
    };

    //////////////////////////////////////////////////////////////////////////////

    /*** Send Single and Multiple PTP and also Group SMS :

     >> Inputs
          * from            :   Sender number (string)
          * to              :   Receiver's number (string or array of strings)
          * message         :   Message body (string or array of strings, single message for one receiver or group sms)
            id              :   Given id to each sms (string/long or array of strings/longs, will map to receivers' numbers)
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

        var singlePtpSmsMode = !Array.isArray(message) && !Array.isArray(to) && (!id || !Array.isArray(id));
        var multiplePtpSmsMode = Array.isArray(message) && Array.isArray(to) && (!id || Array.isArray(id));
        var groupSmsMode = !Array.isArray(message) && Array.isArray(to) && (!id || Array.isArray(id));

        if (!singlePtpSmsMode && !multiplePtpSmsMode && !groupSmsMode) {
            return Promise.reject('Invalid input arguments.');
        }

        if (Array.isArray(id)) {
            id = id.map(i => String(i));
        }
        else if (id) {
            id = String(id);
        }

        if (at && Object.prototype.toString.call(at) === "[object Date]") {
            at = toISOFormatedLocaleString(at);
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
        (typeof at !== 'string') && (data["model"]["SendOn"] = at);
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
          * id              :   Received nik id for the sms (string/long or array of strings/longs, provided in sendSms method's output)

     >> Output              :   Sms status (string or array of string, described below)

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
    function smsStatus(id) {

        var singleSmsMode = id && (typeof id === 'string' || typeof id === 'number');
        var multipleSmsMode = id && Array.isArray(id);

        if (!singleSmsMode && !multipleSmsMode) {
            return Promise.reject('Invalid input arguments.');
        }

        if (Array.isArray(id)) {
            id = id.map(i => String(i));
        }
        else if (id) {
            id = String(id);
        }

        var data = {
            "nikIds": [{
                "long": id
            }]
        };

        return nikSmsWebServiceApiPromise('GetSmsDelivery', data,
            result => singleSmsMode ? result["SmsStatus"][0] : result["SmsStatus"]);
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
    /*function smsInfo(id) {

        id = String(id);

        var data = {
            "yourId": {
                "long": id
            }
        };

        return nikSmsWebServiceApiPromise('GetSmsDeliveryWithClientId', data);
    }*/

    //////////////////////////////////////////////////////////////////////////////

    /*** Retrieved Received SMS(es) :

     >> Input
            start           :   Start date of search for received smses (Date or ISO formated locale time string)
            end             :   End date of search for received smses (Date or ISO formated locale time string)

     >> Output
          * An array of (may be an empty array)
                Message         :   Sms text (string)
                SenderNumber    :   Sender number (string, e.g. : "09337770720")
                ReceiveNumber   :   Receiver number (string, e.g. : "50004545454545")
                Id              :   Sms id (long)
                ReceiveDate     :   Receive date and time (Date)
                IsRelayed       :   Is this message sent automaticaly? (boolean)
    ***/
    function receiveSms(start, end) {

        if (start && Object.prototype.toString.call(start) === "[object Date]") {
            start = toISOFormatedLocaleString(start);
        }

        if (end && Object.prototype.toString.call(end) === "[object Date]") {
            end = toISOFormatedLocaleString(end);
        }

        var data = {};

        (typeof start === 'string') && (data["startDate"] = start);
        (typeof end === 'string') && (data["endDate"] = end);

        return nikSmsWebServiceApiPromise('GetReceiveSms', data, function(result) {
            result = result ? (result["GetReceiveSmsModel"] || []) : [];
            result.forEach(function(r) {
                if (r["SenderNumber"].slice(0, 3) === '989')
                    r["SenderNumber"] = '0' + r["SenderNumber"].slice(2);
                if (r["ReceiveNumber"].slice(0, 2) === '98')
                    r["ReceiveNumber"] = r["ReceiveNumber"].slice(2);
            });
            return result;
        });
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get Remaining Credit :

     >> Input
            - No inputs -

     >> Output              :   Remaining credit (long, in Rials)
     
    ***/
    function credit() {

        var data = {};

        return nikSmsWebServiceApiPromise('GetCredit', data);
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get Remaining Discount Credit :

     >> Input
            - No inputs -

     >> Output              :   Remaining discount credit (long, in Rials)
     
    ***/
    function discount() {

        var data = {};

        return nikSmsWebServiceApiPromise('GetDiscountCredit', data);
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get Panel Expiration Date :

     >> Input
            - No inputs -

     >> Output              :   Exact expiration date of the panel (Date)
     
    ***/
    function panelExpireDate() {

        var data = {};

        return nikSmsWebServiceApiPromise('GetPanelExpireDate', data);
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Retrieved Received SMS(es) (Even if you have did this before and want to do it again) :

     >> Input
            start           :   Start date of search for received smses (Date or ISO formated locale time string)
            end             :   End date of search for received smses (Date or ISO formated locale time string)
            notNow          :   Retrieve messages right now or later using receiveSms for example? (boolean, false by default which means right now)

     >> Output
     
            In the case of notNow == false :
                An array of (may be an empty array)
                    Message         :   Sms text (string)
                    SenderNumber    :   Sender number (string, e.g. : "09337770720")
                    ReceiveNumber   :   Receiver number (string, e.g. : "50004545454545")
                    Id              :   Sms id (long)
                    ReceiveDate     :   Receive date and time (Date)
                    IsRelayed       :   Is this message sent automaticaly? (boolean)
                    
            In the case of notNow == false :
                A boolean indicating success or failure of the operation of setting the messages status to unread.

    ***/
    function receiveSmsAgain(start, end, notNow) {

        if (start && Object.prototype.toString.call(start) === "[object Date]") {
            start = toISOFormatedLocaleString(start);
        }

        if (end && Object.prototype.toString.call(end) === "[object Date]") {
            end = toISOFormatedLocaleString(end);
        }

        var data = {};

        (typeof start === 'string') && (data["startDate"] = start);
        (typeof end === 'string') && (data["endDate"] = end);

        return nikSmsWebServiceApiPromise('ResetReceiveSmsVisitedStatus', data)
            .then(function(status /* : boolean */ ) {
                if (notNow) {
                    return !!status;
                }
                if (!status) {
                    return Promise.reject('Unable to set the status of those messages to unread.');
                }
                return receiveSms(start, end);
            });
    }

    //////////////////////////////////////////////////////////////////////////////

    /*** Get Active Sender Numbers :

     >> Input
            - No inputs -

     >> Output              :   List of user's active sender numbers (array of string, e.g. : ['50004545454545', '30001234567'])
     
    ***/
    function senderNumbers() {

        var data = {};

        return nikSmsWebServiceApiPromise('GetSenderNumbers', data,
            result => result["string"].map(function(r) {
                if (r.slice(0, 2) === '98')
                    r = r.slice(2);
                return r;
            }));
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

    function toISOFormatedLocaleString(d) {
        d = new Date(d);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString();
    }

};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////







// var nikSms = module.exports('09337770720', 'nspassword');


// // nikSms.sendSms('50004545454545', ['09337770720', '09126550720'],
// //         "س")
// //     .then(logJSONTerminate, logJSONTerminate);

// // nikSms.smsStatus(['173667892','173667893']).then(logJSONTerminate, logJSONTerminate);

// // nikSms.receiveSms()
// //     .then(logJSONTerminate, logJSONTerminate);

// // nikSms.receiveSmsAgain("2016-10-19T09:11:12.000Z", "2016-10-19T09:36:18.843Z", true).then(logJSONTerminate, logJSONTerminate);

// nikSms.senderNumbers().then(logJSONTerminate, logJSONTerminate);






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
