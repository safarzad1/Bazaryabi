"use client";

import { useMemo, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import { brandSeed, categorySeed, productSeed } from "@/lib/master-data";

export default function ProductCatalog({ mode }: { mode: "customer" | "marketer" }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<number | string>("ALL");
  const [brand, setBrand] = useState<number | string>("ALL");

  const rows = useMemo(() => productSeed.filter((row) => {
    const q = search.trim().toLocaleLowerCase("fa");
    return row.active && row.approvalStatus === "APPROVED" &&
      (!q || `${row.title} ${row.code} ${row.barcode}`.toLocaleLowerCase("fa").includes(q)) &&
      (category === "ALL" || row.categoryId === Number(category)) &&
      (brand === "ALL" || row.brandId === Number(brand));
  }), [search, category, brand]);

  const categoryTitle = (id: number) => categorySeed.find((item) => item.id === id)?.title ?? "—";
  const brandTitle = (id: number) => brandSeed.find((item) => item.id === id)?.title ?? "—";

  return <>
    <section className="catalog-filter-bar">
      <SearchInput value={search} onChange={setSearch} placeholder="نام محصول، کد یا بارکد..." />
      <AppSelect<number | string> value={category} onChange={setCategory} compact options={[{ value: "ALL", label: "همه دسته‌ها" }, ...categorySeed.filter((item) => item.active).map((item) => ({ value: item.id, label: item.title }))]} />
      <AppSelect<number | string> value={brand} onChange={setBrand} compact options={[{ value: "ALL", label: "همه برندها" }, ...brandSeed.filter((item) => item.active).map((item) => ({ value: item.id, label: item.title }))]} />
      <span className="catalog-result-count">{rows.length.toLocaleString("fa-IR")} محصول</span>
    </section>

    <section className="catalog-products-grid">
      {rows.map((product, index) => <article className={`catalog-product-card product-tone-${(index % 3)+1}`} key={product.id}>
        <div className="catalog-product-image">{product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <span>{product.title.slice(0,1)}</span>}<b>{brandTitle(product.brandId)}</b></div>
        <div className="catalog-product-body">
          <small>{categoryTitle(product.categoryId)}</small>
          <h3>{product.title}</h3>
          <p>{product.weightValue} {product.weightUnit} • {product.packageType} • {product.qtyPerCarton} عدد در کارتن</p>
          <div className="catalog-product-meta"><StatusBadge tone="green">قابل سفارش</StatusBadge><span className="ltr-code">{product.code}</span></div>
          <button type="button" className="primary-button catalog-product-action">{mode === "marketer" ? "ثبت برای مشتری" : "مشاهده و مقایسه"}</button>
        </div>
      </article>)}
    </section>
  </>;
}
