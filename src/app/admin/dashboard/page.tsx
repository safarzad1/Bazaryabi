import PanelShell from "@/components/PanelShell";
import { KpiGrid, OrdersBarChart, RecentOrders, SalesChart, StatusDonut } from "@/components/DashboardWidgets";
import { adminKpis } from "@/lib/demo-data";

export default function AdminDashboard() {
  return <PanelShell role="admin" title="داشبورد مدیریتی" subtitle="نمای کلی فروش، سفارش‌ها، مشتریان و عملکرد شبکه بازاریابی.">
    <KpiGrid items={adminKpis}/>
    <section className="dashboard-grid wide-left"><SalesChart/><OrdersBarChart/></section>
    <section className="dashboard-grid wide-right"><StatusDonut/><RecentOrders/></section>
  </PanelShell>;
}
