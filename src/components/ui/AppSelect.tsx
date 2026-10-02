"use client";

import SearchableDropdown from "@/components/Dropdown/SearchableDropdown";
import type { DropdownOption, DropdownValue } from "@/components/Dropdown/types";

export default function AppSelect<T extends DropdownValue = string>({
  label,
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  searchable = true,
  disabled = false,
  compact = false,
  className = "",
}: {
  label?: string;
  value: T | null | undefined;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <label className={`app-field ${className}`}>
      {label ? <span className="app-field-label">{label}</span> : null}
      <SearchableDropdown<T>
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        searchPlaceholder={searchable ? "جست‌وجو..." : ""}
        disabled={disabled}
        compact={compact}
        itemFontSize="13.5px"
        menuWidth={360}
      />
    </label>
  );
}
