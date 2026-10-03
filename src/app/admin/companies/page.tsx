import PanelShell from "@/components/PanelShell";
import CompaniesManager from "@/components/master/CompaniesManager";

export default function CompaniesPage() {
  return <PanelShell role="admin" title="شرکت‌ها و تأمین‌کنندگان" subtitle="مدیریت تولیدکنندگان، شرکت‌های پخش و تأمین‌کنندگان سامانه."><CompaniesManager /></PanelShell>;
}
