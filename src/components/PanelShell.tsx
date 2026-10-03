"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppIcon from "./AppIcon";
import PageHeader from "./ui/PageHeader";
import PWAInstallPrompt from "./pwa/PWAInstallPrompt";

type Role = "admin" | "marketer" | "customer";
const menus = {
  admin: [
    ["/admin/dashboard","داشبورد","dashboard"],
    ["/admin/companies","شرکت‌ها و تأمین","users"],
    ["/admin/categories","دسته‌بندی‌ها","products"],
    ["/admin/brands","برندها","products"],
    ["/admin/products","محصولات","products"],
    ["#","سفارش‌ها","orders"],
    ["#","مشتریان","users"],
    ["#","بازاریاب‌ها","marketer"],
    ["/admin/reports","گزارشات","reports"],
  ],
  marketer: [
    ["/marketer/dashboard","داشبورد من","dashboard"], ["#","مشتریان من","users"], ["#","ثبت سفارش","orders"], ["/marketer/products","محصولات","products"], ["/marketer/reports","گزارش عملکرد","reports"],
  ],
  customer: [
    ["/customer/home","خانه","home"], ["/customer/products","محصولات","products"], ["#","سبد خرید","cart"], ["/customer/orders","سفارش‌های من","orders"], ["#","حساب کاربری","profile"],
  ],
} as const;

export default function PanelShell({ role, title, subtitle, children }: { role: Role; title: string; subtitle: string; children: React.ReactNode }) {
  const path = usePathname();
  const names = { admin: "مدیر سامانه", marketer: "علی رضایی", customer: "فروشگاه نمونه" };
  return <div className={`app-shell role-${role}`}>
    <aside className="sidebar">
      <div className="sidebar-brand"><div className="mini-logo">ب</div><div><strong>بازاریابی</strong><span>فروش و سفارش‌گیری</span></div></div>
      <nav>{menus[role].map(([href,label,icon])=><Link key={label} href={href} className={path===href ? "active" : href==="#" ? "disabled-link" : ""}><AppIcon name={icon} size={20}/><span>{label}</span></Link>)}</nav>
      <div className="sidebar-bottom"><Link href="/login"><AppIcon name="logout" size={20}/><span>خروج از سامانه</span></Link></div>
    </aside>
    <div className="app-main">
      <header className="topbar">
        <div className="mobile-brand"><div className="mini-logo">ب</div><strong>بازاریابی</strong></div>
        <div className="topbar-user"><div className="avatar">{names[role].slice(0,1)}</div><div><strong>{names[role]}</strong><span>{role==="admin" ? "مدیریت کل" : role==="marketer" ? "بازاریاب فروش" : "مشتری"}</span></div></div>
        <div className="topbar-actions"><PWAInstallPrompt/><button className="icon-button" type="button" aria-label="جست‌وجو"><AppIcon name="search" size={19}/></button><div className="date-pill">پنجشنبه ۲ مهر ۱۴۰۵</div></div>
      </header>
      <main className="content">
        <PageHeader eyebrow={`سامانه بازاریابی • ${role==="admin" ? "مدیریت" : role==="marketer" ? "پنل بازاریاب" : "خرید و سفارش"}`} title={title} subtitle={subtitle}/>
        {children}
      </main>
    </div>
  </div>;
}
