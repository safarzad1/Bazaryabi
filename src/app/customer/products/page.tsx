import PanelShell from "@/components/PanelShell";
import ProductCatalog from "@/components/catalog/ProductCatalog";

export default function CustomerProductsPage() {
  return <PanelShell role="customer" title="محصولات و برندها" subtitle="محصولات تأییدشده را جست‌وجو کنید و برای مقایسه یا سفارش انتخاب کنید."><ProductCatalog mode="customer" /></PanelShell>;
}
