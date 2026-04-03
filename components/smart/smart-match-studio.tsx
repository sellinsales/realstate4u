"use client";

import { startTransition, useDeferredValue, useMemo } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { useEngagement } from "@/components/providers/engagement-provider";
import {
  buildSmartInsights,
  getGoalOptions,
  recommendProperties,
} from "@/lib/smart-match";
import type { PropertyCardData } from "@/lib/types";

const goalOptions = getGoalOptions();

export function SmartMatchStudio({ properties }: { properties: PropertyCardData[] }) {
  const { matchProfile, updateMatchProfile, resetMatchProfile } = useEngagement();
  const deferredProfile = useDeferredValue(matchProfile);

  const recommendations = useMemo(
    () => recommendProperties(properties, deferredProfile, 6),
    [deferredProfile, properties],
  );
  const insights = useMemo(
    () => buildSmartInsights(properties, deferredProfile),
    [deferredProfile, properties],
  );

  return (
    <section className="space-y-8">
      <div className="page-intro">
        <div className="page-intro-grid">
          <div className="page-intro-copy">
            <span className="eyebrow">AI-guided property discovery</span>
            <h1 className="page-title">Build a smart brief and let the marketplace prioritize your next move.</h1>
            <p className="page-copy">
              Smart Match uses your market focus, budget, space needs, and contact preferences to rank listings with clear reasons instead of generic sorting.
            </p>
          </div>
          <div className="page-intro-aside">
            <div className="panel rounded-[1.8rem] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Why it works
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>Scores listings against your brief instead of using one-size-fits-all ranking.</p>
                <p>Favors queue-ready, WhatsApp-ready, or value-focused inventory depending on your intent.</p>
                <p>Persists your brief and shortlist so returning visits feel progressively smarter.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                Smart brief
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">Tell the platform how you want to search.</h2>
            </div>
            <button type="button" onClick={resetMatchProfile} className="btn-secondary">
              Reset
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="goal" className="field-label">
                Goal
              </label>
              <select
                id="goal"
                className="field"
                value={matchProfile.goal}
                onChange={(event) =>
                  startTransition(() => updateMatchProfile({ goal: event.target.value as typeof matchProfile.goal }))
                }
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="marketCode" className="field-label">
                Market
              </label>
              <select
                id="marketCode"
                className="field"
                value={matchProfile.marketCode || "ANY"}
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      marketCode: event.target.value === "ANY" ? "ANY" : (event.target.value as NonNullable<typeof matchProfile.marketCode>),
                    }),
                  )
                }
              >
                <option value="ANY">All markets</option>
                <option value="SWEDEN">Sweden</option>
                <option value="EU">EU</option>
                <option value="PAKISTAN">Pakistan</option>
              </select>
            </div>

            <div>
              <label htmlFor="listingType" className="field-label">
                Listing type
              </label>
              <select
                id="listingType"
                className="field"
                value={matchProfile.listingType || "ANY"}
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      listingType: event.target.value,
                    }),
                  )
                }
              >
                <option value="ANY">Buy or rent</option>
                <option value="BUY">Buy</option>
                <option value="RENT">Rent</option>
              </select>
            </div>

            <div>
              <label htmlFor="propertyType" className="field-label">
                Property type
              </label>
              <select
                id="propertyType"
                className="field"
                value={matchProfile.propertyType || "ANY"}
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      propertyType: event.target.value,
                    }),
                  )
                }
              >
                <option value="ANY">Any property type</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="ROOM">Room</option>
                <option value="OFFICE">Office</option>
              </select>
            </div>

            <div>
              <label htmlFor="city" className="field-label">
                Preferred city
              </label>
              <input
                id="city"
                className="field"
                value={matchProfile.city || ""}
                placeholder="Stockholm or Lahore"
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      city: event.target.value,
                    }),
                  )
                }
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className="field-label">
                Max price
              </label>
              <input
                id="maxPrice"
                type="number"
                min={0}
                className="field"
                value={matchProfile.maxPrice || ""}
                placeholder="Enter budget cap"
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      maxPrice: event.target.value ? Number(event.target.value) : undefined,
                    }),
                  )
                }
              />
            </div>

            <div>
              <label htmlFor="bedrooms" className="field-label">
                Bedrooms needed
              </label>
              <input
                id="bedrooms"
                type="number"
                min={0}
                className="field"
                value={matchProfile.bedrooms || ""}
                placeholder="2"
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      bedrooms: event.target.value ? Number(event.target.value) : undefined,
                    }),
                  )
                }
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--brand-line)] bg-white/75 px-4 py-3 text-sm font-semibold text-[var(--brand-blue)]">
              <input
                type="checkbox"
                checked={Boolean(matchProfile.needsQueue)}
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      needsQueue: event.target.checked,
                    }),
                  )
                }
              />
              Prioritize queue-ready rentals
            </label>
            <label className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--brand-line)] bg-white/75 px-4 py-3 text-sm font-semibold text-[var(--brand-blue)]">
              <input
                type="checkbox"
                checked={Boolean(matchProfile.prefersWhatsApp)}
                onChange={(event) =>
                  startTransition(() =>
                    updateMatchProfile({
                      prefersWhatsApp: event.target.checked,
                    }),
                  )
                }
              />
              Prefer WhatsApp-ready listings
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight) => (
              <div key={insight.label} className="panel rounded-[1.6rem] p-5">
                <p className="stat-label">{insight.label}</p>
                <p className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">{insight.value}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{insight.hint}</p>
              </div>
            ))}
          </div>

          <div className="panel rounded-[2rem] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand-green)]">
                  Ranked matches
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-blue)]">
                  {recommendations.length} listings currently fit your brief.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
                Save the strongest ones to your shortlist and revisit them from the dashboard.
              </p>
            </div>
          </div>

          {recommendations.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {recommendations.map((item) => (
                <PropertyCard
                  key={item.property.id}
                  property={item.property}
                  recommendationLabel={item.label}
                  matchReasons={item.reasons}
                />
              ))}
            </div>
          ) : (
            <div className="panel rounded-[2rem] p-6">
              <h2 className="text-3xl font-semibold text-[var(--brand-blue)]">No exact matches yet.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Relax one or two filters and the marketplace will immediately widen your recommendation pool.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
