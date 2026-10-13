"use client";

import { useState, useMemo } from "react";
import WatchCard from "@/components/WatchCard";
import { watches, Watch } from "@/lib/data";

const CATEGORIES = [
  { value: "all", label: "All Pieces" },
  { value: "complications", label: "Complications" },
  { value: "chronographs", label: "Chronographs" },
  { value: "minimalist", label: "Minimalist" },
  { value: "tourbillon", label: "Tourbillons" },
];

const MATERIALS = [
  { value: "all", label: "All Alloys" },
  { value: "ceramic", label: "Obsidian Ceramic" },
  { value: "titanium", label: "Grade 5 Titanium" },
  { value: "gold", label: "Rose Gold & Platinum" },
  { value: "steel", label: "Stainless Steel" },
];

const SORT_OPTIONS = [
  { value: "curated", label: "Curated" },
  { value: "price-asc", label: "Value (Low to High)" },
  { value: "price-desc", label: "Value (High to Low)" },
];

export default function CollectionPageClient() {
  const [category, setCategory] = useState("all");
  const [material, setMaterial] = useState("all");
  const [sort, setSort]         = useState("curated");

  const filtered = useMemo(() => {
    let list: Watch[] = [...watches];

    if (category !== "all") list = list.filter((w) => w.category === category);
    if (material !== "all") list = list.filter((w) => w.material === material);

    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [category, material, sort]);

  const hasFilters = category !== "all" || material !== "all";

  return (
    <>
      {/* ── Editorial Header ──────────────────────────────────────── */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-charcoal border-b border-hairline">
        <div className="container-luxury">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold pulse" />
            <span className="text-caps-sm text-gold">Geneva Horological Vault</span>
          </div>
          <h1 className="text-headline-lg font-serif text-ivory mb-3">The Collection</h1>
          <p className="text-body-lg text-stone max-w-lg">
            Curated mechanical creations engineered with uncompromising mastery, rare materials, and hand-finished calibres.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {[
              { icon: "verified", label: "COSC Chronometer Certified" },
              { icon: "all_inclusive", label: "Guaranteed Provenance" },
              { icon: "local_shipping", label: "Complimentary Worldwide Dispatch" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 bg-surface-mid px-3 py-1.5">
                <span className="material-symbols-outlined text-gold text-[14px]">{icon}</span>
                <span className="text-spec text-platinum">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Filters ───────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-obsidian/95 backdrop-blur-md border-b border-hairline">
        <div className="container-luxury py-3">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`flex-shrink-0 px-4 py-1.5 text-caps-sm transition-all ${
                  category === value
                    ? "bg-gold text-obsidian"
                    : "bg-surface-mid text-stone hover:text-ivory border border-hairline"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Secondary controls */}
          <div className="flex items-center justify-between pt-2.5 gap-4">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              <span className="text-spec text-stone uppercase flex-shrink-0">Material:</span>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                aria-label="Filter by material"
                className="bg-surface-mid text-ivory text-spec py-1 px-2.5 outline-none focus:text-gold cursor-pointer border border-hairline"
              >
                {MATERIALS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-spec text-stone uppercase">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort timepieces"
                className="bg-surface-mid text-ivory text-spec py-1 px-2.5 outline-none focus:text-gold cursor-pointer border border-hairline"
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active filter / count bar ─────────────────────────────── */}
      <div className="bg-obsidian py-2">
        <div className="container-luxury flex items-center justify-between">
          <span className="text-spec text-stone">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {category !== "all" && ` · ${CATEGORIES.find((c) => c.value === category)?.label}`}
          </span>
          {hasFilters && (
            <button
              onClick={() => { setCategory("all"); setMaterial("all"); }}
              className="text-spec text-gold hover:text-gold-bright transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Product Grid ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-surface flex-1">
        <div className="container-luxury">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <span className="material-symbols-outlined text-stone text-[48px]">search_off</span>
              <h2 className="text-headline-sm font-serif text-ivory">No pieces match your criteria</h2>
              <p className="text-body-sm text-stone max-w-sm">
                Try adjusting the collection or material filters to discover our full range of timepieces.
              </p>
              <button
                onClick={() => { setCategory("all"); setMaterial("all"); }}
                className="btn-ghost mt-2"
              >
                View All Pieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((watch, i) => (
                <WatchCard key={watch.id} watch={watch} priority={i < 2} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
