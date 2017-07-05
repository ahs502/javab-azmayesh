var config = require("../../config");

var kfs = require("./kfs");

const TeleBot = require('telebot');
const bot = new TeleBot(config.telegram_bot_api_token);

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    sendMessage
};

////////////////////////////////////////////////////////////////////////////////

//bot.on('text', (msg) => msg.reply.text(msg.text));

bot.on('/start', msg => {
    var fromId = msg.from.id;
    return bot.sendMessage(fromId,
            'سلام!\nبه روبات تلگرام سامانه «جواب آزمایش» خوش آمدید!!')
        .then(() => bot.sendMessage(fromId,
            'شما می توانید به محض آماده شدن جواب آزمایشتان از طریق تلگرام مطلع شوید.'))
        .then(() => bot.sendMessage(fromId,
            'برای این منظور لازم است اطلاعات تماس خود را در اختیار سامانه «جواب آزمایش» قرار دهید.'))
        .then(() => bot.sendMessage(fromId,
            'لطفاً با فشردن دکمه (ارسال اطلاعات تماس من) و پس از آن دکمه (OK) اطلاعات تماس خود را با ما به اشتراک بگذارید:', {
                replyMarkup: bot.keyboard([
                    [{
                        request_contact: true,
                        request_location: false,
                        text: 'ارسال اطلاعات تماس من'
                    }]
                ], {
                    once: true
                })
            }));
});

bot.on('contact', contact => {
    /* Response sample:
    {
        "message_id": 81,
        "from": {
            "id": 127874812,
            "first_name": "Hessam",
            "last_name": "Shokravi",
            "language_code": "en"
        },
        "chat": {
            "id": 127874812,
            "first_name": "Hessam",
            "last_name": "Shokravi",
            "type": "private"
        },
        "date": 1498959762,
        "contact": {
            "phone_number": "989337770720",
            "first_name": "Hessam",
            "last_name": "Shokravi",
            "user_id": 127874812
        },
        "reply": {}
    }
    */
    var contactData = contact.contact || {};
    var contactInfo = {
        mobilePhoneNumber: String(contactData.phone_number || '').toPhoneNumber(),
        firstName: contactData.first_name,
        lastName: contactData.last_name,
        userId: contactData.user_id
    };
    return kfs('telegram/contact/phone/' + contactInfo.mobilePhoneNumber, contactInfo, function(err) {
        if (err) {
            console.error(err);
            return bot.sendMessage(contactInfo.userId,
                'متأسفانه عملیات ثبت اطلاعات تماس شما با خطا مواجه شد. لطفاً مجدداً تلاش کنید.');
        }
        return bot.sendMessage(contactInfo.userId,
                'اطلاعات تماس شما به صورت موفقیت آمیز ثبت شدند!')
            .then(() => bot.sendMessage(contactInfo.userId,
                'اکنون کافی است منتظر آماده شدن جواب آزمایش خود باشید، ' +
                'شما از طریق همین روبات از آماده شدن جواب آزمایشتان مطلع خواهید شد.'));
    });
});

bot.on('text', msg => {
    /* Response sample:
    {
        "message_id": 76,
        "from": {
            "id": 127874812,
            "first_name": "Hessam",
            "last_name": "Shokravi",
            "language_code": "en"
        },
        "chat": {
            "id": 127874812,
            "first_name": "Hessam",
            "last_name": "Shokravi",
            "type": "private"
        },
        "date": 1498959716,
        "text": "/start",
        "entities": [
            {
                "type": "bot_command",
                "offset": 0,
                "length": 6
            }
        ],
        "reply": {}
    }
    */
});

bot.start();

////////////////////////////////////////////////////////////////////////////////

function sendMessage(mobilePhoneNumbers, message) {
    mobilePhoneNumbers = [].concat(mobilePhoneNumbers);

    return new Promise((resolve, reject) => {
        (function tryNextMobilePhoneNumber() {
            var mobilePhoneNumber = mobilePhoneNumbers.splice(0, 1)[0];
            if (!mobilePhoneNumber || typeof mobilePhoneNumber !== 'string' ||
                !mobilePhoneNumber.isMobileNumber()) return reject();
            sendMessageToOneNumber(mobilePhoneNumber, message)
                .then(resolve, tryNextMobilePhoneNumber);
        })();
    });

    function sendMessageToOneNumber(mobilePhoneNumber, message) {
        return kfs('telegram/contact/phone/' + mobilePhoneNumber)
            .then(contact => {
                if (!contact) {
                    return Promise.reject('Contact not found.');
                }
                return bot.sendMessage(contact.userId, message);
            });
    }
}
