import PanelShell from "@/components/PanelShell";
import BrandsManager from "@/components/master/BrandsManager";

export default function BrandsPage() {
  return <PanelShell role="admin" title="برندها" subtitle="مدیریت برندها، شرکت مالک، برچسب‌های ویژه و وضعیت انتشار."><BrandsManager /></PanelShell>;
}
