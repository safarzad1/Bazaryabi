export default function Loading({ text = "در حال بارگذاری..." }: { text?: string }) {
  return (
    <div className="app-loading" role="status" aria-live="polite">
      <span className="app-loading-spinner" />
      <span>{text}</span>
    </div>
  );
}
