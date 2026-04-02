import { FILTER_OPTIONS } from "@/lib/demo-data";
import type { PropertyFilters } from "@/lib/types";

export function SearchFilters({ filters }: { filters: PropertyFilters }) {
  return (
    <form className="panel grid gap-4 rounded-[2rem] p-5 lg:grid-cols-5">
      <select name="country" defaultValue={filters.country || ""} className="field">
        <option value="">All countries</option>
        {FILTER_OPTIONS.countries.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select name="city" defaultValue={filters.city || ""} className="field">
        <option value="">All cities</option>
        {FILTER_OPTIONS.cities.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select name="listingType" defaultValue={filters.listingType || ""} className="field">
        <option value="">Buy or rent</option>
        {FILTER_OPTIONS.listingTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select name="propertyType" defaultValue={filters.propertyType || ""} className="field">
        <option value="">Property type</option>
        {FILTER_OPTIONS.propertyTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="flex gap-3">
        <input
          name="maxPrice"
          type="number"
          min={0}
          defaultValue={filters.maxPrice || ""}
          placeholder="Max price"
          className="field"
        />
        <button type="submit" className="btn-primary shrink-0 px-5">
          Search
        </button>
      </div>
    </form>
  );
}
