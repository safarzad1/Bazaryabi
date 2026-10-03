"use client";

import SearchInput from "@/components/ui/SearchInput";
import AppSelect from "@/components/ui/AppSelect";

export default function MasterToolbar({
  search,
  onSearch,
  status,
  onStatus,
  addLabel,
  onAdd,
  children,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  addLabel: string;
  onAdd: () => void;
  children?: React.ReactNode;
}) {
  return (
    <section className="master-toolbar">
      <div className="master-toolbar-main">
        <SearchInput value={search} onChange={onSearch} placeholder="جست‌وجو بر اساس کد یا عنوان..." />
        <AppSelect
          value={status}
          onChange={onStatus}
          searchable={false}
          compact
          options={[
            { value: "ALL", label: "همه وضعیت‌ها" },
            { value: "ACTIVE", label: "فعال" },
            { value: "INACTIVE", label: "غیرفعال" },
          ]}
        />
        {children}
      </div>
      <button type="button" className="primary-button master-add-button" onClick={onAdd}>+ {addLabel}</button>
    </section>
  );
}
