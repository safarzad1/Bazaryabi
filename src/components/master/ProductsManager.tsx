"use client";

import { useMemo, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataGrid, { type GridColumn } from "@/components/ui/DataGrid";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { approvalOptions, brandSeed, categorySeed, productSeed, unitOptions, type ProductRow } from "@/lib/master-data";
import MasterToolbar from "./MasterToolbar";
import { TextField, ToggleField } from "./MasterFormFields";

const emptyProduct: ProductRow = {
  id: 0,
  code: "",
  barcode: "",
  title: "",
  categoryId: categorySeed[0]?.id ?? 1,
  brandId: brandSeed[0]?.id ?? 1,
  unitId: unitOptions[0]?.value ?? 1,
  weightValue: "",
  weightUnit: "گرم",
  packageType: "",
  qtyPerCarton: "1",
  imageUrl: "",
  approvalStatus: "DRAFT",
  active: true,
};

const approvalMeta: Record<ProductRow["approvalStatus"], { title: string; tone: "gray" | "orange" | "green" | "red" }> = {
  DRAFT: { title: "پیش‌نویس", tone: "gray" },
  PENDING: { title: "در انتظار تأیید", tone: "orange" },
  APPROVED: { title: "تأییدشده", tone: "green" },
  REJECTED: { title: "ردشده", tone: "red" },
};

export default function ProductsManager() {
  const [rows, setRows] = useState<ProductRow[]>(productSeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState<number | string>("ALL");
  const [brandFilter, setBrandFilter] = useState<number | string>("ALL");
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<ProductRow | null>(null);
  const { showToast } = useToast();

  const categoryOptions = categorySeed.map((item) => ({ value: item.id, label: item.title, description: item.code }));
  const brandOptions = brandSeed.filter((item) => item.active).map((item) => ({ value: item.id, label: item.title, description: item.code }));
  const categoryTitle = (id: number) => categorySeed.find((item) => item.id === id)?.title ?? "—";
  const brandTitle = (id: number) => brandSeed.find((item) => item.id === id)?.title ?? "—";

  const filtered = useMemo(() => rows.filter((row) => {
    const q = search.trim().toLocaleLowerCase("fa");
    const matchesSearch = !q || `${row.code} ${row.barcode} ${row.title}`.toLocaleLowerCase("fa").includes(q);
    const matchesStatus = status === "ALL" || (status === "ACTIVE" ? row.active : !row.active);
    const matchesCategory = categoryFilter === "ALL" || row.categoryId === Number(categoryFilter);
    const matchesBrand = brandFilter === "ALL" || row.brandId === Number(brandFilter);
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand;
  }), [rows, search, status, categoryFilter, brandFilter]);

  const columns: GridColumn<ProductRow>[] = [
    { key: "code", title: "کد کالا", sortable: true, render: (row) => <span className="ltr-code">{row.code}</span>, sortValue: (row) => row.code },
    { key: "title", title: "محصول", sortable: true, render: (row) => <div className="product-grid-title"><div className="product-thumb">{row.imageUrl ? <img src={row.imageUrl} alt="" /> : <span>{row.title.slice(0,1)}</span>}</div><div><strong>{row.title}</strong><small>{brandTitle(row.brandId)}</small></div></div>, sortValue: (row) => row.title },
    { key: "category", title: "دسته‌بندی", sortable: true, render: (row) => categoryTitle(row.categoryId), sortValue: (row) => categoryTitle(row.categoryId) },
    { key: "package", title: "بسته‌بندی", render: (row) => <span>{row.packageType || "—"} / {row.qtyPerCarton || "—"} در کارتن</span> },
    { key: "approval", title: "تأیید", render: (row) => <StatusBadge tone={approvalMeta[row.approvalStatus].tone}>{approvalMeta[row.approvalStatus].title}</StatusBadge> },
    { key: "status", title: "وضعیت", render: (row) => <StatusBadge tone={row.active ? "green" : "gray"}>{row.active ? "فعال" : "غیرفعال"}</StatusBadge> },
    { key: "actions", title: "عملیات", render: (row) => <div className="grid-actions"><button type="button" onClick={() => setEditing({ ...row })}>ویرایش</button><button type="button" className="danger-link" onClick={() => setDeleteRow(row)}>حذف</button></div> },
  ];

  const save = () => {
    if (!editing) return;
    if (!editing.code.trim() || !editing.title.trim()) return showToast("کد و نام محصول الزامی است.", "error");
    if (rows.some((row) => row.code.toLowerCase() === editing.code.toLowerCase() && row.id !== editing.id)) return showToast("کد محصول تکراری است.", "error");
    if (editing.id === 0) {
      const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;
      setRows((current) => [{ ...editing, id: nextId }, ...current]);
      showToast("محصول جدید ثبت شد.", "success");
    } else {
      setRows((current) => current.map((row) => row.id === editing.id ? { ...editing } : row));
      showToast("محصول ویرایش شد.", "success");
    }
    setEditing(null);
  };

  return <>
    <MasterToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} addLabel="محصول جدید" onAdd={() => setEditing({ ...emptyProduct })}>
      <AppSelect<number | string> value={categoryFilter} onChange={setCategoryFilter} compact options={[{ value: "ALL", label: "همه دسته‌ها" }, ...categoryOptions]} />
      <AppSelect<number | string> value={brandFilter} onChange={setBrandFilter} compact options={[{ value: "ALL", label: "همه برندها" }, ...brandOptions]} />
    </MasterToolbar>

    <section className="master-summary-grid product-summary-grid">
      <article><span>کل محصولات</span><strong>{rows.length.toLocaleString("fa-IR")}</strong><small>ثبت‌شده در کاتالوگ</small></article>
      <article><span>تأییدشده</span><strong>{rows.filter((row) => row.approvalStatus === "APPROVED").length.toLocaleString("fa-IR")}</strong><small>قابل نمایش برای مشتری</small></article>
      <article><span>نیازمند بررسی</span><strong>{rows.filter((row) => row.approvalStatus === "PENDING").length.toLocaleString("fa-IR")}</strong><small>منتظر تأیید مدیر</small></article>
      <article><span>غیرفعال</span><strong>{rows.filter((row) => !row.active).length.toLocaleString("fa-IR")}</strong><small>در فروش نمایش داده نمی‌شود</small></article>
    </section>

    <section className="panel-card table-card master-table-card">
      <div className="panel-heading"><div><span className="eyebrow">کاتالوگ مرکزی</span><h3>فهرست محصولات</h3></div><span className="muted-badge">{filtered.length.toLocaleString("fa-IR")} محصول</span></div>
      <DataGrid rows={filtered} columns={columns} rowKey={(row) => row.id} emptyTitle="محصولی با این فیلتر پیدا نشد" />
    </section>

    <Modal open={!!editing} title={editing?.id ? "ویرایش محصول" : "افزودن محصول"} onClose={() => setEditing(null)} width={900} footer={<><button type="button" className="secondary-button" onClick={() => setEditing(null)}>انصراف</button><button type="button" className="primary-button" onClick={save}>ذخیره محصول</button></>}>
      {editing ? <div className="product-form-layout">
        <div className="master-form-grid">
          <TextField label="کد محصول" value={editing.code} onChange={(value) => setEditing({ ...editing, code: value })} required dir="ltr" />
          <TextField label="بارکد" value={editing.barcode} onChange={(value) => setEditing({ ...editing, barcode: value })} dir="ltr" />
          <div className="form-span-2"><TextField label="نام محصول" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required /></div>
          <AppSelect<number> label="دسته‌بندی" value={editing.categoryId} onChange={(value) => setEditing({ ...editing, categoryId: value })} options={categoryOptions} />
          <AppSelect<number> label="برند" value={editing.brandId} onChange={(value) => setEditing({ ...editing, brandId: value })} options={brandOptions} />
          <AppSelect<number> label="واحد فروش" value={editing.unitId} onChange={(value) => setEditing({ ...editing, unitId: value })} options={unitOptions} searchable={false} />
          <TextField label="نوع بسته‌بندی" value={editing.packageType} onChange={(value) => setEditing({ ...editing, packageType: value })} placeholder="قوطی، پاکت، بطری..." />
          <TextField label="وزن / حجم" value={editing.weightValue} onChange={(value) => setEditing({ ...editing, weightValue: value })} type="number" dir="ltr" />
          <TextField label="واحد وزن / حجم" value={editing.weightUnit} onChange={(value) => setEditing({ ...editing, weightUnit: value })} placeholder="گرم، کیلوگرم، لیتر..." />
          <TextField label="تعداد در کارتن" value={editing.qtyPerCarton} onChange={(value) => setEditing({ ...editing, qtyPerCarton: value })} type="number" dir="ltr" />
          <AppSelect label="وضعیت تأیید" value={editing.approvalStatus} onChange={(value) => setEditing({ ...editing, approvalStatus: value as ProductRow["approvalStatus"] })} options={approvalOptions.map((item) => ({ value: item.value, label: item.label }))} searchable={false} />
          <div className="form-span-2"><TextField label="آدرس تصویر اصلی" value={editing.imageUrl} onChange={(value) => setEditing({ ...editing, imageUrl: value })} placeholder="/uploads/products/... یا https://..." dir="ltr" type="url" /></div>
          <div className="form-span-2 form-toggle-row"><ToggleField label="محصول فعال باشد" checked={editing.active} onChange={(value) => setEditing({ ...editing, active: value })} /></div>
        </div>
        <aside className="product-preview-card">
          <div className="product-preview-visual">{editing.imageUrl ? <img src={editing.imageUrl} alt={editing.title} /> : <span>{editing.title ? editing.title.slice(0,1) : "ک"}</span>}</div>
          <small>{brandTitle(editing.brandId)}</small>
          <strong>{editing.title || "نام محصول"}</strong>
          <p>{editing.weightValue ? `${editing.weightValue} ${editing.weightUnit}` : "وزن یا حجم"} • {editing.packageType || "نوع بسته‌بندی"}</p>
          <StatusBadge tone={approvalMeta[editing.approvalStatus].tone}>{approvalMeta[editing.approvalStatus].title}</StatusBadge>
        </aside>
      </div> : null}
    </Modal>

    <ConfirmDialog open={!!deleteRow} title="حذف محصول" message={deleteRow ? `محصول «${deleteRow.title}» حذف شود؟ در نسخه دیتابیسی، محصول دارای سابقه سفارش حذف فیزیکی نمی‌شود و فقط غیرفعال خواهد شد.` : ""} danger confirmText="حذف" onClose={() => setDeleteRow(null)} onConfirm={() => {
      if (!deleteRow) return;
      setRows((current) => current.filter((row) => row.id !== deleteRow.id));
      showToast("محصول از فهرست نمونه حذف شد.", "success");
      setDeleteRow(null);
    }} />
  </>;
}
