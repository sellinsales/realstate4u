"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NavIcon } from "@/components/ui/nav-icon";
import { cn } from "@/lib/utils";

type HeroTrack = "PROPERTY" | "SERVICES" | "JOBS" | "DEMAND";

const trackOptions: {
  value: HeroTrack;
  label: string;
  helper: string;
  icon: "search" | "service" | "jobs" | "demand";
}[] = [
  {
    value: "PROPERTY",
    label: "Property",
    helper: "Homes and commercial listings",
    icon: "search",
  },
  {
    value: "SERVICES",
    label: "Services",
    helper: "Maintenance and vendor support",
    icon: "service",
  },
  {
    value: "JOBS",
    label: "Jobs",
    helper: "Hiring and site work",
    icon: "jobs",
  },
  {
    value: "DEMAND",
    label: "Demand",
    helper: "Post what you need",
    icon: "demand",
  },
] as const;

export function HomeSearchHero() {
  const router = useRouter();
  const [track, setTrack] = useState<HeroTrack>("PROPERTY");
  const [marketCode, setMarketCode] = useState("ANY");
  const [listingType, setListingType] = useState("ANY");
  const [query, setQuery] = useState("");

  const helperCopy = useMemo(() => {
    switch (track) {
      case "PROPERTY":
        return "Search homes and investment property by city, market, and buy or rent intent.";
      case "SERVICES":
        return "Go straight to vendors, maintenance teams, movers, and property support partners.";
      case "JOBS":
        return "Open construction roles, site work, and project hiring opportunities.";
      case "DEMAND":
        return "Share a rental, buying, service, or investment requirement with the market.";
      default:
        return "";
    }
  }, [track]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (track === "PROPERTY") {
      const params = new URLSearchParams();

      if (marketCode !== "ANY") {
        params.set("marketCode", marketCode);
      }

      if (listingType !== "ANY") {
        params.set("listingType", listingType);
      }

      if (query.trim()) {
        params.set("city", query.trim());
      }

      router.push(params.size ? `/properties?${params.toString()}` : "/properties");
      return;
    }

    if (track === "SERVICES") {
      router.push("/services");
      return;
    }

    if (track === "JOBS") {
      router.push("/jobs");
      return;
    }

    router.push("/demand-board");
  }

  return (
    <div className="hero-search-shell">
      <div className="panel hero-search-card">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
          Start here
        </p>
        <h2 className="utility-card-title mt-3">What do you need today?</h2>
        <p className="utility-card-copy">{helperCopy}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {trackOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn("hero-search-chip", track === option.value && "hero-search-chip-active")}
              onClick={() => setTrack(option.value)}
            >
              <NavIcon name={option.icon} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="hero-market" className="field-label">
                Market
              </label>
              <select
                id="hero-market"
                className="field"
                value={marketCode}
                onChange={(event) => setMarketCode(event.target.value)}
              >
                <option value="ANY">All markets</option>
                <option value="PAKISTAN">Pakistan</option>
                <option value="SWEDEN">Sweden</option>
                <option value="EU">Europe</option>
              </select>
            </div>

            <div>
              <label htmlFor="hero-listing-type" className="field-label">
                Search intent
              </label>
              <select
                id="hero-listing-type"
                className="field"
                value={listingType}
                onChange={(event) => setListingType(event.target.value)}
                disabled={track !== "PROPERTY"}
              >
                <option value="ANY">Any</option>
                <option value="BUY">Buy</option>
                <option value="RENT">Rent</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="hero-query" className="field-label">
              {track === "PROPERTY" ? "City or location" : "Keyword"}
            </label>
            <input
              id="hero-query"
              className="field"
              value={query}
              placeholder={
                track === "PROPERTY"
                  ? "Lahore, Stockholm, Dubai Marina"
                  : track === "SERVICES"
                    ? "Maintenance, cleaning, moving"
                    : track === "JOBS"
                      ? "Site engineer, electrician, supervisor"
                      : "Family rental, investor brief, service request"
              }
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary">
              {track === "PROPERTY"
                ? "Search now"
                : track === "SERVICES"
                  ? "Open services"
                  : track === "JOBS"
                    ? "Open jobs"
                    : "Open demand board"}
            </button>
          </div>
        </form>
      </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="panel utility-card">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Popular today
            </p>
            <p className="utility-card-copy">
              Most buyers start with sale or rent search, then use AI Match or house-plan ideas to narrow what really fits.
            </p>
          </div>
          <div className="panel utility-card">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Quick route
            </p>
            <p className="utility-card-copy">
              If you are not looking for a live listing, jump straight to house plans, services, jobs, or the demand board.
            </p>
          </div>
        </div>
    </div>
  );
}
