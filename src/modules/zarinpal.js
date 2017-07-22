var config = require("../../config");

var utils = require("./utils");
var kfs = require("./kfs");

var ZarinpalCheckout = require('zarinpal-checkout');

var zarinpal = config.zarinpal_merchant_code &&
    ZarinpalCheckout.create(config.zarinpal_merchant_code, false);

////////////////////////////////////////////////////////////////////////////////

module.exports = {
    gotoPayment,
    getReferenceId,
    getUnverifiedPaymentAuthorities,
    extendPaymentPeriod,
};

////////////////////////////////////////////////////////////////////////////////

// Redirects to payment page.
// Call it within a GET request.
function gotoPayment(res, transactionType, description, amount, mobilePhoneNumberOptional, emailOptional, callbackUrlOptional, data) {
    var callbackUrl = callbackUrlOptional || (config.protocol + '://' + config.domain + '/zarinpal/callback');
    (!zarinpal ? Promise.reject('Zarinpal is not active.') :
        zarinpal.PaymentRequest({
            Amount: String(amount),
            CallbackURL: callbackUrl,
            Description: description,
            Email: emailOptional,
            Mobile: mobilePhoneNumberOptional
        }).then(function(response) {
            if (response.status == 100) {
                var jYMD = (new Date()).jYMD();
                return utils.generateId('balance/zarinpal/' + jYMD[0] + '/' + jYMD[1] + '/' + jYMD[2]).then(function(paymentId) {
                    var paymentKey = 'balance/zarinpal/' + jYMD[0] + '/' + jYMD[1] + '/' + jYMD[2] + '/' + paymentId;
                    var paymentData = {
                        transactionType,
                        paymentKey,
                        description,
                        amount,
                        mobilePhoneNumber: mobilePhoneNumberOptional,
                        email: emailOptional,
                        callbackUrl,
                        data,
                        authority: response.authority,
                        timeStamp: Date.now(),
                        verified: false
                    };
                    return kfs('balance/zarinpal/authorities/' + paymentData.authority, paymentKey)
                        .then(() => kfs(paymentKey, paymentData))
                        .then(() => res.redirect(response.url));
                });
            }
            return Promise.reject(response);
        }))
    .catch(function(err) {
        console.error(err);
        res
            .header('Content-Type', 'text/html; charset=UTF-8')
            .status(200)
            .send(`
                <div>
                    <h3>خطا در دسترسی به درگاه پرداخت زرین پال</h3>
                    <p>درخواست پرداخت شما با خطا مواجه شد. لطفاً در فرصتی دیگر دوباره تلاش کنید.</p>
                </div>
            `)
            .end();
    });
}

// Resolves to payment's reference id.
// Rejects when payment is not verified or any error happens.
function getReferenceId(authority, amount) {
    return !zarinpal ? Promise.reject('Zarinpal is not active.') :
        zarinpal.PaymentVerification({
            Amount: amount,
            Authority: authority,
        }).then(function(response) {
            console.log(response);
            if (response.status == 100 || response.status == 101) {
                return response.RefID;
            }
            return Promise.reject('Not verified.');
        });
}

// Resolves to top 100 unverified payment authorities.
// Rejects when any error happens.
function getUnverifiedPaymentAuthorities() {
    return !zarinpal ? Promise.reject('Zarinpal is not active.') :
        zarinpal.UnverifiedTransactions().then(function(response) {
            if (response.status == 100) {
                return response.authorities;
            }
            return Promise.reject();
        });
}

// Resolves iff the payment expiration period has been extended by extraSeconds.
// Rejects when any error happens.
function extendPaymentPeriod(authority, extraSeconds) {
    return !zarinpal ? Promise.reject('Zarinpal is not active.') :
        zarinpal.RefreshAuthority({
            Authority: authority,
            Expire: extraSeconds
        }).then(function(response) {
            if (response.status == 100) {
                return;
            }
            return Promise.reject();
        });
}








/*





CALLBACK: {"Authority":"000000000000000000000000000048296217","Status":"OK"}
GET /zarinpal/callback?Authority=000000000000000000000000000048296217&Status=OK 302 0.896 ms - 98










GET / 200 20.411 ms - 176594
GET /img/Logo/Semi-Full%20Logo%20-%20600.png 304 9.398 ms - -
GET /dist/app.css 200 5.032 ms - -
GET /dist/lib.min.css 304 0.935 ms - -
GET /dist/lib.min.js 304 0.746 ms - -
GET /config 200 1.057 ms - -
GET /dist/app.js 200 1.862 ms - -
GET /dist/toastr.js.map 404 1.561 ms - 21
GET /dist/icon-js-feeder.js 200 2.581 ms - -
GET /dist/loader.rtl.min.css 200 5.219 ms - -
GET /dist/card.rtl.min.css 200 4.531 ms - -
GET /img/Logo/Full%20Logo%20-%20600.png 304 0.623 ms - -
GET /font/B-Nazanin.ttf 304 0.816 ms - -
GET /dist/statistic.min.css 200 1.695 ms - -

111> response: { status: 100,
  authority: '000000000000000000000000000048271531',
  url: 'https://www.zarinpal.com/pg/StartPay/000000000000000000000000000048271531' }

GET /balance/zarinpal/labCharge/1000 302 341.647 ms - 190

GET /?Authority=000000000000000000000000000048271531&Status=OK 200 9.610 ms - 176594

GET /dist/lib.min.js 304 1.227 ms - -
GET /config 200 1.213 ms - -
GET /dist/app.js 304 0.688 ms - -
GET /dist/lib.min.css 304 0.947 ms - -
GET /dist/app.css 304 0.788 ms - -
GET /img/Logo/Semi-Full%20Logo%20-%20600.png 304 1.309 ms - -
GET /dist/icon-js-feeder.js 304 0.385 ms - -
GET /dist/loader.rtl.min.css 304 4.173 ms - -
GET /dist/card.rtl.min.css 304 0.530 ms - -
GET /img/Logo/Full%20Logo%20-%20600.png 304 0.612 ms - -
GET /font/B-Nazanin.ttf 304 1.049 ms - -


///////////////////////////////////////////////////////////////////


GET /dist/loader.rtl.min.css 304 0.616 ms - -
GET /dist/app.css 304 1.104 ms - -
GET /font/B-Nazanin.ttf 304 0.722 ms - -
GET /img/Logo/Logo%20-%20256.png 200 1.776 ms - 24874
GET /dist/statistic.min.css 200 2.150 ms - -

111> response: { status: 100,
  authority: '000000000000000000000000000048272160',
  url: 'https://www.zarinpal.com/pg/StartPay/000000000000000000000000000048272160' }

GET /balance/zarinpal/labCharge/1000 302 378.927 ms - 190

GET /?Authority=000000000000000000000000000048272160&Status=NOK 200 11.686 ms - 176594

GET /dist/lib.min.js 304 3.152 ms - -
GET /img/Logo/Semi-Full%20Logo%20-%20600.png 304 1.701 ms - -
GET /config 200 0.756 ms - -
GET /dist/app.js 304 2.240 ms - -
GET /dist/lib.min.css 304 0.653 ms - -



*/
