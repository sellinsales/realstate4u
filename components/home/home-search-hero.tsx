"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FILTER_OPTIONS } from "@/lib/demo-data";
import { HOME_QUICK_LINKS } from "@/lib/marketplace-home-data";
import { cn } from "@/lib/utils";

type SearchMode = "BUY" | "RENT" | "PROJECTS";

const areaPresets = [
  { label: "Any Area", value: "" },
  { label: "5 Marla", value: "113" },
  { label: "7 Marla", value: "158" },
  { label: "10 Marla", value: "225" },
  { label: "1 Kanal", value: "450" },
] as const;

const pricePresets = [
  { label: "Any Price", value: "" },
  { label: "Up to 5M", value: "5000000" },
  { label: "Up to 10M", value: "10000000" },
  { label: "Up to 25M", value: "25000000" },
  { label: "Up to 50M", value: "50000000" },
] as const;

const bedOptions = ["", "1", "2", "3", "4", "5"] as const;

export function HomeSearchHero() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("BUY");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "PROJECTS") {
      router.push("/projects");
      return;
    }

    const params = new URLSearchParams();
    params.set("listingType", mode);

    if (city) {
      params.set("city", city);
    }
    if (propertyType) {
      params.set("propertyType", propertyType);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (minArea) {
      params.set("minArea", minArea);
    }
    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    }

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="market-hero panel">
      <div className="text-center">
        <h1 className="market-hero-title">Find your next property</h1>
        <div className="market-hero-tabs">
          {[
            { value: "BUY", label: "Buy" },
            { value: "RENT", label: "Rent" },
            { value: "PROJECTS", label: "Projects" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn("market-hero-tab", mode === option.value && "market-hero-tab-active")}
              onClick={() => setMode(option.value as SearchMode)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="market-search-box">
        <select className="market-select" value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="">City</option>
          {FILTER_OPTIONS.cities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select className="market-select" value={propertyType} onChange={(event) => setPropertyType(event.target.value)}>
          <option value="">Property Type</option>
          {FILTER_OPTIONS.propertyTypes.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0) + option.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select className="market-select" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
          {pricePresets.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select className="market-select" value={minArea} onChange={(event) => setMinArea(event.target.value)}>
          {areaPresets.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select className="market-select" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
          <option value="">Beds</option>
          {bedOptions.slice(1).map((option) => (
            <option key={option} value={option}>
              {option}+ Beds
            </option>
          ))}
        </select>

        <button type="submit" className="market-search-button">
          Search
        </button>
      </form>

      <div className="market-quick-links">
        <span className="market-quick-label">Quick links:</span>
        {HOME_QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="market-quick-chip">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
