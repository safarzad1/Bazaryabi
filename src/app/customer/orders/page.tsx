import PanelShell from "@/components/PanelShell";
import { recentOrders } from "@/lib/demo-data";
export default function CustomerOrders() {
  return <PanelShell role="customer" title="سفارش‌های من" subtitle="پیگیری وضعیت سفارش، مشاهده مبلغ و جزئیات خریدهای قبلی."><article className="panel-card table-card"><div className="panel-heading"><div><span className="eyebrow">سوابق خرید</span><h3>آخرین سفارش‌ها</h3></div></div><div className="table-scroll"><table><thead><tr><th>شماره سفارش</th><th>تاریخ</th><th>مبلغ (تومان)</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>{recentOrders.slice(0,4).map(r=><tr key={r.code}><td className="ltr-code">{r.code}</td><td>{r.date}</td><td>{r.amount}</td><td><span className={`status status-${r.status.replaceAll(" ","")}`}>{r.status}</span></td><td><button className="table-action">جزئیات</button></td></tr>)}</tbody></table></div></article></PanelShell>;
}
