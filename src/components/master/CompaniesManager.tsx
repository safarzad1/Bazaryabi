"use client";

import { useMemo, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataGrid, { type GridColumn } from "@/components/ui/DataGrid";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";
import { companySeed, companyTypeOptions, type CompanyRow, type CompanyTypeCode } from "@/lib/master-data";
import MasterToolbar from "./MasterToolbar";
import { TextField, ToggleField } from "./MasterFormFields";

const emptyCompany: CompanyRow = {
  id: 0,
  code: "",
  title: "",
  type: "MANUFACTURER",
  nationalId: "",
  mobile: "",
  city: "",
  active: true,
  brandsCount: 0,
  productsCount: 0,
};

const typeTitle = (value: CompanyTypeCode) => companyTypeOptions.find((item) => item.value === value)?.label ?? value;

export default function CompaniesManager() {
  const [rows, setRows] = useState<CompanyRow[]>(companySeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [editing, setEditing] = useState<CompanyRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<CompanyRow | null>(null);
  const { showToast } = useToast();

  const filtered = useMemo(() => rows.filter((row) => {
    const q = search.trim().toLocaleLowerCase("fa");
    const matchesSearch = !q || `${row.code} ${row.title} ${row.nationalId} ${row.mobile} ${row.city}`.toLocaleLowerCase("fa").includes(q);
    const matchesStatus = status === "ALL" || (status === "ACTIVE" ? row.active : !row.active);
    const matchesType = typeFilter === "ALL" || row.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  }), [rows, search, status, typeFilter]);

  const columns: GridColumn<CompanyRow>[] = [
    { key: "code", title: "کد", sortable: true, render: (row) => <span className="ltr-code">{row.code}</span>, sortValue: (row) => row.code },
    { key: "title", title: "نام شرکت", sortable: true, render: (row) => <strong className="grid-primary-text">{row.title}</strong>, sortValue: (row) => row.title },
    { key: "type", title: "نوع فعالیت", sortable: true, render: (row) => typeTitle(row.type), sortValue: (row) => typeTitle(row.type) },
    { key: "mobile", title: "موبایل", render: (row) => <span className="ltr-code">{row.mobile || "—"}</span> },
    { key: "city", title: "شهر", sortable: true, render: (row) => row.city || "—", sortValue: (row) => row.city },
    { key: "brands", title: "برند", sortable: true, render: (row) => row.brandsCount, sortValue: (row) => row.brandsCount },
    { key: "products", title: "کالا", sortable: true, render: (row) => row.productsCount, sortValue: (row) => row.productsCount },
    { key: "status", title: "وضعیت", render: (row) => <StatusBadge tone={row.active ? "green" : "gray"}>{row.active ? "فعال" : "غیرفعال"}</StatusBadge> },
    { key: "actions", title: "عملیات", render: (row) => <div className="grid-actions"><button type="button" onClick={() => setEditing({ ...row })}>ویرایش</button><button type="button" className="danger-link" onClick={() => setDeleteRow(row)}>حذف</button></div> },
  ];

  const save = () => {
    if (!editing) return;
    if (!editing.code.trim() || !editing.title.trim()) {
      showToast("کد و نام شرکت الزامی است.", "error");
      return;
    }
    const duplicate = rows.some((row) => row.code.trim().toLowerCase() === editing.code.trim().toLowerCase() && row.id !== editing.id);
    if (duplicate) {
      showToast("کد شرکت تکراری است.", "error");
      return;
    }
    if (editing.id === 0) {
      const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;
      setRows((current) => [{ ...editing, id: nextId }, ...current]);
      showToast("شرکت جدید ثبت شد.", "success");
    } else {
      setRows((current) => current.map((row) => row.id === editing.id ? { ...editing } : row));
      showToast("اطلاعات شرکت ویرایش شد.", "success");
    }
    setEditing(null);
  };

  return <>
    <MasterToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} addLabel="شرکت جدید" onAdd={() => setEditing({ ...emptyCompany })}>
      <AppSelect value={typeFilter} onChange={setTypeFilter} compact options={[{ value: "ALL", label: "همه انواع شرکت" }, ...companyTypeOptions.map((item) => ({ value: item.value, label: item.label }))]} />
    </MasterToolbar>

    <section className="master-summary-grid">
      <article><span>کل شرکت‌ها</span><strong>{rows.length.toLocaleString("fa-IR")}</strong><small>تولیدکننده، پخش و تأمین‌کننده</small></article>
      <article><span>تولیدکننده فعال</span><strong>{rows.filter((row) => row.type === "MANUFACTURER" && row.active).length.toLocaleString("fa-IR")}</strong><small>دارای امکان تعریف برند و محصول</small></article>
      <article><span>شرکت پخش فعال</span><strong>{rows.filter((row) => row.type === "DISTRIBUTOR" && row.active).length.toLocaleString("fa-IR")}</strong><small>برای پوشش توزیع و سفارش</small></article>
    </section>

    <section className="panel-card table-card master-table-card">
      <div className="panel-heading"><div><span className="eyebrow">سازمان‌ها و تأمین</span><h3>فهرست شرکت‌ها</h3></div><span className="muted-badge">{filtered.length.toLocaleString("fa-IR")} مورد</span></div>
      <DataGrid rows={filtered} columns={columns} rowKey={(row) => row.id} emptyTitle="شرکتی با این فیلتر پیدا نشد" />
    </section>

    <Modal open={!!editing} title={editing?.id ? "ویرایش شرکت" : "افزودن شرکت"} onClose={() => setEditing(null)} width={760} footer={<><button type="button" className="secondary-button" onClick={() => setEditing(null)}>انصراف</button><button type="button" className="primary-button" onClick={save}>ذخیره اطلاعات</button></>}>
      {editing ? <div className="master-form-grid">
        <TextField label="کد شرکت" value={editing.code} onChange={(value) => setEditing({ ...editing, code: value })} placeholder="CMP-005" required dir="ltr" />
        <TextField label="نام شرکت" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required />
        <AppSelect label="نوع فعالیت اصلی" value={editing.type} onChange={(value) => setEditing({ ...editing, type: value as CompanyTypeCode })} options={companyTypeOptions.map((item) => ({ value: item.value, label: item.label }))} />
        <TextField label="شناسه ملی" value={editing.nationalId} onChange={(value) => setEditing({ ...editing, nationalId: value })} dir="ltr" />
        <TextField label="شماره موبایل" value={editing.mobile} onChange={(value) => setEditing({ ...editing, mobile: value })} dir="ltr" />
        <TextField label="شهر" value={editing.city} onChange={(value) => setEditing({ ...editing, city: value })} />
        <div className="form-span-2 form-toggle-row"><ToggleField label="شرکت فعال باشد" checked={editing.active} onChange={(value) => setEditing({ ...editing, active: value })} /></div>
      </div> : null}
    </Modal>

    <ConfirmDialog open={!!deleteRow} title="حذف شرکت" message={deleteRow ? `شرکت «${deleteRow.title}» حذف شود؟ در نسخه متصل به دیتابیس، شرکت دارای برند یا سفارش قابل حذف مستقیم نخواهد بود.` : ""} danger confirmText="حذف" onClose={() => setDeleteRow(null)} onConfirm={() => {
      if (!deleteRow) return;
      setRows((current) => current.filter((row) => row.id !== deleteRow.id));
      showToast("شرکت حذف شد.", "success");
      setDeleteRow(null);
    }} />
  </>;
}
