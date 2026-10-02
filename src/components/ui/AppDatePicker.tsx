"use client";

import InlinePersianDatePicker from "@/components/InlinePersianDatePicker/InlinePersianDatePicker";

export default function AppDatePicker({
  label,
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  allowPastDates = true,
  disabled = false,
  className = "",
}: {
  label?: string;
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  allowPastDates?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={`app-field ${className}`}>
      {label ? <span className="app-field-label">{label}</span> : null}
      <InlinePersianDatePicker
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        allowPastDates={allowPastDates}
        disabled={disabled}
        ariaLabel={label ?? "تاریخ"}
      />
    </label>
  );
}
