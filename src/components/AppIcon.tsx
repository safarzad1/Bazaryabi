import type { ReactNode } from "react";

type IconName = "dashboard" | "orders" | "products" | "users" | "reports" | "marketer" | "home" | "cart" | "profile" | "logout" | "refresh" | "eye" | "search" | "money" | "trend" | "check" | "clock";

const paths: Record<IconName, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  orders: <><path d="M6 3h12l2 4v14H4V7z"/><path d="M9 10h6M9 14h6"/></>,
  products: <><path d="M4 7l8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7"/><path d="M12 11v10"/></>,
  users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0114 0"/><circle cx="18" cy="9" r="3"/><path d="M17 21a6 6 0 015-5"/></>,
  reports: <><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/></>,
  marketer: <><circle cx="12" cy="7" r="4"/><path d="M5 21a7 7 0 0114 0"/><path d="M18 3l3 3"/></>,
  home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v11h14V10"/></>,
  cart: <><path d="M3 4h2l2 11h10l2-8H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></>,
  profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
  logout: <><path d="M10 5H5v14h5"/><path d="M13 8l4 4-4 4M8 12h9"/></>,
  refresh: <><path d="M20 6v5h-5"/><path d="M19 11a7 7 0 10-2 6"/></>,
  eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
  money: <><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="3"/></>,
  trend: <><path d="M3 18l6-6 4 4 8-9"/><path d="M16 7h5v5"/></>,
  check: <path d="M5 12l4 4 10-10"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
};

export default function AppIcon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
