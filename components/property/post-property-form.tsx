"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const marketOptions = ["SWEDEN", "EU", "PAKISTAN"];
const listingOptions = ["BUY", "RENT"];
const propertyOptions = ["APARTMENT", "HOUSE", "VILLA", "OFFICE", "PLOT", "SHOP", "ROOM"];

export function PostPropertyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const imageUrls = String(formData.get("imageUrls") || "")
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0),
      country: String(formData.get("country") || ""),
      city: String(formData.get("city") || ""),
      address: String(formData.get("address") || ""),
      marketCode: String(formData.get("marketCode") || ""),
      propertyType: String(formData.get("propertyType") || ""),
      listingType: String(formData.get("listingType") || ""),
      bedrooms: Number(formData.get("bedrooms") || 0) || undefined,
      bathrooms: Number(formData.get("bathrooms") || 0) || undefined,
      areaSqm: Number(formData.get("areaSqm") || 0) || undefined,
      contactPhone: String(formData.get("contactPhone") || ""),
      whatsappPhone: String(formData.get("whatsappPhone") || ""),
      firstHand: formData.get("firstHand") === "on",
      landlordSelection: String(formData.get("landlordSelection") || ""),
      latitude: Number(formData.get("latitude") || 0) || undefined,
      longitude: Number(formData.get("longitude") || 0) || undefined,
      imageUrls,
    };

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      message?: string;
      error?: string;
      property?: { slug: string };
    };

    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to save listing.");
      return;
    }

    if (data.property?.slug) {
      router.push(`/properties/${data.property.slug}`);
      router.refresh();
      return;
    }

    setMessage(data.message || "Listing submitted.");
  }

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <div className="form-section">
        <p className="form-section-title">Core listing</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="title" className="field-label">
              Title
            </label>
            <input id="title" name="title" className="field" required />
          </div>
          <div>
            <label htmlFor="price" className="field-label">
              Price
            </label>
            <input id="price" name="price" type="number" className="field" required />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="field-label">
            Description
          </label>
          <textarea id="description" name="description" rows={5} className="field" required />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label htmlFor="country" className="field-label">
              Country
            </label>
            <input id="country" name="country" placeholder="Sweden" className="field" required />
          </div>
          <div>
            <label htmlFor="city" className="field-label">
              City
            </label>
            <input id="city" name="city" placeholder="Stockholm" className="field" required />
          </div>
          <div>
            <label htmlFor="address" className="field-label">
              Address
            </label>
            <input id="address" name="address" placeholder="Street and area" className="field" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <p className="form-section-title">Market setup</p>
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label htmlFor="marketCode" className="field-label">
              Market
            </label>
            <select id="marketCode" name="marketCode" className="field" defaultValue="SWEDEN">
              {marketOptions.map((option) => (
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
            <select id="listingType" name="listingType" className="field" defaultValue="RENT">
              {listingOptions.map((option) => (
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
            <select id="propertyType" name="propertyType" className="field" defaultValue="APARTMENT">
              {propertyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label htmlFor="bedrooms" className="field-label">
              Bedrooms
            </label>
            <input id="bedrooms" name="bedrooms" type="number" min={0} placeholder="2" className="field" />
          </div>
          <div>
            <label htmlFor="bathrooms" className="field-label">
              Bathrooms
            </label>
            <input id="bathrooms" name="bathrooms" type="number" min={0} placeholder="1" className="field" />
          </div>
          <div>
            <label htmlFor="areaSqm" className="field-label">
              Area sqm
            </label>
            <input id="areaSqm" name="areaSqm" type="number" min={0} placeholder="74" className="field" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <p className="form-section-title">Contact and map</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="contactPhone" className="field-label">
              Contact phone
            </label>
            <input id="contactPhone" name="contactPhone" placeholder="+46 70 000 1000" className="field" required />
          </div>
          <div>
            <label htmlFor="whatsappPhone" className="field-label">
              WhatsApp phone
            </label>
            <input
              id="whatsappPhone"
              name="whatsappPhone"
              placeholder="923001234567"
              className="field"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="latitude" className="field-label">
              Latitude
            </label>
            <input id="latitude" name="latitude" type="number" step="any" placeholder="59.315" className="field" />
          </div>
          <div>
            <label htmlFor="longitude" className="field-label">
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              placeholder="18.069"
              className="field"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <p className="form-section-title">Market notes and media</p>
        <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
          <label className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--brand-blue)]">
            <input type="checkbox" name="firstHand" className="h-4 w-4" />
            First-hand Sweden rental
          </label>
          <input
            name="landlordSelection"
            placeholder="Shortlist by queue position and income verification"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="imageUrls" className="field-label">
            Image URLs
          </label>
          <textarea
            id="imageUrls"
            name="imageUrls"
            rows={4}
            className="field"
            placeholder="Paste one image URL per line until direct uploads are connected."
            required
          />
          <p className="field-hint">
            This field can later be replaced with signed Cloudinary uploads without changing the listing flow.
          </p>
        </div>
      </div>

      {message ? <p className="status-note status-note-success">{message}</p> : null}
      {error ? <p className="status-note status-note-error">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Submitting..." : "Publish listing"}
      </button>
    </form>
  );
}
