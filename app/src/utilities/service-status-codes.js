/*global toastr*/

(function(global) {

    global.sscAlert = sscAlert;

    /*
        0   : Success
        1   : Unknown error in server
        2   : Unknown error in client
        
        5   : Internal server error
        
        10  : Already existing user
        11  : reCAPTCHA verification error

        30  : Action is not waiting for confirmation
        31  : Confirmation code has expired
        32  : Wrong validation code
        
        40  : Wrong username or password
        
        50  : User has not logged in correctly
        51  : User not found
        52  : Invalid user type
        
        60  : User data does not match
        
        70  : Patient has not accessed history correctly
        71  : Patient has no history post
        72  : Post does not belong to patient
        73  : Post not found
        74  : User (laboratory) not found
        75  : Patient has reached daily try count limit
        76  : Patient not found
        77  : Patient not accepted
        
        80  : Invalid form data
        
        100 : Invalid access key
        101 : Expired access key
        
        120 : Exceeded SMS count number
        
        130 : User out of charge
        131 : Zarrinpal is not active
        132 : Zarrinpal gate openning error
        
        140 : Patient has already been registered
    */

    var serviceStatusCodes = {

        0: 'عملیات موفقیت آمیز',
        1: 'خطای ناشناخته سمت سِروِر',
        2: 'خطای ناشناخته سمت کاربر',

        5: 'خطای داخلی سمت سِروِر',

        10: 'کاربر با این نام در حال حاضر موجود است',
        11: 'عدم تأیید ریکَپچا',

        30: 'عملیات منتظر تأیید شدن وجود ندارد',
        31: 'زمان انقضای درخواست به اتمام رسیده است',
        32: 'کُد اعتبار سنجی اشتباه است',

        40: 'نام کاربری یا کلمه عبور اشتباه است',

        50: 'کاربر به درستی وارد سامانه نشده است',
        51: 'کاربر یافت نشد',
        52: 'نوع کاربر نامتناسب است',

        60: 'اطلاعات حساب کاربری انطباق ندارد',

        70: 'بیمار به درستی به سوابق خود دسترسی پیدا نکرده است',
        71: 'سوابقی برای بیمار ثبت نشده است',
        72: 'این پُست مربوط به این بیمار نیست',
        73: 'پُست ارسال شده یافت نشد',
        74: 'کاربر آزمایشگاه یافت نشد',
        75: 'بیمار به حداکثر تعداد خطاهای روزانه رسیده است',
        76: 'اطلاعات بیمار در سامانه ثبت نشده است',
        77: 'بیمار در این آزمایشگاه پذیرش نشده است',

        80: 'اطلاعات فرم اشتباه است',

        100: 'کلید دسترسی کاربر نامعتبر است',
        101: 'کلید دسترسی کاربر منقضی شده است',

        120: 'از تعداد پیامک های مجاز رَد شده است، مدتی صبر کنید',

        130: 'شارژ حساب کاربر به اتمام رسیده است',
        131: 'درگاه پرداخت زرین پال فعال نیست',
        132: 'خطا در باز کردن درگاه پرداخت زرین پال',

        140: 'اطلاعات این بیمار قبلاً در سامانه ثبت شده است. اگر نیاز به اصلاح این اطلاعات در سامانه است، پذیرش آزمایشگاه می تواند به شما کمک کند',

    };

    var options = {
        rtl: true,
        closeButton: true,
        timeOut: 10000,
        extendedTimeOut: 3000,
    };

    function sscAlert(code) {
        var message = serviceStatusCodes[code] || 'خطای ناشناخته';
        toastr.error(message, 'خطا در عملیات', options);
    }

})(global);
