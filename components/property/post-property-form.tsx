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
    <form onSubmit={handleSubmit} className="panel space-y-5 rounded-[2rem] p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
            Title
          </label>
          <input id="title" name="title" className="field" required />
        </div>
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
            Price
          </label>
          <input id="price" name="price" type="number" className="field" required />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
          Description
        </label>
        <textarea id="description" name="description" rows={5} className="field" required />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <input name="country" placeholder="Country" className="field" required />
        <input name="city" placeholder="City" className="field" required />
        <input name="address" placeholder="Address" className="field" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <select name="marketCode" className="field" defaultValue="SWEDEN">
          {marketOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="listingType" className="field" defaultValue="RENT">
          {listingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="propertyType" className="field" defaultValue="APARTMENT">
          {propertyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <input name="bedrooms" type="number" min={0} placeholder="Bedrooms" className="field" />
        <input name="bathrooms" type="number" min={0} placeholder="Bathrooms" className="field" />
        <input name="areaSqm" type="number" min={0} placeholder="Area sqm" className="field" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <input name="contactPhone" placeholder="Contact phone" className="field" required />
        <input name="whatsappPhone" placeholder="WhatsApp phone for Pakistan mode" className="field" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <input name="latitude" type="number" step="any" placeholder="Latitude" className="field" />
        <input name="longitude" type="number" step="any" placeholder="Longitude" className="field" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
        <label className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--brand-blue)]">
          <input type="checkbox" name="firstHand" className="h-4 w-4" />
          First-hand Sweden rental
        </label>
        <input
          name="landlordSelection"
          placeholder="Landlord selection method or queue notes"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="imageUrls" className="mb-2 block text-sm font-semibold text-[var(--brand-blue)]">
          Image URLs
        </label>
        <textarea
          id="imageUrls"
          name="imageUrls"
          rows={4}
          className="field"
          placeholder="Paste one image URL per line. Cloudinary upload wiring can be connected to this field next."
          required
        />
      </div>

      {message ? <p className="text-sm font-medium text-[var(--brand-green-deep)]">{message}</p> : null}
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Submitting..." : "Submit property"}
      </button>
    </form>
  );
}
