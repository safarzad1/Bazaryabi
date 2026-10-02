"use client";

import AppIcon from "@/components/AppIcon";

export default function SearchInput({
  value,
  onChange,
  placeholder = "جست‌وجو...",
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}) {
  return (
    <div className="app-search-input">
      <AppIcon name="search" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit?.();
        }}
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} aria-label="پاک کردن جست‌وجو">
          ×
        </button>
      ) : null}
    </div>
  );
}
