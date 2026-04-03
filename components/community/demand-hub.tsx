"use client";

import { useEffect, useMemo, useState } from "react";
import type { OpenDemand } from "@/lib/community-data";
import type { MarketCode } from "@/lib/types";

type DemandDraft = {
  marketCode: MarketCode;
  title: string;
  category: string;
  location: string;
  budget: string;
  urgency: string;
  summary: string;
  contactMode: string;
};

const STORAGE_KEY = "realstate4u.public-demands";

const initialDraft: DemandDraft = {
  marketCode: "EU",
  title: "",
  category: "Property requirement",
  location: "",
  budget: "",
  urgency: "Open",
  summary: "",
  contactMode: "Web inquiry",
};

export function DemandHub({ seededDemands }: { seededDemands: OpenDemand[] }) {
  const [draft, setDraft] = useState<DemandDraft>(initialDraft);
  const [userDemands, setUserDemands] = useState<OpenDemand[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as OpenDemand[]) : [];
    } catch {
      return [];
    }
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userDemands));
  }, [userDemands]);

  const board = useMemo(() => [...userDemands, ...seededDemands], [seededDemands, userDemands]);

  function updateField<Key extends keyof DemandDraft>(key: Key, value: DemandDraft[Key]) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function shareToClipboard(post: OpenDemand) {
    const text = `${post.title}\n${post.category} | ${post.location}\n${post.budget} | ${post.urgency}\n${post.summary}\nContact mode: ${post.contactMode}\nShared via RealState4U Demand Board`;
    await navigator.clipboard.writeText(text);
    setMessage("Demand brief copied. You can paste it anywhere and share it instantly.");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const created: OpenDemand = {
      id: `local-${Date.now()}`,
      marketCode: draft.marketCode,
      title: draft.title.trim(),
      category: draft.category.trim(),
      location: draft.location.trim(),
      budget: draft.budget.trim() || "Budget on request",
      urgency: draft.urgency.trim() || "Open",
      summary: draft.summary.trim(),
      contactMode: draft.contactMode.trim() || "Web inquiry",
    };

    if (!created.title || !created.location || !created.summary) {
      setMessage("Add a title, location, and summary before sharing the demand brief.");
      return;
    }

    setUserDemands((current) => [created, ...current].slice(0, 12));
    setDraft(initialDraft);
    setMessage("Demand brief added to your board. Use copy or WhatsApp share from the card.");
  }

  return (
    <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="panel rounded-[1.9rem] p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
          Share a requirement
        </p>
        <h2 className="mt-3 text-[clamp(1.8rem,2.8vw,2.45rem)] leading-[1.08] font-semibold text-[var(--brand-blue)]">
          Post what you need, what work is open, or what investment you are seeking.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          Use this board for rental demand, acquisition briefs, renovation requests, contractor needs, or market
          requests you want to circulate quickly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label htmlFor="marketCode" className="field-label">
              Market
            </label>
            <select
              id="marketCode"
              className="field"
              value={draft.marketCode}
              onChange={(event) => updateField("marketCode", event.target.value as MarketCode)}
            >
              <option value="PAKISTAN">Pakistan</option>
              <option value="SWEDEN">Sweden</option>
              <option value="EU">EU</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="field-label">
              Demand title
            </label>
            <input
              id="title"
              className="field"
              value={draft.title}
              placeholder="Need a 3-bed family rental in Gothenburg"
              onChange={(event) => updateField("title", event.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="field-label">
                Category
              </label>
              <select
                id="category"
                className="field"
                value={draft.category}
                onChange={(event) => updateField("category", event.target.value)}
              >
                <option>Property requirement</option>
                <option>Rental requirement</option>
                <option>Investment brief</option>
                <option>Property work request</option>
                <option>Construction need</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="field-label">
                Location
              </label>
              <input
                id="location"
                className="field"
                value={draft.location}
                placeholder="Stockholm, Sweden"
                onChange={(event) => updateField("location", event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="budget" className="field-label">
                Budget or scope
              </label>
              <input
                id="budget"
                className="field"
                value={draft.budget}
                placeholder="Up to EUR 500k"
                onChange={(event) => updateField("budget", event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="urgency" className="field-label">
                Urgency
              </label>
              <input
                id="urgency"
                className="field"
                value={draft.urgency}
                placeholder="Immediate"
                onChange={(event) => updateField("urgency", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="summary" className="field-label">
              Summary
            </label>
            <textarea
              id="summary"
              rows={4}
              className="field"
              value={draft.summary}
              placeholder="Describe the requirement, work needed, expected timeline, and what kind of response you want."
              onChange={(event) => updateField("summary", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contactMode" className="field-label">
              Preferred contact mode
            </label>
            <input
              id="contactMode"
              className="field"
              value={draft.contactMode}
              placeholder="WhatsApp or call"
              onChange={(event) => updateField("contactMode", event.target.value)}
            />
          </div>

          {message ? <p className="status-note status-note-success">{message}</p> : null}

          <button type="submit" className="btn-primary">
            Add to demand board
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
              Open demand board
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,2.6vw,2.3rem)] leading-[1.08] font-semibold text-[var(--brand-blue)]">
              Public demand, work requests, and investor briefs.
            </h2>
          </div>
        </div>

        {board.map((demand) => {
          const shareText = encodeURIComponent(
            `${demand.title}\n${demand.category} | ${demand.location}\n${demand.budget} | ${demand.urgency}\n${demand.summary}\nContact mode: ${demand.contactMode}`,
          );

          return (
            <article key={demand.id} className="panel rounded-[1.8rem] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill">{demand.category}</span>
                <span className="pill">{demand.location}</span>
                <span className="pill">{demand.urgency}</span>
              </div>

              <h3 className="mt-4 text-[1.55rem] leading-[1.1] font-semibold text-[var(--brand-blue)]">{demand.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{demand.summary}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-[var(--brand-line)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Budget:</strong> {demand.budget}
                </div>
                <div className="rounded-[1.3rem] border border-[var(--brand-line)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                  <strong className="text-[var(--brand-blue)]">Contact:</strong> {demand.contactMode}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => void shareToClipboard(demand)} className="btn-secondary">
                  Copy brief
                </button>
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Share via WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
