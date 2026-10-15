"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Watch, formatPrice, WatchVariant } from "@/lib/data";
import { useBag } from "@/lib/bag-context";
import WatchCard from "@/components/WatchCard";

export default function ProductPageClient({
  watch,
  related,
}: {
  watch: Watch;
  related: Watch[];
}) {
  const [activeView, setActiveView] = useState<"dial" | "movement">("dial");
  const [selectedCase,  setSelectedCase]  = useState<WatchVariant | undefined>(
    watch.variants.find((v) => v.type === "case")
  );
  const [selectedStrap, setSelectedStrap] = useState<WatchVariant | undefined>(
    watch.variants.find((v) => v.type === "strap")
  );
  const [added, setAdded] = useState(false);

  const { addItem } = useBag();
  const router = useRouter();

  const caseVariants  = watch.variants.filter((v) => v.type === "case");
  const strapVariants = watch.variants.filter((v) => v.type === "strap");

  const handleAddToBag = () => {
    addItem({
      id: `${watch.id}-${selectedCase?.value}-${selectedStrap?.value}`,
      slug: watch.slug,
      name: watch.name,
      reference: watch.reference,
      price: watch.price,
      image: watch.images.dial,
      selectedCase: selectedCase?.label,
      selectedStrap: selectedStrap?.label,
    });
    setAdded(true);
    // Navigate to checkout after a short confirmation flash
    setTimeout(() => {
      router.push("/checkout");
    }, 600);
  };

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="pt-20 md:pt-24 pb-4 bg-charcoal border-b border-hairline">
        <div className="container-luxury">
          <ol className="flex items-center gap-2 text-spec text-stone">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><span className="text-stone/40">/</span></li>
            <li><Link href="/collection" className="hover:text-gold transition-colors">Collection</Link></li>
            <li><span className="text-stone/40">/</span></li>
            <li className="text-platinum">{watch.name}</li>
          </ol>
        </div>
      </nav>

      {/* ── Main Product Layout ───────────────────────────────────── */}
      <section className="bg-charcoal py-10 md:py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">

            {/* LEFT: Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main view */}
              <div className="relative aspect-square bg-obsidian overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Dial view */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-700 ${activeView === "dial" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  id="view-dial"
                >
                  <Image
                    src={watch.images.dial}
                    alt={`${watch.name} dial face`}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Movement view */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-700 ${activeView === "movement" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  id="view-movement"
                >
                  <Image
                    src={watch.images.movement}
                    alt={`${watch.name} movement calibre`}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Genève watermark */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="text-spec tracking-[0.3em] text-stone/30 uppercase">Genève</span>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => setActiveView(activeView === "dial" ? "movement" : "dial")}
                  aria-label="Toggle between dial and movement view"
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-surface-high/90 backdrop-blur-md border border-hairline text-spec text-platinum hover:text-gold transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px] text-gold">sync</span>
                  {activeView === "dial" ? "Inspect Calibre" : "View Dial"}
                </button>

                {/* Edition badge */}
                {watch.edition && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-surface-high/85 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold pulse" />
                    <span className="text-spec text-gold">{watch.edition}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView("dial")}
                  aria-label="View dial"
                  className={`relative w-16 h-16 overflow-hidden border-2 transition-colors ${activeView === "dial" ? "border-gold" : "border-hairline opacity-50 hover:opacity-80"}`}
                >
                  <Image src={watch.images.dial} alt="Dial thumbnail" fill className="object-cover" sizes="64px" />
                </button>
                <button
                  onClick={() => setActiveView("movement")}
                  aria-label="View movement"
                  className={`relative w-16 h-16 overflow-hidden border-2 transition-colors ${activeView === "movement" ? "border-gold" : "border-hairline opacity-50 hover:opacity-80"}`}
                >
                  <Image src={watch.images.movement} alt="Movement thumbnail" fill className="object-cover" sizes="64px" />
                </button>
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col">
              {/* Heritage badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-caps-sm text-gold">Haute Horlogerie Salon</span>
                {watch.edition && (
                  <span className="text-spec text-stone bg-surface-high px-2.5 py-1">
                    {watch.inStock ? `In Stock` : "Available by Request"}
                  </span>
                )}
              </div>

              {/* Name & reference */}
              <div className="mb-2">
                <span className="text-caps-sm text-stone mb-1 block">Atelier Genève</span>
                <h1 className="text-headline-lg font-serif text-ivory tracking-tight">{watch.name.toUpperCase()}</h1>
                <div className="flex items-center gap-2 mt-1 text-spec text-stone">
                  <span>{watch.reference}</span>
                  {watch.edition && (
                    <>
                      <span>·</span>
                      <span className="text-gold">{watch.edition}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="my-6 p-4 bg-obsidian border border-hairline">
                <div className="flex items-baseline justify-between">
                  <span className="text-headline-sm font-serif text-gold">{formatPrice(watch.price)}</span>
                  <span className="text-caps-sm text-stone">USD Excl. Taxes</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="material-symbols-outlined text-gold text-[15px]">verified_user</span>
                  <span className="text-spec text-platinum">Includes complimentary worldwide armored courier dispatch</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-body-md text-platinum mb-6">{watch.description}</p>

              {/* Case selector */}
              {caseVariants.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-caps-sm text-stone">Case Metallurgy</span>
                    <span className="text-spec text-ivory">{selectedCase?.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {caseVariants.map((v) => (
                      <button
                        key={v.value}
                        onClick={() => setSelectedCase(v)}
                        className={`flex items-center gap-2.5 p-3 border text-left transition-all ${
                          selectedCase?.value === v.value
                            ? "border-gold bg-surface-high text-ivory"
                            : "border-hairline bg-surface-mid text-stone hover:border-stone"
                        }`}
                      >
                        {v.colorHex && (
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0 border border-hairline"
                            style={{ background: v.colorHex }}
                          />
                        )}
                        <span className="text-body-sm">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Strap selector */}
              {strapVariants.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-caps-sm text-stone">Manufacture Strap</span>
                    <span className="text-spec text-ivory">{selectedStrap?.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {strapVariants.map((v) => (
                      <button
                        key={v.value}
                        onClick={() => setSelectedStrap(v)}
                        className={`flex items-center gap-2.5 p-3 border text-left transition-all ${
                          selectedStrap?.value === v.value
                            ? "border-gold bg-surface-high text-ivory"
                            : "border-hairline bg-surface-mid text-stone hover:border-stone"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px] text-gold">texture</span>
                        <span className="text-body-sm truncate">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddToBag}
                  className={`btn-primary w-full ${added ? "!bg-green-700" : ""}`}
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Added to Tray
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      Acquire Timepiece — Reserve No. 14
                    </>
                  )}
                </button>
                <Link href="/checkout" className="btn-ghost w-full flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-gold">meeting_room</span>
                  Request Concierge Salon Viewing
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: "verified_user", label: "5-Year Warranty" },
                  { icon: "lock", label: "Secure Acquisition" },
                  { icon: "local_shipping", label: "Free Global Dispatch" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gold text-[14px]">{icon}</span>
                    <span className="text-spec text-stone">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Specs ───────────────────────────────────────── */}
      <section aria-labelledby="specs-heading" className="py-16 md:py-20 bg-obsidian">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8">
            <h2 id="specs-heading" className="text-editorial font-serif text-ivory">Technical Specifications</h2>
            <span className="text-caps-sm text-gold">{watch.reference.split("-").slice(-1)[0]} Calibre</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            <div>
              {watch.specs.slice(0, Math.ceil(watch.specs.length / 2)).map((spec) => (
                <div key={spec.label} className="spec-row">
                  <span className="text-spec text-stone uppercase">{spec.label}</span>
                  <span className="text-body-sm text-ivory font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
            <div>
              {watch.specs.slice(Math.ceil(watch.specs.length / 2)).map((spec) => (
                <div key={spec.label} className="spec-row">
                  <span className="text-spec text-stone uppercase">{spec.label}</span>
                  <span className="text-body-sm text-ivory font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier standards */}
          <div className="mt-8 p-5 bg-charcoal border border-hairline">
            <p className="text-caps-sm text-gold mb-3">Atelier Geneva Standards</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Water Resistance", value: "50 Meters (5 ATM)" },
                { label: "Crystal", value: "Sapphire, double anti-reflective" },
                { label: "Certification", value: "COSC & Atelier Manufacture" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-spec text-stone uppercase block">{label}</span>
                  <span className="text-body-sm text-platinum mt-0.5 block">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Watches ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-16 md:py-20 bg-charcoal">
          <div className="container-luxury">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-caps-sm text-gold mb-1 block">You May Also Consider</span>
                <h2 id="related-heading" className="text-headline-md font-serif text-ivory">Related Timepieces</h2>
              </div>
              <Link href="/collection" className="text-caps-sm text-gold hover:text-gold-bright transition-colors flex items-center gap-1.5">
                View All
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((w) => (
                <WatchCard key={w.id} watch={w} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
