export const adminKpis = [
  { label: "فروش این ماه", value: "۸.۴۲ میلیارد", hint: "۱۲.۸٪ بیشتر از ماه قبل", tone: "blue", icon: "money" as const },
  { label: "سفارش‌های فعال", value: "۳۸۶", hint: "۵۴ سفارش نیازمند پیگیری", tone: "purple", icon: "orders" as const },
  { label: "مشتریان فعال", value: "۱٬۲۴۸", hint: "۸۶ مشتری جدید این ماه", tone: "orange", icon: "users" as const },
  { label: "نرخ تحویل موفق", value: "۹۴.۶٪", hint: "۱.۹٪ بهبود نسبت به قبل", tone: "green", icon: "check" as const },
];

export const marketerKpis = [
  { label: "فروش من", value: "۱.۲۸ میلیارد", hint: "هدف ماهانه: ۱.۵ میلیارد", tone: "blue", icon: "money" as const },
  { label: "سفارش ثبت‌شده", value: "۸۷", hint: "۱۲ سفارش امروز", tone: "purple", icon: "orders" as const },
  { label: "مشتریان من", value: "۱۶۴", hint: "۱۸ مشتری نیازمند پیگیری", tone: "orange", icon: "users" as const },
  { label: "ویزیت موفق", value: "۷۸٪", hint: "۳۲ ویزیت در این هفته", tone: "green", icon: "check" as const },
];

export const recentOrders = [
  { code: "BZ-140512", customer: "سوپرمارکت بهار", marketer: "علی رضایی", amount: "۴۸٬۶۵۰٬۰۰۰", status: "تأییدشده", date: "۱۴۰۵/۰۷/۰۲" },
  { code: "BZ-140511", customer: "فروشگاه سپهر", marketer: "مریم کریمی", amount: "۳۱٬۲۰۰٬۰۰۰", status: "در آماده‌سازی", date: "۱۴۰۵/۰۷/۰۲" },
  { code: "BZ-140510", customer: "هایپر آرمان", marketer: "علی رضایی", amount: "۷۸٬۹۰۰٬۰۰۰", status: "ارسال‌شده", date: "۱۴۰۵/۰۷/۰۱" },
  { code: "BZ-140509", customer: "فروشگاه گلستان", marketer: "سارا محمدی", amount: "۲۶٬۳۰۰٬۰۰۰", status: "در انتظار بررسی", date: "۱۴۰۵/۰۷/۰۱" },
  { code: "BZ-140508", customer: "سوپرمارکت نگین", marketer: "مریم کریمی", amount: "۵۶٬۱۰۰٬۰۰۰", status: "تحویل‌شده", date: "۱۴۰۵/۰۶/۳۱" },
];

export const reportRows = [
  { title: "گزارش فروش به تفکیک بازاریاب", desc: "فروش خالص، تعداد سفارش، مشتری فعال و درصد تحقق هدف", count: "۲۸ بازاریاب", group: "فروش" },
  { title: "گزارش فروش محصول و برند", desc: "مقدار فروش، مبلغ، تخفیف، حاشیه فروش و رتبه محصولات", count: "۴۸۲ محصول", group: "کالا" },
  { title: "گزارش مشتریان و خرید", desc: "آخرین خرید، متوسط سبد، تعداد سفارش و مشتریان غیرفعال", count: "۱٬۲۴۸ مشتری", group: "مشتری" },
  { title: "گزارش وضعیت سفارش‌ها", desc: "ثبت‌شده، تأیید، آماده‌سازی، ارسال، تحویل، لغو و برگشتی", count: "۳۸۶ فعال", group: "سفارش" },
  { title: "گزارش مناطق و مسیرها", desc: "فروش مناطق، پوشش بازاریاب، نرخ تبدیل و تعداد مشتری", count: "۳۶ منطقه", group: "توزیع" },
  { title: "گزارش پرداخت و مطالبات", desc: "مبلغ فاکتور، پرداخت، مانده، سررسید و وضعیت وصول", count: "۲۱۷ مانده", group: "مالی" },
  { title: "گزارش ساختار دسته‌بندی", desc: "تعداد محصولات فعال و تأییدشده در هر دسته و زیرگروه", count: "۶ دسته اصلی", group: "کاتالوگ" },
  { title: "گزارش برند و کاتالوگ", desc: "تعداد محصول هر برند، وضعیت انتشار و محصولات نیازمند تأیید", count: "۴ برند نمونه", group: "کاتالوگ" },
];
