"use client";

import { useMemo, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataGrid, { type GridColumn } from "@/components/ui/DataGrid";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { categorySeed, type CategoryRow } from "@/lib/master-data";
import MasterToolbar from "./MasterToolbar";
import { TextField, ToggleField } from "./MasterFormFields";

const emptyCategory: CategoryRow = { id: 0, code: "", title: "", parentId: null, sortOrder: 10, active: true, productsCount: 0 };

export default function CategoriesManager() {
  const [rows, setRows] = useState<CategoryRow[]>(categorySeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [parentFilter, setParentFilter] = useState<number | string>("ALL");
  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<CategoryRow | null>(null);
  const { showToast } = useToast();

  const parentOptions = useMemo(() => rows.filter((row) => row.parentId === null).map((row) => ({ value: row.id, label: row.title })), [rows]);
  const titleById = (id: number | null) => id ? rows.find((row) => row.id === id)?.title ?? "—" : "دسته اصلی";
  const filtered = useMemo(() => rows.filter((row) => {
    const q = search.trim().toLocaleLowerCase("fa");
    const matchesSearch = !q || `${row.code} ${row.title}`.toLocaleLowerCase("fa").includes(q);
    const matchesStatus = status === "ALL" || (status === "ACTIVE" ? row.active : !row.active);
    const matchesParent = parentFilter === "ALL" || row.parentId === Number(parentFilter) || row.id === Number(parentFilter);
    return matchesSearch && matchesStatus && matchesParent;
  }), [rows, search, status, parentFilter]);

  const columns: GridColumn<CategoryRow>[] = [
    { key: "code", title: "کد", sortable: true, render: (row) => <span className="ltr-code">{row.code}</span>, sortValue: (row) => row.code },
    { key: "title", title: "عنوان دسته", sortable: true, render: (row) => <strong className="grid-primary-text">{row.title}</strong>, sortValue: (row) => row.title },
    { key: "parent", title: "دسته والد", sortable: true, render: (row) => titleById(row.parentId), sortValue: (row) => titleById(row.parentId) },
    { key: "sort", title: "ترتیب", sortable: true, render: (row) => row.sortOrder.toLocaleString("fa-IR"), sortValue: (row) => row.sortOrder },
    { key: "products", title: "تعداد کالا", sortable: true, render: (row) => row.productsCount.toLocaleString("fa-IR"), sortValue: (row) => row.productsCount },
    { key: "status", title: "وضعیت", render: (row) => <StatusBadge tone={row.active ? "green" : "gray"}>{row.active ? "فعال" : "غیرفعال"}</StatusBadge> },
    { key: "actions", title: "عملیات", render: (row) => <div className="grid-actions"><button type="button" onClick={() => setEditing({ ...row })}>ویرایش</button><button type="button" className="danger-link" onClick={() => setDeleteRow(row)}>حذف</button></div> },
  ];

  const save = () => {
    if (!editing) return;
    if (!editing.code.trim() || !editing.title.trim()) return showToast("کد و عنوان دسته‌بندی الزامی است.", "error");
    if (rows.some((row) => row.code.toLowerCase() === editing.code.toLowerCase() && row.id !== editing.id)) return showToast("کد دسته‌بندی تکراری است.", "error");
    if (editing.parentId === editing.id) return showToast("یک دسته نمی‌تواند والد خودش باشد.", "error");
    if (editing.id === 0) {
      const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;
      setRows((current) => [...current, { ...editing, id: nextId }]);
      showToast("دسته‌بندی جدید ثبت شد.", "success");
    } else {
      setRows((current) => current.map((row) => row.id === editing.id ? { ...editing } : row));
      showToast("دسته‌بندی ویرایش شد.", "success");
    }
    setEditing(null);
  };

  return <>
    <MasterToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} addLabel="دسته‌بندی جدید" onAdd={() => setEditing({ ...emptyCategory })}>
      <AppSelect<number | string> value={parentFilter} onChange={setParentFilter} compact options={[{ value: "ALL", label: "همه دسته‌ها" }, ...parentOptions]} />
    </MasterToolbar>

    <section className="category-overview">
      {rows.filter((row) => row.parentId === null).slice(0, 6).map((row, index) => <article key={row.id} className={`category-overview-card accent-${(index % 3) + 1}`}><div className="category-overview-number">{String(index + 1).padStart(2, "0")}</div><div><strong>{row.title}</strong><span>{row.productsCount.toLocaleString("fa-IR")} کالا</span></div></article>)}
    </section>

    <section className="panel-card table-card master-table-card">
      <div className="panel-heading"><div><span className="eyebrow">کاتالوگ کالا</span><h3>ساختار دسته‌بندی</h3></div><span className="muted-badge">{filtered.length.toLocaleString("fa-IR")} دسته</span></div>
      <DataGrid rows={filtered} columns={columns} rowKey={(row) => row.id} emptyTitle="دسته‌بندی پیدا نشد" />
    </section>

    <Modal open={!!editing} title={editing?.id ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"} onClose={() => setEditing(null)} width={690} footer={<><button type="button" className="secondary-button" onClick={() => setEditing(null)}>انصراف</button><button type="button" className="primary-button" onClick={save}>ذخیره دسته‌بندی</button></>}>
      {editing ? <div className="master-form-grid">
        <TextField label="کد دسته‌بندی" value={editing.code} onChange={(value) => setEditing({ ...editing, code: value })} required dir="ltr" />
        <TextField label="عنوان دسته‌بندی" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required />
        <AppSelect<number> label="دسته والد" value={editing.parentId} onChange={(value) => setEditing({ ...editing, parentId: value })} options={parentOptions.filter((item) => item.value !== editing.id)} placeholder="بدون والد / دسته اصلی" />
        <TextField label="ترتیب نمایش" value={String(editing.sortOrder)} onChange={(value) => setEditing({ ...editing, sortOrder: Number(value || 0) })} type="number" dir="ltr" />
        <div className="form-span-2 form-toggle-row"><ToggleField label="دسته‌بندی فعال باشد" checked={editing.active} onChange={(value) => setEditing({ ...editing, active: value })} /></div>
      </div> : null}
    </Modal>

    <ConfirmDialog open={!!deleteRow} title="حذف دسته‌بندی" message={deleteRow ? `دسته «${deleteRow.title}» حذف شود؟` : ""} danger confirmText="حذف" onClose={() => setDeleteRow(null)} onConfirm={() => {
      if (!deleteRow) return;
      if (deleteRow.productsCount > 0 || rows.some((row) => row.parentId === deleteRow.id)) {
        showToast("این دسته دارای کالا یا زیرگروه است و قابل حذف نیست؛ ابتدا آن را غیرفعال کنید.", "error");
        setDeleteRow(null);
        return;
      }
      setRows((current) => current.filter((row) => row.id !== deleteRow.id));
      showToast("دسته‌بندی حذف شد.", "success");
      setDeleteRow(null);
    }} />
  </>;
}
