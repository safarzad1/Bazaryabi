import PanelShell from "@/components/PanelShell";
import { reportRows } from "@/lib/demo-data";
import { OrdersBarChart, SalesChart } from "@/components/DashboardWidgets";
import ReportsFilter from "@/components/ReportsFilter";

export default function AdminReports() {
  return <PanelShell role="admin" title="گزارشات و تحلیل فروش" subtitle="گزارش‌های نموداری و جزئی با امکان فیلتر، مقایسه و Drill-down.">
    <ReportsFilter/>
    <section className="dashboard-grid wide-left"><SalesChart/><OrdersBarChart/></section>
    <section className="report-catalog"><div className="section-title"><div><span className="eyebrow">فهرست گزارش‌ها</span><h2>گزارش‌های تفصیلی</h2></div><span className="muted-badge">۸ گزارش اصلی</span></div><div className="report-grid">{reportRows.map((r,i)=><article className={`report-item accent-${(i%3)+1}`} key={r.title}><div className="report-number">{i+1}</div><div><span className="report-group">{r.group}</span><h3>{r.title}</h3><p>{r.desc}</p><footer><span>{r.count}</span><button>مشاهده جزئیات ←</button></footer></div></article>)}</div></section>
  </PanelShell>;
}
