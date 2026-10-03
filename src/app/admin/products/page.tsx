import PanelShell from "@/components/PanelShell";
import ProductsManager from "@/components/master/ProductsManager";

export default function ProductsPage() {
  return <PanelShell role="admin" title="محصولات" subtitle="ثبت و مدیریت کاتالوگ محصولات، بسته‌بندی، برند، دسته و وضعیت تأیید."><ProductsManager /></PanelShell>;
}
