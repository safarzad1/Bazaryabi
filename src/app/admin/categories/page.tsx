import PanelShell from "@/components/PanelShell";
import CategoriesManager from "@/components/master/CategoriesManager";

export default function CategoriesPage() {
  return <PanelShell role="admin" title="دسته‌بندی محصولات" subtitle="تعریف ساختار درختی دسته‌ها و زیرگروه‌های قابل توسعه بدون تغییر برنامه."><CategoriesManager /></PanelShell>;
}
