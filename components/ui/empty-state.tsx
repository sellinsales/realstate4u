import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  copy: string;
  action?: ReactNode;
  eyebrow?: string;
};

export function EmptyState({ title, copy, action, eyebrow = "No matching results" }: EmptyStateProps) {
  return (
    <div className="panel empty-state">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
      {action ? <div className="page-actions">{action}</div> : null}
    </div>
  );
}
