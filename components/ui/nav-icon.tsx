type NavIconName =
  | "home"
  | "search"
  | "spark"
  | "demand"
  | "service"
  | "jobs"
  | "queue"
  | "list"
  | "plan"
  | "project"
  | "guide"
  | "commercial"
  | "plot"
  | "apartment"
  | "villa"
  | "farm"
  | "map"
  | "chart"
  | "arrow";

export function NavIcon({ name, className = "h-4 w-4" }: { name: NavIconName; className?: string }) {
  const shared = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...shared}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "search":
      return (
        <svg {...shared}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...shared}>
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
          <path d="m18.5 15 .7 1.8L21 17.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
        </svg>
      );
    case "demand":
      return (
        <svg {...shared}>
          <path d="M4 7h16" />
          <path d="M4 12h12" />
          <path d="M4 17h9" />
          <path d="M18.5 15.5 21 18l-2.5 2.5" />
        </svg>
      );
    case "service":
      return (
        <svg {...shared}>
          <path d="m14 6 4 4" />
          <path d="m9 19-5-5 8.5-8.5a2.8 2.8 0 0 1 4 0l2 2a2.8 2.8 0 0 1 0 4Z" />
          <path d="m7 16 2 2" />
        </svg>
      );
    case "jobs":
      return (
        <svg {...shared}>
          <path d="M4 8.5h16V19H4z" />
          <path d="M8 8.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5" />
          <path d="M4 12h16" />
          <path d="M11 12v2h2v-2" />
        </svg>
      );
    case "queue":
      return (
        <svg {...shared}>
          <path d="M5 6h14" />
          <path d="M5 12h10" />
          <path d="M5 18h6" />
          <circle cx="18" cy="12" r="3" />
        </svg>
      );
    case "list":
      return (
        <svg {...shared}>
          <path d="M8 6h11" />
          <path d="M8 12h11" />
          <path d="M8 18h11" />
          <path d="M4 6h.01" />
          <path d="M4 12h.01" />
          <path d="M4 18h.01" />
        </svg>
      );
    case "plan":
      return (
        <svg {...shared}>
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
          <path d="M12 4v16" />
          <path d="M4 10h8" />
          <path d="M12 14h8" />
        </svg>
      );
    case "project":
      return (
        <svg {...shared}>
          <path d="M4 20V8l5-3 5 3v12" />
          <path d="M14 20V4l6 3v13" />
          <path d="M8 11h1" />
          <path d="M8 15h1" />
          <path d="M17 11h1" />
          <path d="M17 15h1" />
        </svg>
      );
    case "guide":
      return (
        <svg {...shared}>
          <path d="M6 4.5h9a3 3 0 0 1 3 3V19H9a3 3 0 0 0-3 3Z" />
          <path d="M6 4.5v17" />
          <path d="M9.5 8.5h5" />
          <path d="M9.5 12h5" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...shared}>
          <path d="M5 20V7l7-3 7 3v13" />
          <path d="M9 20v-4h6v4" />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
          <path d="M9 13h.01" />
          <path d="M15 13h.01" />
        </svg>
      );
    case "plot":
      return (
        <svg {...shared}>
          <path d="M4 6h16v12H4z" />
          <path d="M8 6v12" />
          <path d="M4 12h16" />
          <path d="m4 6 16 12" />
        </svg>
      );
    case "apartment":
      return (
        <svg {...shared}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h.01" />
          <path d="M15 8h.01" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M11 20v-3h2v3" />
        </svg>
      );
    case "villa":
      return (
        <svg {...shared}>
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10.5V20h14v-9.5" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case "farm":
      return (
        <svg {...shared}>
          <path d="M4 20h16" />
          <path d="M6 20v-8l5-3 5 3v8" />
          <path d="M15 7c0-1.7 1.3-3 3-3" />
          <path d="M18 4v5" />
        </svg>
      );
    case "map":
      return (
        <svg {...shared}>
          <path d="M9 5 15 3l5 2v14l-5-2-6 2-5-2V3z" />
          <path d="M9 5v14" />
          <path d="M15 3v14" />
        </svg>
      );
    case "chart":
      return (
        <svg {...shared}>
          <path d="M4 20h16" />
          <path d="M7 16v-4" />
          <path d="M12 16V8" />
          <path d="M17 16v-7" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...shared}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
