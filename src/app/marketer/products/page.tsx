import PanelShell from "@/components/PanelShell";
import ProductCatalog from "@/components/catalog/ProductCatalog";

export default function MarketerProductsPage() {
  return <PanelShell role="marketer" title="کاتالوگ محصولات" subtitle="مشاهده سریع کالاهای قابل فروش برای معرفی و ثبت سفارش مشتریان."><ProductCatalog mode="marketer" /></PanelShell>;
}
