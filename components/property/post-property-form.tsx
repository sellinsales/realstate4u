"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildListingAssetName } from "@/lib/media";
import { propertyFormSchema } from "@/lib/validators";

type WizardStep = "BASICS" | "SPECS" | "MEDIA" | "REVIEW";
type UploadedImage = { url: string; name: string };

type FormState = {
  marketCode: "SWEDEN" | "EU" | "PAKISTAN";
  country: string;
  city: string;
  title: string;
  description: string;
  listingType: "BUY" | "RENT";
  propertyType: "APARTMENT" | "HOUSE" | "VILLA" | "OFFICE" | "PLOT" | "SHOP" | "ROOM";
  price: string;
  address: string;
  plotPreset: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  contactPhone: string;
  whatsappPhone: string;
  youtubeUrl: string;
  firstHand: boolean;
  landlordSelection: string;
  latitude: string;
  longitude: string;
};

const DRAFT_KEY = "realstate4u-post-property-draft-v2";
const steps: { id: WizardStep; label: string; helper: string }[] = [
  { id: "BASICS", label: "Basics", helper: "Market, city, title" },
  { id: "SPECS", label: "Specs", helper: "Price, area, beds" },
  { id: "MEDIA", label: "Media", helper: "Images, video, contact" },
  { id: "REVIEW", label: "Review", helper: "Check and publish" },
];

const marketProfiles = {
  PAKISTAN: {
    country: "Pakistan",
    cities: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Multan"],
    pricePresets: [25000000, 45000000, 75000000, 125000000],
    plotPresets: [
      { label: "5 marla", sqm: 113 },
      { label: "7 marla", sqm: 158 },
      { label: "10 marla", sqm: 225 },
      { label: "1 kanal", sqm: 450 },
      { label: "Farmhouse", sqm: 1858 },
    ],
  },
  SWEDEN: {
    country: "Sweden",
    cities: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras"],
    pricePresets: [8500, 12500, 24000, 4200000],
    plotPresets: [
      { label: "Apartment", sqm: 72 },
      { label: "Townhouse", sqm: 118 },
      { label: "Detached home", sqm: 168 },
    ],
  },
  EU: {
    country: "Germany",
    cities: ["Berlin", "Hamburg", "Munich", "Amsterdam", "Lisbon"],
    pricePresets: [1500, 2400, 3400, 485000],
    plotPresets: [
      { label: "Studio", sqm: 42 },
      { label: "Family flat", sqm: 96 },
      { label: "Villa", sqm: 220 },
    ],
  },
} as const;

