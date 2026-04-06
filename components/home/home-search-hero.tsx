"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavIcon } from "@/components/ui/nav-icon";
import { cn } from "@/lib/utils";

export function HomeSearchHero() {
  const router = useRouter();
  const [marketCode, setMarketCode] = useState("ANY");
  const [listingType, setListingType] = useState("BUY");
  const [propertyType, setPropertyType] = useState("ANY");
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (marketCode !== "ANY") {
      params.set("marketCode", marketCode);
    }

    if (listingType !== "ANY") {
      params.set("listingType", listingType);
    }

    if (propertyType !== "ANY") {
      params.set("propertyType", propertyType);
    }

    if (query.trim()) {
      params.set("city", query.trim());
    }

    router.push(params.size ? `/properties?${params.toString()}` : "/properties");
  }

  return (
    <div className="hero-search-shell">
      <div className="panel hero-search-card">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
          Search listings
        </p>
        <h2 className="utility-card-title mt-3">Find homes, plots, rentals, and commercial property fast.</h2>
        <p className="utility-card-copy">Start with market, city, property type, and buy or rent intent. Everything here leads straight into live listings.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { value: "BUY", label: "Buy", icon: "search" as const },
            { value: "RENT", label: "Rent", icon: "queue" as const },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn("hero-search-chip", listingType === option.value && "hero-search-chip-active")}
              onClick={() => setListingType(option.value)}
            >
              <NavIcon name={option.icon} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <div className="grid gap-3 md:grid-cols-3">
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
              <label htmlFor="hero-property-type" className="field-label">
                Property type
              </label>
              <select
                id="hero-property-type"
                className="field"
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
              >
                <option value="ANY">All property types</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="PLOT">Plot</option>
                <option value="OFFICE">Office</option>
                <option value="SHOP">Shop</option>
                <option value="ROOM">Room</option>
              </select>
            </div>

            <div>
              <label htmlFor="hero-open-route" className="field-label">
                Quick route
              </label>
              <select
                id="hero-open-route"
                className="field"
                value={listingType}
                onChange={(event) => setListingType(event.target.value)}
              >
                <option value="BUY">For sale</option>
                <option value="RENT">For rent</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="hero-query" className="field-label">
              City or location
            </label>
            <input
              id="hero-query"
              className="field"
              value={query}
              placeholder="Lahore, Karachi, Stockholm, Gothenburg"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
              <Link href="/post-property" className="pill">Post property</Link>
              <Link href="/smart-match" className="pill">Smart Match</Link>
              <Link href="/queue-housing" className="pill">Rental queue</Link>
            </div>
            <button type="submit" className="btn-primary">
              Search property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
