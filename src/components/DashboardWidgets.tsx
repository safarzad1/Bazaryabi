import AppIcon from "./AppIcon";
import { recentOrders } from "@/lib/demo-data";

type Kpi = { label: string; value: string; hint: string; tone: string; icon: "money" | "orders" | "users" | "check" };
export function KpiGrid({ items }: { items: Kpi[] }) {
  return <div className="kpi-grid">{items.map((k) => <article className={`kpi-card tone-${k.tone}`} key={k.label}><div className="kpi-icon"><AppIcon name={k.icon} size={23}/></div><div><span className="kpi-label">{k.label}</span><strong>{k.value}</strong><small>{k.hint}</small></div></article>)}</div>;
}

export function SalesChart({ compact = false }: { compact?: boolean }) {
  const pts = [42,55,48,68,63,77,71,89,82,96,91,108];
  const max = 115; const width = 640, height = 210;
  const points = pts.map((v,i)=>`${(i/(pts.length-1))*width},${height-(v/max)*(height-28)-12}`).join(" ");
  return <article className={`panel-card chart-card ${compact ? "compact" : ""}`}><div className="panel-heading"><div><span className="eyebrow">روند فروش</span><h3>فروش ۱۲ ماه اخیر</h3></div><span className="panel-stat">+۱۲.۸٪</span></div><div className="line-chart-wrap"><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"><defs><linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f83c7" stopOpacity=".28"/><stop offset="1" stopColor="#3f83c7" stopOpacity="0"/></linearGradient></defs>{[30,75,120,165].map(y=><line key={y} x1="0" x2={width} y1={y} y2={y} className="grid-line"/>)}<polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#fillSales)"/><polyline points={points} className="sales-line"/></svg><div className="chart-labels">{["آبان","آذر","دی","بهمن","اسفند","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر"].map(m=><span key={m}>{m}</span>)}</div></div></article>;
}

export function OrdersBarChart() {
  const bars = [{n:"ثبت",v:74},{n:"بررسی",v:55},{n:"تأیید",v:87},{n:"آماده",v:64},{n:"ارسال",v:45},{n:"تحویل",v:92}];
  return <article className="panel-card"><div className="panel-heading"><div><span className="eyebrow">عملیات</span><h3>سفارش‌ها بر اساس وضعیت</h3></div><span className="muted-badge">امروز</span></div><div className="bar-chart">{bars.map((b)=><div className="bar-item" key={b.n}><div className="bar-track"><span style={{height:`${b.v}%`}}/></div><b>{b.v}</b><small>{b.n}</small></div>)}</div></article>;
}

export function StatusDonut() {
  return <article className="panel-card"><div className="panel-heading"><div><span className="eyebrow">ترکیب فروش</span><h3>سهم کانال‌های سفارش</h3></div></div><div className="donut-layout"><div className="donut"><div><strong>۳۸۶</strong><span>سفارش</span></div></div><div className="legend"><span><i className="lg-a"/>اپ مشتری <b>۴۶٪</b></span><span><i className="lg-b"/>بازاریاب <b>۳۴٪</b></span><span><i className="lg-c"/>اپراتور <b>۲۰٪</b></span></div></div></article>;
}

export function RecentOrders({ marketerOnly = false }: { marketerOnly?: boolean }) {
  const rows = marketerOnly ? recentOrders.filter(x=>x.marketer==="علی رضایی") : recentOrders;
  return <article className="panel-card table-card"><div className="panel-heading"><div><span className="eyebrow">جزئیات</span><h3>{marketerOnly ? "آخرین سفارش‌های من" : "آخرین سفارش‌ها"}</h3></div><button className="text-button">مشاهده همه</button></div><div className="table-scroll"><table><thead><tr><th>شماره سفارش</th><th>مشتری</th>{!marketerOnly && <th>بازاریاب</th>}<th>مبلغ (تومان)</th><th>وضعیت</th><th>تاریخ</th></tr></thead><tbody>{rows.map(r=><tr key={r.code}><td className="ltr-code">{r.code}</td><td>{r.customer}</td>{!marketerOnly && <td>{r.marketer}</td>}<td>{r.amount}</td><td><span className={`status status-${r.status.replaceAll(" ","")}`}>{r.status}</span></td><td>{r.date}</td></tr>)}</tbody></table></div></article>;
}