const initialState: FormState = {
  marketCode: "PAKISTAN",
  country: marketProfiles.PAKISTAN.country,
  city: marketProfiles.PAKISTAN.cities[0],
  title: "",
  description: "",
  listingType: "BUY",
  propertyType: "HOUSE",
  price: "",
  address: "",
  plotPreset: "",
  bedrooms: 3,
  bathrooms: 3,
  areaSqm: 225,
  contactPhone: "",
  whatsappPhone: "",
  youtubeUrl: "",
  firstHand: false,
  landlordSelection: "",
  latitude: "",
  longitude: "",
};

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="wizard-stepper">
        <button type="button" className="wizard-stepper-btn" onClick={() => onChange(Math.max(0, value - 1))}>
          -
        </button>
        <div className="wizard-stepper-value">{value}</div>
        <button type="button" className="wizard-stepper-btn" onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export function PostPropertyForm() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>("BASICS");
  const [state, setState] = useState<FormState>(initialState);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const marketProfile = marketProfiles[state.marketCode];
  const currentStepIndex = steps.findIndex((item) => item.id === step);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { state?: FormState; images?: UploadedImage[] };
      if (parsed.state) setState({ ...initialState, ...parsed.state });
      if (parsed.images) setImages(parsed.images);
    } catch {}
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ state, images }));
  }, [state, images]);

  const assetNamePreview = useMemo(() => {
    const count = Math.max(images.length, 1);
    return Array.from({ length: Math.min(count, 3) }, (_, index) => buildListingAssetName(state.title || "listing", index));
  }, [images.length, state.title]);

  function patchState(patch: Partial<FormState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function setFieldError(name: string, value?: string) {
    setErrors((current) => {
      if (!value) {
        const next = { ...current };
        delete next[name];
        return next;
      }

      return { ...current, [name]: value };
    });
  }

  function applyMarket(marketCode: FormState["marketCode"]) {
    const profile = marketProfiles[marketCode];
    setState((current) => ({
      ...current,
      marketCode,
      country: profile.country,
      city: profile.cities.some((city) => city === current.city) ? current.city : profile.cities[0],
      plotPreset: "",
      areaSqm: profile.plotPresets[0]?.sqm ?? current.areaSqm,
      firstHand: marketCode === "SWEDEN" ? current.firstHand : false,
      landlordSelection: marketCode === "SWEDEN" ? current.landlordSelection : "",
    }));
  }

  function validateStep(target: WizardStep) {
    const nextErrors: Record<string, string> = {};
    if (target === "BASICS") {
      if (state.title.trim().length < 5) nextErrors.title = "Use a clear title with at least 5 characters.";
      if (state.description.trim().length < 30) nextErrors.description = "Description should explain the property in at least 30 characters.";
      if (!state.country.trim()) nextErrors.country = "Choose a country.";
      if (!state.city.trim()) nextErrors.city = "Choose a city.";
      if (!state.address.trim()) nextErrors.address = "Add an area, street, or community.";
    }
    if (target === "SPECS") {
      if (!state.price || Number(state.price) <= 0) nextErrors.price = "Price must be greater than zero.";
      if (state.areaSqm <= 0) nextErrors.areaSqm = "Area must be greater than zero.";
      if (state.marketCode === "SWEDEN" && state.listingType === "RENT" && state.firstHand && !state.landlordSelection.trim()) {
        nextErrors.landlordSelection = "Add a shortlist or queue note for first-hand Sweden rentals.";
      }
    }
    if (target === "MEDIA") {
      if (!images.length) nextErrors.imageUrls = "Upload at least one image.";
      if (state.contactPhone.trim().length < 6) nextErrors.contactPhone = "Enter a real contact phone number.";
      if (state.whatsappPhone && state.whatsappPhone.trim().length < 6) nextErrors.whatsappPhone = "WhatsApp number looks too short.";
      if (state.youtubeUrl.trim() && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(state.youtubeUrl.trim())) {
        nextErrors.youtubeUrl = "Enter a valid YouTube link.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setUploadMessage(null);
    setGeneralError(null);

    try {
      const uploaded: UploadedImage[] = [];
      for (const [index, file] of files.entries()) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", state.title || "listing");
        formData.append("index", String(images.length + index));

        const response = await fetch("/api/uploads", { method: "POST", body: formData });
        const data = (await response.json()) as { imageUrl?: string; assetName?: string; error?: string };
        if (!response.ok || !data.imageUrl) throw new Error(data.error || "Unable to upload image.");
        uploaded.push({
          url: data.imageUrl,
          name: data.assetName || buildListingAssetName(state.title || "listing", images.length + index),
        });
      }

      setImages((current) => [...current, ...uploaded]);
      setFieldError("imageUrls");
      setUploadMessage(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded successfully.`);
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function goNext() {
    if (!validateStep(step)) return;
    const next = steps[currentStepIndex + 1];
    if (next) {
      setStep(next.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    const previous = steps[currentStepIndex - 1];
    if (previous) {
      setStep(previous.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit() {
    setMessage(null);
    setGeneralError(null);

    if (!validateStep("MEDIA")) {
      setStep("MEDIA");
      return;
    }

    const payload = {
      title: state.title.trim(),
      description: state.description.trim(),
      price: Number(state.price || 0),
      country: state.country.trim(),
      city: state.city.trim(),
      address: state.address.trim(),
      marketCode: state.marketCode,
      propertyType: state.propertyType,
      listingType: state.listingType,
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
      areaSqm: state.areaSqm,
      contactPhone: state.contactPhone.trim(),
      whatsappPhone: state.whatsappPhone.trim(),
      youtubeUrl: state.youtubeUrl.trim(),
      firstHand: state.firstHand,
      landlordSelection: state.landlordSelection.trim(),
      latitude: state.latitude ? Number(state.latitude) : undefined,
      longitude: state.longitude ? Number(state.longitude) : undefined,
      imageUrls: images.map((image) => image.url),
    };

    const parsed = propertyFormSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0] || "form");
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      setGeneralError("Please review the highlighted fields before publishing.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
        property?: { slug: string };
      };

      if (!response.ok) {
        setGeneralError(data.error || "Unable to save listing.");
        return;
      }

      window.localStorage.removeItem(DRAFT_KEY);

      if (data.property?.slug) {
        router.push(`/properties/${data.property.slug}`);
        router.refresh();
        return;
      }

      setMessage(data.message || "Listing submitted.");
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Unable to save listing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={(event) => event.preventDefault()} className="panel form-panel">
        <div className="wizard-progress">
          {steps.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`wizard-progress-step ${item.id === step ? "wizard-progress-step-active" : ""} ${index <= currentStepIndex ? "wizard-progress-step-complete" : ""}`}
              onClick={() => {
                if (index <= currentStepIndex) setStep(item.id);
              }}
            >
              <span className="wizard-progress-index">{index + 1}</span>
              <span>
                <span className="wizard-progress-label">{item.label}</span>
                <span className="wizard-progress-helper">{item.helper}</span>
              </span>
            </button>
          ))}
        </div>

        {step === "BASICS" ? (
          <div className="form-section">
            <p className="form-section-title">Basic listing setup</p>
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <label htmlFor="marketCode" className="field-label">Market</label>
                <select id="marketCode" className="field" value={state.marketCode} onChange={(event) => applyMarket(event.target.value as FormState["marketCode"])}>
                  <option value="PAKISTAN">Pakistan</option>
                  <option value="SWEDEN">Sweden</option>
                  <option value="EU">Europe</option>
                </select>
              </div>
              <div>
                <label htmlFor="country" className="field-label">Country</label>
                <input id="country" className="field" value={state.country} onChange={(event) => patchState({ country: event.target.value })} />
                {errors.country ? <p className="field-error">{errors.country}</p> : null}
              </div>
              <div>
                <label htmlFor="city" className="field-label">City</label>
                <select id="city" className="field" value={state.city} onChange={(event) => patchState({ city: event.target.value })}>
                  {marketProfile.cities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
                {errors.city ? <p className="field-error">{errors.city}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="field-label">Listing type</label>
                <div className="wizard-chip-grid">
                  {(["BUY", "RENT"] as const).map((option) => (
                    <button key={option} type="button" className={`wizard-chip ${state.listingType === option ? "wizard-chip-active" : ""}`} onClick={() => patchState({ listingType: option })}>
                      {option === "BUY" ? "For sale" : "For rent"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="propertyType" className="field-label">Property type</label>
                <select id="propertyType" className="field" value={state.propertyType} onChange={(event) => patchState({ propertyType: event.target.value as FormState["propertyType"] })}>
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="PLOT">Plot</option>
                  <option value="OFFICE">Office</option>
                  <option value="SHOP">Shop</option>
                  <option value="ROOM">Room</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="field-label">Listing title</label>
              <input id="title" className="field" value={state.title} placeholder="Modern 10 marla family home in DHA Phase 6" onChange={(event) => { patchState({ title: event.target.value }); setFieldError("title"); }} />
              {errors.title ? <p className="field-error">{errors.title}</p> : null}
            </div>

            <div>
              <label htmlFor="address" className="field-label">Area or community</label>
              <input id="address" className="field" value={state.address} placeholder="DHA Phase 6, Vastra Frolunda, Kreuzberg" onChange={(event) => { patchState({ address: event.target.value }); setFieldError("address"); }} />
              {errors.address ? <p className="field-error">{errors.address}</p> : null}
            </div>

            <div>
              <label htmlFor="description" className="field-label">Description</label>
              <textarea id="description" rows={5} className="field" value={state.description} placeholder="Describe the layout, location, condition, nearby places, and why someone should contact you." onChange={(event) => { patchState({ description: event.target.value }); setFieldError("description"); }} />
              {errors.description ? <p className="field-error">{errors.description}</p> : null}
            </div>
          </div>
        ) : null}

        {step === "SPECS" ? (
          <div className="form-section">
            <p className="form-section-title">Price, size, and property details</p>
            <div>
              <label htmlFor="price" className="field-label">Price</label>
              <input id="price" type="number" className="field" value={state.price} onChange={(event) => { patchState({ price: event.target.value }); setFieldError("price"); }} placeholder="Enter asking price" />
              <div className="mt-3 flex flex-wrap gap-2">
                {marketProfile.pricePresets.map((preset) => (
                  <button key={preset} type="button" className="pill" onClick={() => { patchState({ price: String(preset) }); setFieldError("price"); }}>
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              {errors.price ? <p className="field-error">{errors.price}</p> : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <label className="field-label">Quick size preset</label>
                <div className="wizard-chip-grid">
                  {marketProfile.plotPresets.map((preset) => (
                    <button key={preset.label} type="button" className={`wizard-chip ${state.plotPreset === preset.label ? "wizard-chip-active" : ""}`} onClick={() => patchState({ plotPreset: preset.label, areaSqm: preset.sqm })}>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="areaSqm" className="field-label">Area in sqm</label>
                <div className="wizard-range-shell">
                  <input id="areaSqm" type="range" min={20} max={2000} step={1} value={state.areaSqm} onChange={(event) => { patchState({ areaSqm: Number(event.target.value) }); setFieldError("areaSqm"); }} />
                  <input type="number" className="field" value={state.areaSqm} onChange={(event) => { patchState({ areaSqm: Number(event.target.value || 0) }); setFieldError("areaSqm"); }} />
                </div>
                {errors.areaSqm ? <p className="field-error">{errors.areaSqm}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Stepper label="Bedrooms" value={state.bedrooms} onChange={(value) => patchState({ bedrooms: value })} />
              <Stepper label="Bathrooms" value={state.bathrooms} onChange={(value) => patchState({ bathrooms: value })} />
              <div>
                <label className="field-label">Best for</label>
                <div className="rounded-[1rem] border border-[var(--brand-line)] bg-white/80 p-4 text-sm leading-7 text-[var(--muted)]">
                  {state.marketCode === "PAKISTAN"
                    ? "Use marla or kanal presets, then adjust beds, baths, and area."
                    : state.marketCode === "SWEDEN"
                      ? "Use cleaner rental details and shortlist notes for faster review."
                      : "Keep room counts and area realistic so AI Match can rank the listing better."}
                </div>
              </div>
            </div>

            {state.marketCode === "SWEDEN" && state.listingType === "RENT" ? (
              <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/70 p-4">
                <label className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--brand-blue)]">
                  <input type="checkbox" checked={state.firstHand} onChange={(event) => patchState({ firstHand: event.target.checked })} />
                  First-hand Sweden rental
                </label>
                <div className="mt-4">
                  <label htmlFor="landlordSelection" className="field-label">Queue or shortlist note</label>
                  <input id="landlordSelection" className="field" value={state.landlordSelection} placeholder="Shortlist by queue number and income verification" onChange={(event) => { patchState({ landlordSelection: event.target.value }); setFieldError("landlordSelection"); }} />
                  {errors.landlordSelection ? <p className="field-error">{errors.landlordSelection}</p> : null}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === "MEDIA" ? (
          <div className="form-section">
            <p className="form-section-title">Upload media and contact details</p>

            <div>
              <label className="field-label">Listing images</label>
              <label className="wizard-upload-shell">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelection} />
                <span className="btn-primary">{uploading ? "Uploading..." : "Browse images"}</span>
                <span className="text-sm leading-7 text-[var(--muted)]">
                  Upload listing photos directly from your device. RealState4U branding is applied when listings are displayed.
                </span>
              </label>
              {uploadMessage ? <p className="field-success">{uploadMessage}</p> : null}
              {errors.imageUrls ? <p className="field-error">{errors.imageUrls}</p> : null}

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {images.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="wizard-upload-card">
                    <div className="relative h-40 overflow-hidden rounded-[1rem] border border-[var(--brand-line)] bg-[var(--surface-soft)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--brand-blue)]">{image.name}</p>
                        <p className="text-xs leading-6 text-[var(--muted)]">Image {index + 1}</p>
                      </div>
                      <button type="button" className="btn-secondary px-3 py-2 text-xs" onClick={() => removeImage(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
                <p className="font-semibold text-[var(--brand-blue)]">Asset naming preview</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {assetNamePreview.map((assetName) => (
                    <span key={assetName} className="pill">{assetName}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="contactPhone" className="field-label">Contact phone</label>
                <input id="contactPhone" className="field" value={state.contactPhone} placeholder="+92 300 1234567" onChange={(event) => { patchState({ contactPhone: event.target.value }); setFieldError("contactPhone"); }} />
                {errors.contactPhone ? <p className="field-error">{errors.contactPhone}</p> : null}
              </div>
              <div>
                <label htmlFor="whatsappPhone" className="field-label">WhatsApp phone</label>
                <input id="whatsappPhone" className="field" value={state.whatsappPhone} placeholder="923001234567" onChange={(event) => { patchState({ whatsappPhone: event.target.value }); setFieldError("whatsappPhone"); }} />
                {errors.whatsappPhone ? <p className="field-error">{errors.whatsappPhone}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="youtubeUrl" className="field-label">YouTube walkthrough</label>
              <input id="youtubeUrl" className="field" value={state.youtubeUrl} placeholder="https://www.youtube.com/watch?v=..." onChange={(event) => { patchState({ youtubeUrl: event.target.value }); setFieldError("youtubeUrl"); }} />
              {errors.youtubeUrl ? <p className="field-error">{errors.youtubeUrl}</p> : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="latitude" className="field-label">Latitude</label>
                <input id="latitude" className="field" value={state.latitude} placeholder="31.468" onChange={(event) => patchState({ latitude: event.target.value })} />
              </div>
              <div>
                <label htmlFor="longitude" className="field-label">Longitude</label>
                <input id="longitude" className="field" value={state.longitude} placeholder="74.385" onChange={(event) => patchState({ longitude: event.target.value })} />
              </div>
            </div>
          </div>
        ) : null}

        {step === "REVIEW" ? (
          <div className="form-section">
            <p className="form-section-title">Review before publishing</p>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
                <p className="font-semibold text-[var(--brand-blue)]">Basic details</p>
                <p className="mt-2">{state.title || "No title yet"}</p>
                <p>{state.city}, {state.country}</p>
                <p>{state.address || "Area not added yet"}</p>
                <p>{state.listingType === "BUY" ? "For sale" : "For rent"} · {state.propertyType.toLowerCase()}</p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
                <p className="font-semibold text-[var(--brand-blue)]">Specs</p>
                <p>Price: {state.price || "Not entered"}</p>
                <p>Area: {state.areaSqm} sqm</p>
                <p>{state.bedrooms} bedrooms · {state.bathrooms} bathrooms</p>
                {state.plotPreset ? <p>Preset: {state.plotPreset}</p> : null}
              </div>
            </div>
            <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--brand-blue)]">Media and contact</p>
              <p className="mt-2">{images.length} image{images.length === 1 ? "" : "s"} uploaded</p>
              <p>Phone: {state.contactPhone || "Not added"}</p>
              <p>WhatsApp: {state.whatsappPhone || "Not added"}</p>
              <p>YouTube: {state.youtubeUrl || "Not added"}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[var(--brand-line)] bg-white/72 p-4 text-sm leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--brand-blue)]">Description preview</p>
              <p className="mt-2">{state.description || "Add a description before publishing."}</p>
            </div>
          </div>
        ) : null}

        {message ? <p className="status-note status-note-success">{message}</p> : null}
        {generalError ? <p className="status-note status-note-error">{generalError}</p> : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {currentStepIndex > 0 ? <button type="button" className="btn-secondary" onClick={goBack}>Back</button> : null}
            <button type="button" className="btn-secondary" onClick={() => { window.localStorage.removeItem(DRAFT_KEY); setState(initialState); setImages([]); setErrors({}); setGeneralError(null); setUploadMessage(null); setStep("BASICS"); }}>
              Clear draft
            </button>
          </div>
          {step !== "REVIEW" ? (
            <button type="button" className="btn-primary" onClick={goNext}>Continue</button>
          ) : (
            <button type="button" className="btn-primary" disabled={loading} onClick={handleSubmit}>
              {loading ? "Publishing..." : "Publish listing"}
            </button>
          )}
        </div>
      </form>

      <aside className="space-y-5">
        <div className="panel rounded-[2rem] p-6">
          <p className="form-section-title">Why this wizard is easier</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>Use presets, dropdowns, and step controls instead of typing everything from scratch.</p>
            <p>Upload images directly from your device and review the listing before it goes live.</p>
            <p>Validation points to the exact field that needs fixing instead of one vague error.</p>
          </div>
        </div>
        <div className="panel rounded-[2rem] p-6">
          <p className="form-section-title">Best results</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>Start with a clear title and exact area or community.</p>
            <p>Upload bright, real photos and keep the strongest exterior or lounge image first.</p>
            <p>Add a walkthrough video when available. It usually improves inquiry quality.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
