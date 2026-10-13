import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WatchCard from "@/components/WatchCard";
import Image from "next/image";
import Link from "next/link";
import { watches, formatPrice } from "@/lib/data";

export const metadata: Metadata = {
  title: "ATELIER — Time, Perfected. | Luxury Timepieces",
  description:
    "Enter the world of ATELIER Genève — bespoke haute horlogerie for the discerning collector. Explore our curated collection of Swiss mechanical timepieces.",
};

const CRAFTSMANSHIP_STATS = [
  { value: "400+", label: "Hours per piece" },
  { value: "847", label: "Components in our grand complication" },
  { value: "0.003mm", label: "Mechanical tolerance" },
  { value: "100%", label: "In-house manufacture" },
];

const SERVICES = [
  {
    icon: "verified_user",
    title: "Certificate of Authenticity",
    desc: "Every ATELIER timepiece is accompanied by a numbered provenance document signed by the Maître d'Horlogerie.",
  },
  {
    icon: "local_shipping",
    title: "Armored White-Glove Courier",
    desc: "Complimentary worldwide dispatch via dedicated diplomatic courier with GPS telemetry and tamper-evident sealed vault.",
  },
  {
    icon: "build",
    title: "Five-Year Movement Warranty",
    desc: "A full warranty covering the in-house movement against any manufacturing defect, serviced exclusively in Geneva.",
  },
  {
    icon: "diamond",
    title: "Bespoke Atelier Services",
    desc: "Commission a unique piece — custom dial métier d'art, engraved caseback, and private salon presentations available by appointment.",
  },
];

