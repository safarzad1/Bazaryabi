"use client";

import { useMemo, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataGrid, { type GridColumn } from "@/components/ui/DataGrid";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { brandSeed, companySeed, type BrandRow } from "@/lib/master-data";
import MasterToolbar from "./MasterToolbar";
import { TextAreaField, TextField, ToggleField } from "./MasterFormFields";

const emptyBrand: BrandRow = { id: 0, code: "", title: "", companyId: null, description: "", featured: false, isNew: true, active: true, productsCount: 0 };

export default function BrandsManager() {
  const [rows, setRows] = useState<BrandRow[]>(brandSeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [companyFilter, setCompanyFilter] = useState<number | string>("ALL");
  const [editing, setEditing] = useState<BrandRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<BrandRow | null>(null);
  const { showToast } = useToast();

  const companyOptions = companySeed.map((company) => ({ value: company.id, label: company.title, description: company.code }));
  const companyTitle = (id: number | null) => companySeed.find((company) => company.id === id)?.title ?? "—";
  const filtered = useMemo(() => rows.filter((row) => {
    const q = search.trim().toLocaleLowerCase("fa");
    const matchesSearch = !q || `${row.code} ${row.title} ${row.description}`.toLocaleLowerCase("fa").includes(q);
    const matchesStatus = status === "ALL" || (status === "ACTIVE" ? row.active : !row.active);
    const matchesCompany = companyFilter === "ALL" || row.companyId === Number(companyFilter);
    return matchesSearch && matchesStatus && matchesCompany;
  }), [rows, search, status, companyFilter]);

  const columns: GridColumn<BrandRow>[] = [
    { key: "code", title: "کد", sortable: true, render: (row) => <span className="ltr-code">{row.code}</span>, sortValue: (row) => row.code },
    { key: "title", title: "برند", sortable: true, render: (row) => <div className="brand-grid-title"><span>{row.title.slice(0,1)}</span><strong>{row.title}</strong></div>, sortValue: (row) => row.title },
    { key: "company", title: "مالک / تولیدکننده", sortable: true, render: (row) => companyTitle(row.companyId), sortValue: (row) => companyTitle(row.companyId) },
    { key: "products", title: "محصول", sortable: true, render: (row) => row.productsCount.toLocaleString("fa-IR"), sortValue: (row) => row.productsCount },
    { key: "labels", title: "برچسب", render: (row) => <div className="mini-badges">{row.featured ? <StatusBadge tone="purple">برتر</StatusBadge> : null}{row.isNew ? <StatusBadge tone="orange">جدید</StatusBadge> : null}</div> },
    { key: "status", title: "وضعیت", render: (row) => <StatusBadge tone={row.active ? "green" : "gray"}>{row.active ? "فعال" : "غیرفعال"}</StatusBadge> },
    { key: "actions", title: "عملیات", render: (row) => <div className="grid-actions"><button type="button" onClick={() => setEditing({ ...row })}>ویرایش</button><button type="button" className="danger-link" onClick={() => setDeleteRow(row)}>حذف</button></div> },
  ];

  const save = () => {
    if (!editing) return;
    if (!editing.code.trim() || !editing.title.trim()) return showToast("کد و نام برند الزامی است.", "error");
    if (rows.some((row) => row.code.toLowerCase() === editing.code.toLowerCase() && row.id !== editing.id)) return showToast("کد برند تکراری است.", "error");
    if (editing.id === 0) {
      const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;
      setRows((current) => [{ ...editing, id: nextId }, ...current]);
      showToast("برند جدید ثبت شد.", "success");
    } else {
      setRows((current) => current.map((row) => row.id === editing.id ? { ...editing } : row));
      showToast("اطلاعات برند ویرایش شد.", "success");
    }
    setEditing(null);
  };

  return <>
    <MasterToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} addLabel="برند جدید" onAdd={() => setEditing({ ...emptyBrand })}>
      <AppSelect<number | string> value={companyFilter} onChange={setCompanyFilter} compact options={[{ value: "ALL", label: "همه شرکت‌ها" }, ...companyOptions]} />
    </MasterToolbar>

    <section className="brand-showcase-grid">
      {rows.filter((row) => row.active).slice(0,4).map((row, index) => <article key={row.id} className={`brand-showcase accent-${(index % 3)+1}`}><div className="brand-logo-placeholder">{row.title.slice(0,1)}</div><div><strong>{row.title}</strong><span>{companyTitle(row.companyId)}</span></div><b>{row.productsCount.toLocaleString("fa-IR")} محصول</b></article>)}
    </section>

    <section className="panel-card table-card master-table-card">
      <div className="panel-heading"><div><span className="eyebrow">هویت برند</span><h3>فهرست برندها</h3></div><span className="muted-badge">{filtered.length.toLocaleString("fa-IR")} برند</span></div>
      <DataGrid rows={filtered} columns={columns} rowKey={(row) => row.id} emptyTitle="برندی پیدا نشد" />
    </section>

    <Modal open={!!editing} title={editing?.id ? "ویرایش برند" : "افزودن برند"} onClose={() => setEditing(null)} width={760} footer={<><button type="button" className="secondary-button" onClick={() => setEditing(null)}>انصراف</button><button type="button" className="primary-button" onClick={save}>ذخیره برند</button></>}>
      {editing ? <div className="master-form-grid">
        <TextField label="کد برند" value={editing.code} onChange={(value) => setEditing({ ...editing, code: value })} required dir="ltr" />
        <TextField label="نام برند" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required />
        <div className="form-span-2"><AppSelect<number> label="شرکت مالک / تولیدکننده" value={editing.companyId} onChange={(value) => setEditing({ ...editing, companyId: value })} options={companyOptions} placeholder="شرکت مرتبط را انتخاب کنید" /></div>
        <TextAreaField label="معرفی کوتاه برند" value={editing.description} onChange={(value) => setEditing({ ...editing, description: value })} placeholder="توضیحی که در صفحه برند برای مشتری نمایش داده می‌شود..." />
        <div className="form-span-2 form-toggle-row"><ToggleField label="برند فعال" checked={editing.active} onChange={(value) => setEditing({ ...editing, active: value })} /><ToggleField label="برند برتر" checked={editing.featured} onChange={(value) => setEditing({ ...editing, featured: value })} /><ToggleField label="برند جدید" checked={editing.isNew} onChange={(value) => setEditing({ ...editing, isNew: value })} /></div>
      </div> : null}
    </Modal>

    <ConfirmDialog open={!!deleteRow} title="حذف برند" message={deleteRow ? `برند «${deleteRow.title}» حذف شود؟` : ""} danger confirmText="حذف" onClose={() => setDeleteRow(null)} onConfirm={() => {
      if (!deleteRow) return;
      if (deleteRow.productsCount > 0) {
        showToast("برند دارای محصول است و قابل حذف نیست؛ آن را غیرفعال کنید.", "error");
        setDeleteRow(null);
        return;
      }
      setRows((current) => current.filter((row) => row.id !== deleteRow.id));
      showToast("برند حذف شد.", "success");
      setDeleteRow(null);
    }} />
  </>;
}
