import Link from "next/link";
import type { Route } from "next";
import { FILTER_OPTIONS } from "@/lib/demo-data";
import type { PropertyFilters } from "@/lib/types";

export function SearchFilters({ filters }: { filters: PropertyFilters }) {
  const buildFilterHref = (listingType?: string): Route => {
    const params = new URLSearchParams();

    if (filters.country) {
      params.set("country", filters.country);
    }
    if (filters.city) {
      params.set("city", filters.city);
    }
    if (filters.propertyType) {
      params.set("propertyType", filters.propertyType);
    }
    if (filters.minPrice) {
      params.set("minPrice", String(filters.minPrice));
    }
    if (filters.marketCode) {
      params.set("marketCode", filters.marketCode);
    }
    if (filters.maxPrice) {
      params.set("maxPrice", String(filters.maxPrice));
    }
    if (filters.minArea) {
      params.set("minArea", String(filters.minArea));
    }
    if (filters.bedrooms) {
      params.set("bedrooms", String(filters.bedrooms));
    }
    if (listingType) {
      params.set("listingType", listingType);
    }

    const query = params.toString();
    return (query ? `/properties?${query}` : "/properties") as Route;
  };

  const propertyTypeLabel = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();
  const listingTypeLabel = (value: string) => (value === "BUY" ? "For sale" : "For rent");

  return (
    <form className="panel grid gap-4 rounded-[2rem] p-5 lg:grid-cols-8">
      <div className="flex flex-col gap-3 border-b border-[var(--brand-line)] pb-4 lg:col-span-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
            Refine search
          </p>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Choose whether the search is for sale or rent first, then narrow the property feed by market, location,
            type, and budget.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildFilterHref()}
              className={`search-intent-pill ${!filters.listingType ? "search-intent-pill-active" : ""}`}
            >
              All property listings
            </Link>
            <Link
              href={buildFilterHref("BUY")}
              className={`search-intent-pill ${filters.listingType === "BUY" ? "search-intent-pill-active" : ""}`}
            >
              For sale
            </Link>
            <Link
              href={buildFilterHref("RENT")}
              className={`search-intent-pill ${filters.listingType === "RENT" ? "search-intent-pill-active" : ""}`}
            >
              For rent
            </Link>
          </div>
        </div>
        <div className="status-note status-note-warning max-w-xl">
          Property Search is only for listings. If you need contractors, maintenance, or staffing instead, use{" "}
          <Link href="/services" className="font-semibold text-[var(--brand-blue)]">
            Home Services
          </Link>{" "}
          or{" "}
          <Link href="/jobs" className="font-semibold text-[var(--brand-blue)]">
            Construction Jobs
          </Link>
          .
        </div>
      </div>
      <div>
        <label htmlFor="listingType" className="field-label">
          Search purpose
        </label>
        <select id="listingType" name="listingType" defaultValue={filters.listingType || ""} className="field">
          <option value="">Buy or rent</option>
          {FILTER_OPTIONS.listingTypes.map((option) => (
            <option key={option} value={option}>
              {listingTypeLabel(option)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="marketCode" className="field-label">
          Market focus
        </label>
        <select id="marketCode" name="marketCode" defaultValue={filters.marketCode || ""} className="field">
          <option value="">All markets</option>
          <option value="SWEDEN">Sweden</option>
          <option value="EU">Europe</option>
          <option value="PAKISTAN">Pakistan</option>
        </select>
      </div>
      <div>
        <label htmlFor="country" className="field-label">
          Country
        </label>
        <select id="country" name="country" defaultValue={filters.country || ""} className="field">
          <option value="">All countries</option>
          {FILTER_OPTIONS.countries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className="field-label">
          City
        </label>
        <select id="city" name="city" defaultValue={filters.city || ""} className="field">
          <option value="">All cities</option>
          {FILTER_OPTIONS.cities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="propertyType" className="field-label">
          Property type
        </label>
        <select id="propertyType" name="propertyType" defaultValue={filters.propertyType || ""} className="field">
          <option value="">Property type</option>
          {FILTER_OPTIONS.propertyTypes.map((option) => (
            <option key={option} value={option}>
              {propertyTypeLabel(option)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="minPrice" className="field-label">
          Min price
        </label>
        <input
          id="minPrice"
          name="minPrice"
          type="number"
          min={0}
          defaultValue={filters.minPrice || ""}
          placeholder="No minimum"
          className="field"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="field-label">
          Max price
        </label>
        <input
          id="maxPrice"
          name="maxPrice"
          type="number"
          min={0}
          defaultValue={filters.maxPrice || ""}
          placeholder="Any budget"
          className="field"
        />
      </div>
      <div>
        <label htmlFor="minArea" className="field-label">
          Min area
        </label>
        <input
          id="minArea"
          name="minArea"
          type="number"
          min={0}
          defaultValue={filters.minArea || ""}
          placeholder="Any size"
          className="field"
        />
      </div>
      <div>
        <label htmlFor="bedrooms" className="field-label">
          Beds
        </label>
        <select id="bedrooms" name="bedrooms" defaultValue={filters.bedrooms || ""} className="field">
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((option) => (
            <option key={option} value={option}>
              {option}+ beds
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:col-span-8 lg:justify-end">
        <Link href="/properties" className="btn-secondary">
          Reset filters
        </Link>
        <button type="submit" className="btn-primary">
          Update results
        </button>
      </div>
    </form>
  );
}
