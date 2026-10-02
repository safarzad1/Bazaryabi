import PanelShell from "@/components/PanelShell";
import { KpiGrid, RecentOrders, SalesChart } from "@/components/DashboardWidgets";
import { marketerKpis } from "@/lib/demo-data";

export default function MarketerDashboard() {
  return <PanelShell role="marketer" title="داشبورد بازاریاب" subtitle="مشتریان، سفارش‌ها، برنامه پیگیری و میزان تحقق هدف فروش شما.">
    <KpiGrid items={marketerKpis}/>
    <section className="dashboard-grid wide-left"><SalesChart/><article className="panel-card activity-card"><div className="panel-heading"><div><span className="eyebrow">برنامه امروز</span><h3>پیگیری مشتریان</h3></div><span className="muted-badge">۶ مورد</span></div><div className="activity-list"><div><span className="activity-dot blue"/><div><b>سوپرمارکت بهار</b><small>پیگیری سفارش BZ-140512</small></div><time>۱۰:۳۰</time></div><div><span className="activity-dot purple"/><div><b>فروشگاه پارس</b><small>ویزیت و معرفی محصولات جدید</small></div><time>۱۲:۰۰</time></div><div><span className="activity-dot orange"/><div><b>هایپر آرمان</b><small>بررسی موجودی و سفارش مجدد</small></div><time>۱۵:۱۵</time></div><div><span className="activity-dot green"/><div><b>فروشگاه نگین</b><small>پیگیری وصول فاکتور</small></div><time>۱۷:۰۰</time></div></div></article></section>
    <RecentOrders marketerOnly/>
  </PanelShell>;
}
