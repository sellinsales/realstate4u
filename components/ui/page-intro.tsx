import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
  size?: "default" | "compact";
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
  size = "default",
}: PageIntroProps) {
  return (
    <section className={cn("page-intro", size === "compact" && "page-intro-compact", className)}>
      <div className={cn("page-intro-grid", !aside && "page-intro-grid-single", size === "compact" && "page-intro-grid-compact")}>
        <div className="page-intro-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className={cn("page-title", size === "compact" && "page-title-compact")}>{title}</h1>
          {description ? <p className={cn("page-copy", size === "compact" && "page-copy-compact")}>{description}</p> : null}
          {actions ? <div className="page-actions">{actions}</div> : null}
        </div>
        {aside ? <div className="page-intro-aside">{aside}</div> : null}
      </div>
    </section>
  );
}
