export default function EmptyState({
  title = "اطلاعاتی وجود ندارد",
  description = "برای این بخش هنوز رکوردی ثبت نشده است.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="app-empty-state">
      <div className="app-empty-icon">○</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
