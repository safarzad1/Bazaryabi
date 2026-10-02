import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return <main className="login-page">
    <section className="login-shell">
      <div className="login-brand-panel">
        <div className="brand-chip">PWA • فروش و سفارش‌گیری</div>
        <div className="brand-mark"><span>ب</span></div>
        <h1>سامانه بازاریابی و سفارش‌گیری</h1>
        <p>معرفی برندها، مقایسه محصولات، مدیریت مشتریان و ثبت سفارش در یک بستر یکپارچه.</p>
        <div className="brand-points"><span>مدیریت فروش و مشتری</span><span>گزارش‌های تحلیلی</span><span>پنل بازاریاب</span></div>
      </div>
      <div className="login-card">
        <div className="login-card-head"><span className="eyebrow">ورود امن</span><h2>ورود به حساب کاربری</h2><p>برای ادامه اطلاعات حساب و کد امنیتی را وارد کنید.</p></div>
        <LoginForm />
      </div>
    </section>
    <footer className="login-footer">نسخه اولیه سامانه بازاریابی — DBBazaryabi</footer>
  </main>;
}
