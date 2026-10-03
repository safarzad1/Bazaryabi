export function TextField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  dir,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
  type?: "text" | "number" | "url";
}) {
  return (
    <label className="app-field">
      <span className="app-field-label">{label}{required ? <b className="required-star"> *</b> : null}</span>
      <input
        className="app-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        dir={dir}
        type={type}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="app-field form-span-2">
      <span className="app-field-label">{label}</span>
      <textarea className="app-textarea" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="app-toggle-field">
      <span>{label}</span>
      <button type="button" className={`app-toggle ${checked ? "active" : ""}`} onClick={() => onChange(!checked)} aria-pressed={checked}>
        <span />
      </button>
    </label>
  );
}
