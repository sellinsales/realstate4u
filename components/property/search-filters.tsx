import Link from "next/link";
import { FILTER_OPTIONS } from "@/lib/demo-data";
import type { PropertyFilters } from "@/lib/types";

export function SearchFilters({ filters }: { filters: PropertyFilters }) {
  return (
    <form className="panel grid gap-4 rounded-[2rem] p-5 lg:grid-cols-6">
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
        <label htmlFor="listingType" className="field-label">
          Listing type
        </label>
        <select id="listingType" name="listingType" defaultValue={filters.listingType || ""} className="field">
          <option value="">Buy or rent</option>
          {FILTER_OPTIONS.listingTypes.map((option) => (
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
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="marketCode" className="field-label">
          Market
        </label>
        <select id="marketCode" name="marketCode" defaultValue={filters.marketCode || ""} className="field">
          <option value="">All markets</option>
          <option value="SWEDEN">Sweden</option>
          <option value="EU">EU</option>
          <option value="PAKISTAN">Pakistan</option>
        </select>
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
          placeholder="No limit"
          className="field"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
        <Link href="/properties" className="btn-secondary">
          Reset filters
        </Link>
        <button type="submit" className="btn-primary">
          Search listings
        </button>
      </div>
    </form>
  );
}