export default function HomePage() {
  const featuredWatches = watches.slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Featured Collection ───────────────────────────────────── */}
      <section
        id="collection"
        aria-labelledby="featured-collection-heading"
        className="py-20 md:py-28 bg-surface"
      >
        <div className="container-luxury">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <span className="text-caps-sm text-gold mb-2 block">Haute Sélection</span>
              <h2
                id="featured-collection-heading"
                className="text-headline-lg font-serif text-ivory"
              >
                The Signature Collection
              </h2>
              <p className="text-body-md text-stone mt-2 max-w-md">
                Distinctive timepieces. Exceptional attention to detail.
              </p>
            </div>
            <Link
              href="/collection"
              className="flex items-center gap-2 text-caps-sm text-gold hover:text-gold-bright transition-colors group whitespace-nowrap"
            >
              View All Pieces
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredWatches.map((watch, i) => (
              <WatchCard key={watch.id} watch={watch} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial / Craftsmanship ─────────────────────────────── */}
      <section aria-labelledby="craftsmanship-heading" className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden order-1 lg:order-none">
              <Image
                src="/macro_close_up_studio_shot_of_a_high_luxury_swiss_mechanical_watch_open.png"
                alt="Macro close-up of the ATELIER skeletonized tourbillon movement"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating spec tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-obsidian/90 backdrop-blur-md border border-hairline flex items-center justify-between">
                <div>
                  <span className="text-spec text-stone uppercase block">Escapement</span>
                  <span className="text-caps-lg text-ivory mt-0.5 block">Tri-Axial Tourbillon</span>
                </div>
                <span className="text-caps-sm text-gold">0.003mm</span>
              </div>
            </div>

            {/* Copy */}
            <div>
              <span className="text-caps-sm text-gold mb-3 block">Savoir-Faire</span>
              <h2
                id="craftsmanship-heading"
                className="text-headline-lg font-serif text-ivory mb-6"
              >
                EVERY DETAIL HAS A PURPOSE.
              </h2>
              <p className="text-body-lg text-platinum mb-6">
                A study in precision, proportion, and the pursuit of mechanical perfection. Every bevel is hand-chamfered, every gear tooth mirror-polished in our Vallée de Joux workshops.
              </p>
              <p className="text-body-md text-stone mb-10">
                Over four hundred continuous hours of artisanal mastery — not because it is required, but because excellence demands nothing less.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {CRAFTSMANSHIP_STATS.map(({ value, label }) => (
                  <div key={label} className="border-t border-hairline pt-4">
                    <span className="text-headline-md font-serif text-gold block">{value}</span>
                    <span className="text-spec text-stone mt-1 block">{label}</span>
                  </div>
                ))}
              </div>

              <Link href="/craftsmanship" className="btn-ghost inline-flex">
                Explore Our Craft ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spotlight / Product Feature ───────────────────────────── */}
      <section aria-labelledby="spotlight-heading" className="py-20 md:py-28 bg-obsidian">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <span className="text-caps-sm text-gold mb-2 block">Spotlight</span>
            <h2 id="spotlight-heading" className="text-headline-lg font-serif text-ivory">
              Luna Noir in Focus
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Watch image — 3 cols */}
            <div className="lg:col-span-3 relative aspect-square bg-charcoal overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent opacity-50" />
              <Image
                src="/atelier_luna_noir_ref._1801.png"
                alt="Atelier Luna Noir Ref. 1801 dial face"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-5 left-5">
                <span className="text-spec text-stone/50 tracking-[0.3em] uppercase">Genève</span>
              </div>
            </div>

            {/* Specs — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <span className="text-caps-sm text-gold mb-1 block">Atelier Genève</span>
                <h3 className="text-headline-md font-serif text-ivory">Luna Noir</h3>
                <p className="text-spec text-stone mt-1">Ref. AT-1801-NOIR · Limited 50 Exemplars</p>
              </div>

              <div className="text-headline-md font-serif text-gold">
                {formatPrice(watches[0].price)} <span className="text-spec text-stone font-sans">USD Excl. Taxes</span>
              </div>

              {/* Spec grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Diameter", value: "40MM" },
                  { label: "Reserve", value: "72H" },
                  { label: "Jewels", value: "27" },
                  { label: "VPH", value: "28.8K" },
                  { label: "Weight", value: "62G" },
                  { label: "WR", value: "50M" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-charcoal p-3 text-center">
                    <span className="text-spec text-stone uppercase block">{label}</span>
                    <span className="text-caps-lg text-ivory mt-1 block">{value}</span>
                  </div>
                ))}
              </div>

              <div className="spec-row">
                <span className="text-spec text-stone uppercase">Movement</span>
                <span className="text-body-sm text-platinum">In-House Cal. 1801</span>
              </div>
              <div className="spec-row">
                <span className="text-spec text-stone uppercase">Case</span>
                <span className="text-body-sm text-platinum">Monobloc Ceramic</span>
              </div>
              <div className="spec-row">
                <span className="text-spec text-stone uppercase">Edition</span>
                <span className="text-body-sm text-gold">Strictly 50 Pieces</span>
              </div>

              <Link href="/collection/atelier-luna-noir" className="btn-primary">
                Acquire Timepiece
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials Editorial ───────────────────────────────────── */}
      <section aria-labelledby="materials-heading" className="py-20 md:py-28 bg-surface">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-caps-sm text-gold mb-3 block">The Atelier Standard</span>
              <h2 id="materials-heading" className="text-headline-lg font-serif text-ivory mb-6">
                Materials of Consequence.
              </h2>
              <p className="text-body-lg text-platinum mb-6">
                We work exclusively with materials that earn their place: Grade 5 titanium for its paradox of lightness and strength; zirconium carbide ceramic for its absolute hardness; 950 platinum for its rare density.
              </p>
              <div className="flex flex-col gap-4 mt-8">
                {[
                  { material: "Grand Feu Enamel", desc: "Fired at 850°C over three days. Each dial unique in its obsidian depth." },
                  { material: "Grade 5 Titanium", desc: "Aerospace-grade alloy — lighter than steel, stronger than most." },
                  { material: "Obsidian Ceramic", desc: "100 Vickers harder than steel. Scratch-proof and temperature-stable." },
                ].map(({ material, desc }) => (
                  <div key={material} className="flex gap-4 py-4 border-b border-hairline">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0 pulse" />
                    <div>
                      <span className="text-caps-lg text-ivory block mb-1">{material}</span>
                      <span className="text-body-sm text-stone">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/front_luxury_studio_photograph_of_a_magnificent_minimalist_luxury_wristwatch.png"
                alt="Studio photograph of the ATELIER minimalist luxury wristwatch"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-caps-sm text-gold mb-2 block">Promise of Excellence</span>
            <h2 id="services-heading" className="text-headline-lg font-serif text-ivory">
              The ATELIER Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 bg-obsidian border border-hairline hover:border-gold/30 transition-colors group">
                <span className="material-symbols-outlined text-gold text-[28px] mb-4 block group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <h3 className="text-body-md font-serif text-ivory mb-2 font-medium">{title}</h3>
                <p className="text-body-sm text-stone">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Philosophy ──────────────────────────────────────── */}
      <section aria-labelledby="philosophy-heading" className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/front_luxury_studio_photograph_of_an_avant_garde_titanium_luxury_chronograph.png"
            alt="Avant-garde titanium chronograph editorial"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        </div>
        <div className="container-luxury relative">
          <div className="max-w-lg">
            <span className="text-caps-sm text-gold mb-3 block">Our Philosophy</span>
            <h2
              id="philosophy-heading"
              className="text-display font-serif text-ivory mb-6"
            >
              Time is the only<br />true luxury.
            </h2>
            <p className="text-body-lg text-platinum mb-4">
              We believe a mechanical watch is the only machine whose sole function is to measure life itself. That conviction demands we build them without compromise.
            </p>
            <p className="text-body-md text-stone mb-10">
              Founded in Geneva in MCMLIX, ATELIER has remained privately owned for three generations — free from the pressures of mass production, answerable only to the exacting standards of the collector.
            </p>
            <Link href="/heritage" className="btn-primary">
              Discover Our Heritage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
