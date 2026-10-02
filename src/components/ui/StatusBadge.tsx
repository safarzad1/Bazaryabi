export type StatusTone = "blue" | "green" | "orange" | "purple" | "red" | "gray";

export default function StatusBadge({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`app-status app-status-${tone}`}>{children}</span>;
}
