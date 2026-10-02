import PanelShell from "@/components/PanelShell";
import { SalesChart } from "@/components/DashboardWidgets";

export default function MarketerReports() {
  const rows = [
    ["مهر ۱۴۰۵","۸۷","۱٬۲۸۰٬۰۰۰٬۰۰۰","۱۶۴","۸۵٪"],
    ["شهریور ۱۴۰۵","۷۵","۱٬۱۳۵٬۰۰۰٬۰۰۰","۱۵۲","۷۶٪"],
    ["مرداد ۱۴۰۵","۶۹","۹۸۰٬۰۰۰٬۰۰۰","۱۴۷","۶۵٪"],
  ];
  return <PanelShell role="marketer" title="گزارش عملکرد من" subtitle="روند فروش، تحقق هدف، مشتریان فعال و جزئیات سفارش‌های ثبت‌شده.">
    <section className="dashboard-grid wide-left"><SalesChart/><article className="panel-card goal-card"><span className="eyebrow">هدف فروش مهر</span><h3>۸۵٪ تحقق هدف</h3><div className="goal-ring"><div><strong>۸۵٪</strong><span>تحقق</span></div></div><div className="goal-meta"><span>فروش فعلی <b>۱.۲۸ میلیارد</b></span><span>هدف <b>۱.۵ میلیارد</b></span><span>مانده <b>۲۲۰ میلیون</b></span></div></article></section>
    <article className="panel-card table-card"><div className="panel-heading"><div><span className="eyebrow">جزئیات دوره‌ای</span><h3>عملکرد ماهانه</h3></div></div><div className="table-scroll"><table><thead><tr><th>دوره</th><th>تعداد سفارش</th><th>فروش (تومان)</th><th>مشتری فعال</th><th>تحقق هدف</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table></div></article>
  </PanelShell>;
}
