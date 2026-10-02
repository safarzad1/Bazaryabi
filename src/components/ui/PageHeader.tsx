import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-header-compact">
      <div className="page-header-copy">
        {eyebrow ? <span className="page-header-chip">{eyebrow}</span> : null}
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
      <div className="page-header-shape page-header-shape-a" />
      <div className="page-header-shape page-header-shape-b" />
    </section>
  );
}
