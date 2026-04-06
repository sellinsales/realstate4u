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
