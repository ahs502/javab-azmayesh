/*global global*/

(function(global) {

    //Source: http://amib.ir/weblog/wp-content/uploads/amib/iran-provinces-cities/
    var irIran = {
        "آذربایجان شرقی": [
            "آبش احمد", "آذرشهر", "آقکند", "اسکو", "اهر", "اچاچی", "ایلخچی", "باسمنج", "بخشایش", "بستان آباد", "بناب",
            "بناب مرند", "تبریز", "ترک", "ترکمانچای", "تسوج", "تیمورلو", "تیکمه داش", "جلفا", "جوان قلعه", "خاروانا", "خامنه",
            "خداجو(خراجو)", "خسروشاه", "خمارلو", "خواجه", "دوزدوزان", "زرنق", "زنوز", "سراب", "سردرود", "سهند", "سیس",
            "سیه رود", "شبستر", "شربیان", "شرفخانه", "شندآباد", "صوفیان", "عجب شیر", "قره آغاج", "لیلان", "مبارک شهر", "مراغه",
            "مرند", "ملکان", "ممقان", "مهربان", "میانه", "نظرکهریزی", "هادیشهر", "هریس", "هشترود", "هوراند", "وایقان",
            "ورزقان", "کشکسرای", "کلوانق", "کلیبر", "کوزه کنان", "گوگان", "یامچی"
        ],
        "آذربایجان غربی": [
            "آواجیق", "ارومیه", "اشنویه", "ایواوغلی", "باروق", "بازرگان", "بوکان", "تازه شهر", "تکاب", "خلیفان", "خوی",
            "دیزج دیز", "ربط", "زرآباد", "سردشت", "سرو", "سلماس", "سیلوانه", "سیمینه", "سیه چشمه", "شاهین دژ", "شوط",
            "فیرورق", "قره ضیاءالدین", "قطور", "قوشچی", "ماکو", "محمدیار", "محمودآباد", "مرگنلر", "مهاباد", "میاندوآب", "میرآباد",
            "نازک علیا", "نالوس", "نقده", "نوشین", "پلدشت", "پیرانشهر", "چهاربرج", "کشاورز", "گردکشانه"
        ],
        "اردبیل": [
            "آبی بیگلو", "اردبیل", "اسلام اباد", "اصلاندوز", "بیله سوار", "تازه کند", "تازه کندانگوت", "جعفرآباد", "خلخال", "رضی", "سرعین",
            "عنبران", "فخراباد", "قصابه", "لاهرود", "مرادلو", "مشگین شهر", "نمین", "نیر", "هشتجین", "هیر", "پارس آباد",
            "کلور", "کوراییم", "گرمی", "گیوی"
        ],
        "اصفهان": [
            "آران وبیدگل", "ابریشم", "ابوزیدآباد", "اردستان", "اصغرآباد", "اصفهان", "افوس", "انارک", "اژیه", "ایمانشهر", "بادرود",
            "باغ بهادران", "باغشاد", "بافران", "برزک", "برف انبار", "بهاران شهر", "بهارستان", "بویین ومیاندشت", "تودشک", "تیران",
            "جندق", "جوزدان", "جوشقان قالی", "حبیب آباد", "حسن اباد", "حنا", "خالدآباد", "خمینی شهر", "خوانسار", "خور", "خورزوق",
            "داران", "دامنه", "درچه", "دستگرد", "دهاقان", "دهق", "دولت آباد", "دیزیچه", "رزوه", "رضوانشهر", "زازران",
            "زاینده رود", "زرین شهر", "زواره", "زیار", "زیباشهر", "سجزی", "سده لنجان", "سفیدشهر", "سمیرم", "سین", "شاهین شهر",
            "شاپورآباد", "شهرضا", "طالخونچه", "طرق رود", "عسگران", "علویجه", "فرخی", "فریدونشهر", "فلاورجان", "فولادشهر", "قمصر",
            "قهجاورستان", "قهدریجان", "لای بید", "مبارکه", "مجلسی", "محمدآباد", "مشکات", "منظریه", "مهاباد", "میمه", "نایین",
            "نجف آباد", "نصرآباد", "نطنز", "نوش آباد", "نیاسر", "نیک آباد", "هرند", "ورزنه", "ورنامخواست", "وزوان", "ونک",
            "پیربکران", "چادگان", "چرمهین", "چمگردان", "کاشان", "کامو و چوگان", "کرکوند", "کلیشادوسودرجان", "کمشچه", "کمه", "کهریزسنگ",
            "کوشک", "کوهپایه", "گرگاب", "گزبرخوار", "گلدشت", "گلشن", "گلشهر", "گلپایگان", "گوگد"
        ],
        "البرز": [
            "آسارا", "اشتهارد", "تنکمان", "شهرجدیدهشتگرد", "طالقان", "فردیس", "ماهدشت", "محمدشهر", "مشکین دشت", "نظرآباد", "هشتگرد",
            "چهارباغ", "کرج", "کمال شهر", "کوهسار", "گرمدره", "گلسار"
        ],
        "ایلام": [
            "آبدانان", "آسمان آباد", "ارکواز", "ایلام", "ایوان", "بدره", "بلاوه", "توحید", "دره شهر", "دلگشا", "دهلران",
            "زرنه", "سراب باغ", "سرابله", "شباب", "صالح آباد", "لومار", "ماژین", "مهر", "مهران", "مورموری", "موسیان",
            "میمه", "پهله", "چوار"
        ],
        "بوشهر": [
            "آب پخش", "آباد", "آبدان", "امام حسن", "انارستان", "اهرم", "بادوله", "برازجان", "بردخون", "بردستان", "بندردیر",
            "بندردیلم", "بندرریگ", "بندرکنگان", "بندرگناوه", "بنک", "بوشهر", "بوشکان", "تنگ ارم", "جم", "خارک", "خورموج",
            "دالکی", "دلوار", "دوراهک", "ریز", "سعد آباد", "سیراف", "شبانکاره", "شنبه", "عسلویه", "نخل تقی", "وحدتیه",
            "چغادک", "کاکی", "کلمه"
        ],
        "تهران": [
            "آبسرد", "آبعلی", "احمد آباد مستوفی", "ارجمند", "اسلامشهر", "اندیشه", "باغستان", "باقرشهر", "بومهن", "تجریش", "تهران",
            "جوادآباد", "حسن آباد", "دماوند", "رباطکریم", "رودهن", "ری", "شاهدشهر", "شریف آباد", "شمشک", "شهریار", "صالحیه",
            "صباشهر", "صفادشت", "فردوسیه", "فرون اباد", "فشم", "فیروزکوه", "قدس", "قرچک", "لواسان", "ملارد", "نسیم شهر",
            "نصیرشهر", "وحیدیه", "ورامین", "پاکدشت", "پردیس", "پرند", "پیشوا", "چهاردانگه", "کهریزک", "کیلان", "گلستان"
        ],
        "چهارمحال و بختیاری": [
            "آلونی", "اردل", "باباحیدر", "بازفت", "بروجن", "بلداجی", "بن", "جونقان", "دستنا", "دشتک", "سامان",
            "سرخون", "سردشت", "سفیددشت", "سودجان", "سورشجان", "شلمزار", "شهرکرد", "صمصامی", "طاقانک", "فارسان", "فرادبنه",
            "فرخ شهر", "لردگان", "مال خلیفه", "منج", "ناغان", "نافچ", "نقنه", "هارونی", "هفشجان", "وردنجان", "پردنجان",
            "چلگرد", "چلیچه", "کاج", "کیان", "گندمان", "گهرو", "گوجان"
        ],
        "خراسان جنوبی": [
            "آرین شهر", "آیسک", "ارسک", "اسدیه", "اسفدن", "اسلامیه", "بشرویه", "بیرجند", "حاجی آباد", "خضری دشت بیاض", "خوسف",
            "دیهوک", "زهان", "سرایان", "سربیشه", "سه قلعه", "شوسف", "طبس", "طبس مسینا", "عشق آباد", "فردوس", "قاین",
            "قهستان", "محمدشهر", "مود", "نهبندان", "نیمبلوک", "گزیک"
        ],
        "خراسان رضوی": [
            "احمدابادصولت", "انابد", "باجگیران", "باخرز", "بار", "بایک", "بجستان", "بردسکن", "بیدخت", "تایباد", "تربت جام",
            "تربت حیدریه", "جغتای", "جنگل", "خرو", "خلیل آباد", "خواف", "داورزن", "درود", "درگز", "دولت آباد", "رباط سنگ",
            "رشتخوار", "رضویه", "روداب", "ریوش", "سبزوار", "سرخس", "سفیدسنگ", "سلامی", "سلطان آباد", "سنگان", "شادمهر",
            "شاندیز", "ششتمد", "شهراباد", "شهرزو", "صالح آباد", "طرقبه", "عشق آباد", "فرهادگرد", "فریمان", "فیروزه", "فیض آباد",
            "قاسم آباد", "قدمگاه", "قلندرآباد", "قوچان", "لطف آباد", "مزدآوند", "مشهد", "مشهدریزه", "ملک آباد", "نشتیفان", "نصرآباد",
            "نقاب", "نوخندان", "نیشابور", "نیل شهر", "همت آباد", "چاپشلو", "چناران", "چکنه", "کاخک", "کاریز", "کاشمر",
            "کدکن", "کلات", "کندر", "گلمکان", "گناباد", "یونسی"
        ],
        "خراسان شمالی": [
            "آشخانه", "آوا", "اسفراین", "ایور", "بجنورد", "تیتکانلو", "جاجرم", "حصارگرمخان", "درق", "راز", "زیارت",
            "سنخواست", "شوقان", "شیروان", "صفی آباد", "فاروج", "قاضی", "قوشخانه", "لوجلی", "پیش قلعه", "چناران شهر", "گرمه"
        ],
        "خوزستان": [
            "آبادان", "آبژدان", "آزادی", "آغاجاری", "ابوحمیظه", "اروندکنار", "الهایی", "الوان", "امیدیه", "اندیمشک", "اهواز",
            "ایذه", "باغ ملک", "بستان", "بندرامام خمینی", "بندرماهشهر", "بهبهان", "بیدروبه", "ترکالکی", "تشان", "جایزان", "جنت مکان",
            "حر", "حسینیه", "حمزه", "حمیدیه", "خرمشهر", "خنافره", "دارخوین", "دزفول", "دهدز", "رامشیر", "رامهرمز",
            "رفیع", "زهره", "سالند", "سرداران", "سردشت", "سماله", "سوسنگرد", "سیاه منصور", "شادگان", "شاوور", "شرافت",
            "شمس آباد", "شهر امام", "شوش", "شوشتر", "شیبان", "صالح شهر", "صفی آباد", "صیدون", "فتح المبین", "قلعه تل", "قلعه خواجه",
            "لالی", "مسجدسلیمان", "مشراگه", "مقاومت", "ملاثانی", "منصوریه", "میانرود", "میداود", "مینوشهر", "هفتگل", "هندیجان",
            "هویزه", "ویس", "چغامیش", "چم گلک", "چمران", "چویبده", "کوت سیدنعیم", "کوت عبداله", "گتوند", "گلگیر", "گوریه"
        ],
        "زنجان": [
            "آب بر", "ابهر", "ارمغانخانه", "حلب", "خرمدره", "دندی", "زرین آباد", "زرین رود", "زنجان", "سجاس", "سلطانیه",
            "سهرورد", "صایین قلعه", "قیدار", "ماه نشان", "نوربهار", "نیک پی", "هیدج", "چورزق", "کرسف", "گرماب"
        ],
        "سمنان": [
            "آرادان", "امیریه", "ایوانکی", "بسطام", "بیارجمند", "دامغان", "درجزین", "دیباج", "رودیان", "سرخه", "سمنان",
            "شاهرود", "شهمیرزاد", "مجن", "مهدی شهر", "میامی", "کلاته", "کلاته خیج", "کهن آباد", "گرمسار"
        ],
        "سیستان و بلوچستان": [
            "ادیمی", "اسپکه", "ایرانشهر", "بزمان", "بمپور", "بنت", "بنجار", "جالق", "خاش", "دوست محمد", "راسک",
            "زابل", "زابلی", "زاهدان", "زرآباد", "زهک", "سراوان", "سرباز", "سوران", "سیرکان", "شهرک علی اکبر", "فنوج",
            "قصرقند", "محمدآباد", "محمدان", "محمدی", "میرجاوه", "نصرت آباد", "نوک آباد", "نگور", "نیک شهر", "هیدوچ", "پیشین",
            "چاه بهار", "کنارک", "گشت", "گلمورتی"
        ],
        "فارس": [
            "آباده", "آباده طشک", "اردکان", "ارسنجان", "استهبان", "اسیر", "اشکنان", "افزر", "اقلید", "امام شهر", "اهل",
            "اوز", "ایج", "ایزدخواست", "باب انار", "بابامنیر", "بالاده", "بنارویه", "بهمن", "بوانات", "بیرم", "بیضا",
            "جنت شهر", "جهرم", "جویم", "حاجی آباد", "حسامی", "حسن اباد", "خانه زنیان", "خانیمن", "خاوران", "خرامه", "خشت",
            "خنج", "خور", "خوزی", "خومه زار", "داراب", "داریان", "دبیران", "دهرم", "دوبرجی", "دوزه", "دژکرد",
            "رامجرد", "رونیز", "زاهدشهر", "زرقان", "سده", "سروستان", "سعادت شهر", "سلطان شهر", "سورمق", "سیدان", "ششده",
            "شهرصدرا", "شهرپیر", "شیراز", "صغاد", "صفاشهر", "علامرودشت", "عمادده", "فدامی", "فراشبند", "فسا", "فیروزآباد",
            "قادراباد", "قایمیه", "قره بلاغ", "قطب آباد", "قطرویه", "قیر", "لار", "لامرد", "لطیفی", "لپویی", "مادرسلیمان",
            "مبارک آباددیز", "مرودشت", "مزایجان", "مشکان", "مصیری", "مهر", "میانشهر", "میمند", "نوبندگان", "نوجین", "نودان",
            "نورآباد", "نی ریز", "هماشهر", "وراوی", "کارزین (فتح آباد)", "کازرون", "کامفیروز", "کره ای", "کنارتخته", "کوار", "کوهنجان",
            "کوپن", "گراش", "گله دار"
        ],
        "قزوین": [
            "آبگرم", "آبیک", "آوج", "ارداق", "اسفرورین", "اقبالیه", "الوند", "بویین زهرا", "بیدستان", "تاکستان", "خاکعلی",
            "خرمدشت", "دانسفهان", "رازمیان", "سگزآباد", "سیردان", "شال", "شریفیه", "ضیاڈآباد", "قزوین", "محمدیه", "محمودآبادنمونه",
            "معلم کلایه", "نرجه", "کوهین"
        ],
        "قم": [
            "جعفریه", "دستجرد", "سلفچگان", "قم", "قنوات", "کهک"
        ],
        "کردستان": [
            "آرمرده", "اورامان تخت", "بابارشانی", "بانه", "برده رشه", "بلبان آباد", "بویین سفلی", "بیجار", "توپ آغاج", "دزج", "دلبران",
            "دهگلان", "دیواندره", "زرینه", "سروآباد", "سریش آباد", "سقز", "سنندج", "شویشه", "صاحب", "قروه", "مریوان",
            "موچش", "پیرتاج", "چناره", "کامیاران", "کانی دینار", "کانی سور", "یاسوکند"
        ],
        "کرمان": [
            "اختیارآباد", "ارزوییه", "امین شهر", "انار", "اندوهجرد", "باغین", "بافت", "بردسیر", "بروات", "بزنجان", "بلورد",
            "بلوک", "بم", "بهرمان", "جبالبارز", "جوزم", "جوپار", "جیرفت", "خاتون اباد", "خانوک", "خواجو شهر", "خورسند",
            "درب بهشت", "دشتکار", "دهج", "دوساری", "رابر", "راور", "راین", "رفسنجان", "رودبار", "ریحان", "زرند",
            "زنگی آباد", "زهکلوت", "زیدآباد", "سیرجان", "شهداد", "شهربابک", "صفاییه", "عنبرآباد", "فاریاب", "فهرج", "قلعه گنج",
            "لاله زار", "ماهان", "محمدآباد", "محی آباد", "مردهک", "مس سرچشمه", "منوجان", "نجف شهر", "نرماشیر", "نظام شهر", "نودژ",
            "نگار", "هجدک", "هماشهر", "هنزا", "پاریز", "چترود", "کاظم آباد", "کرمان", "کشکوییه", "کهنوج", "کوهبنان",
            "کیانشهر", "گلباف", "گلزار", "گنبکی", "یزدان شهر"
        ],
        "کرمانشاه": [
            "ازگله", "اسلام آبادغرب", "بانوره", "باینگان", "بیستون", "تازه آباد", "جوانرود", "حمیل", "رباط", "روانسر", "ریجاب",
            "سرمست", "سرپل ذهاب", "سطر", "سنقر", "سومار", "شاهو", "صحنه", "قصرشیرین", "میان راهان", "نودشه", "نوسود",
            "هرسین", "هلشی", "پاوه", "کرمانشاه", "کرند", "کنگاور", "کوزران", "گهواره", "گودین", "گیلانغرب"
        ],
        "کهگیلویه وبویراحمد": [
            "باشت", "دهدشت", "دوگنبدان", "دیشموک", "سرفاریاب", "سوق", "سی سخت", "قلعه رییسی", "لنده", "لیکک", "مادوان",
            "مارگون", "پاتاوه", "چرام", "چیتاب", "گراب سفلی", "یاسوج"
        ],
        "گلستان": [
            "آزادشهر", "آق قلا", "انبارآلوم", "اینچه برون", "بندرترکمن", "بندرگز", "تاتارعلیا", "جلین", "خان ببین", "دلند", "رامیان",
            "سرخنکلاته", "سنگدوین", "سیمین شهر", "علی اباد", "فاضل آباد", "فراغی", "مراوه", "مزرعه", "مینودشت", "نوده خاندوز", "نوکنده",
            "نگین شهر", "کردکوی", "کلاله", "گالیکش", "گرگان", "گمیش تپه", "گنبدکاووس"
        ],
        "گیلان": [
            "آستارا", "آستانه اشرفیه", "احمدسرگوراب", "اسالم", "اطاقور", "املش", "بازار جمعه", "بره سر", "بندرانزلی", "توتکابن", "جیرنده",
            "حویق", "خشکبیجار", "خمام", "دیلمان", "رانکوه", "رحیم آباد", "رستم آباد", "رشت", "رضوانشهر", "رودبار", "رودبنه",
            "رودسر", "سنگر", "سیاهکل", "شفت", "شلمان", "صومعه سرا", "فومن", "لاهیجان", "لشت نشاء", "لنگرود", "لوشان",
            "لولمان", "لوندویل", "لیسار", "ماسال", "ماسوله", "ماکلوان", "مرجقل", "منجیل", "هشتپر (تالش)", "واجارگاه", "پره سر",
            "چابکسر", "چاف و چمخاله", "چوبر", "کلاچای", "کومله", "کوچصفهان", "کیاشهر", "گوراب زرمیخ"
        ],
        "لرستان": [
            "ازنا", "اشترینان", "الشتر", "الیگودرز", "بروجرد", "بیران شهر", "خرم آباد", "درب گنبد", "دورود", "زاغه", "سراب دوره",
            "سپیددشت", "شول آباد", "فیروزآباد", "معمولان", "مومن آباد", "نورآباد", "هفت چشمه", "ویسیان", "پلدختر", "چالانچولان", "چقابل",
            "کوهدشت", "کوهنانی", "گراب"
        ],
        "مازندران": [
            "آلاشت", "آمل", "ارطه", "امامزاده عبدالله", "امیرکلا", "ایزدشهر", "بابل", "بابلسر", "بلده", "بهشهر", "بهنمیر",
            "تنکابن", "جویبار", "خرم آباد", "خلیل شهر", "خوش رودپی", "دابودشت", "رامسر", "رستمکلا", "رویان", "رینه", "زرگرمحله",
            "زیرآب", "ساری", "سرخرود", "سلمان شهر", "سورک", "شیرود", "شیرگاه", "عباس اباد", "فریدونکنار", "فریم", "قایم شهر",
            "محمودآباد", "مرزن آباد", "مرزیکلا", "نشتارود", "نور", "نوشهر", "نکا", "هادی شهر", "هچیرود", "پایین هولار", "پل سفید",
            "پول", "چالوس", "چمستان", "کتالم وسادات شهر", "کجور", "کلارآباد", "کلاردشت", "کوهی خیل", "کیاسر", "کیاکلا", "گتاب",
            "گزنک", "گلوگاه", "گلوگاه"
        ],
        "مرکزی": [
            "آستانه", "آشتیان", "آوه", "اراک", "تفرش", "توره", "جاورسیان", "خشکرود", "خمین", "خنجین", "خنداب",
            "داودآباد", "دلیجان", "رازقان", "زاویه", "ساروق", "ساوه", "شازند", "شهباز", "غرق آباد", "فرمهین", "قورچی باشی",
            "مامونیه", "محلات", "مهاجران", "میلاجرد", "نراق", "نوبران", "نیمور", "هندودر", "پرندک", "کارچان", "کمیجان"
        ],
        "هرمزگان": [
            "ابوموسی", "بستک", "بندرجاسک", "بندرعباس", "بندرلنگه", "بیکاء", "تازیان پایین", "تخت", "تیرور", "جناح", "حاجی اباد",
            "خمیر", "درگهان", "دشتی", "دهبارز", "رویدر", "زیارتعلی", "سردشت", "سرگز", "سندرک", "سوزا", "سیریک",
            "فارغان", "فین", "قشم", "قلعه قاضی", "لمزان", "میناب", "هرمز", "هشتبندی", "پارسیان", "چارک", "کنگ",
            "کوشکنار", "کوهستک", "کیش", "گروک", "گوهران"
        ],
        "همدان": [
            "آجین", "ازندریان", "اسدآباد", "برزول", "بهار", "تویسرکان", "جورقان", "جوکار", "دمق", "رزن", "زنگنه",
            "سامن", "سرکان", "شیرین سو", "صالح آباد", "فامنین", "فرسفج", "فیروزان", "قروه درجزین", "قهاوند", "لالجین", "مریانج",
            "ملایر", "مهاجران", "نهاوند", "همدان", "کبودرآهنگ", "گل تپه", "گیان"
        ],
        "یزد": [
            "ابرکوه", "احمدآباد", "اردکان", "اشکذر", "بافق", "بفروییه", "بهاباد", "تفت", "حمیدیا", "خضرآباد", "زارچ",
            "شاهدیه", "عقدا", "مروست", "مهردشت", "مهریز", "میبد", "ندوشن", "نیر", "هرات", "یزد"
        ]
    };

    global.irIran = irIran;
    global.irIranProvinces = Object.keys(irIran);

})(global);
