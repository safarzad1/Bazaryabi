import PanelShell from "@/components/PanelShell";
import AppIcon from "@/components/AppIcon";

const categories = ["مواد غذایی","حبوبات و بسته‌بندی","تنقلات","لبنیات","نوشیدنی‌ها","شوینده و بهداشتی"];
const products = [
  ["رب گوجه ۸۰۰ گرمی","برند آفتاب","۶۸٬۵۰۰ تومان","۱۲ عدد در کارتن","blue"],
  ["روغن ۱.۵ لیتری","برند سپهر","۱۲۴٬۰۰۰ تومان","۶ عدد در کارتن","purple"],
  ["تن ماهی ۱۸۰ گرمی","برند ساحل","۹۷٬۰۰۰ تومان","۲۴ عدد در کارتن","orange"],
];
export default function CustomerHome() {
  return <PanelShell role="customer" title="خرید آسان و مقایسه هوشمند" subtitle="برندها را ببینید، شرایط فروش را مقایسه کنید و سفارش خود را ثبت کنید.">
    <section className="customer-search"><AppIcon name="search" size={21}/><input placeholder="جستجوی محصول، برند یا دسته‌بندی..."/><button>جستجو</button></section>
    <section className="customer-categories"><div className="section-title"><div><span className="eyebrow">دسترسی سریع</span><h2>دسته‌بندی محصولات</h2></div></div><div className="category-grid">{categories.map((c,i)=><button key={c}><span>{i+1}</span><b>{c}</b></button>)}</div></section>
    <section><div className="section-title"><div><span className="eyebrow">پیشنهاد امروز</span><h2>محصولات منتخب</h2></div><button className="text-button">مشاهده همه</button></div><div className="product-grid">{products.map((p)=><article className={`product-card product-${p[4]}`} key={p[0]}><div className="product-visual"><AppIcon name="products" size={42}/><span>پیشنهاد ویژه</span></div><div className="product-body"><small>{p[1]}</small><h3>{p[0]}</h3><p>{p[3]}</p><div><strong>{p[2]}</strong><button><AppIcon name="cart" size={18}/> افزودن</button></div></div></article>)}</div></section>
  </PanelShell>;
}
