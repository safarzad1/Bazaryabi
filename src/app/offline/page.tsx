import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <section className="offline-card">
        <div className="offline-mark">ب</div>
        <span className="eyebrow">حالت آفلاین</span>
        <h1>اتصال اینترنت در دسترس نیست</h1>
        <p>صفحات بازدیدشده و اطلاعات کش‌شده همچنان قابل مشاهده هستند. برای دریافت اطلاعات جدید، اتصال اینترنت را بررسی کنید.</p>
        <Link href="/" className="primary-link-button">تلاش مجدد</Link>
      </section>
    </main>
  );
}
