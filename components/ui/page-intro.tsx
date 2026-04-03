import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: PageIntroProps) {
  return (
    <section className={cn("page-intro", className)}>
      <div className={cn("page-intro-grid", !aside && "page-intro-grid-single")}>
        <div className="page-intro-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-title">{title}</h1>
          {description ? <p className="page-copy">{description}</p> : null}
          {actions ? <div className="page-actions">{actions}</div> : null}
        </div>
        {aside ? <div className="page-intro-aside">{aside}</div> : null}
      </div>
    </section>
  );
}
