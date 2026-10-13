import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Haute Horlogerie Craftsmanship — ATELIER Genève",
  description:
    "Discover the artisanal mastery of ATELIER Genève. Hand-finished anglage, Côtes de Genève, and micro-mechanical precision assembled by master horologists.",
};

export default function CraftsmanshipPage() {
  const pillars = [
    {
      title: "Anglage & Mirror Polishing",
      description:
        "Every bridge and steel component is bevelled by hand using gentian wood and diamond paste. Reflections glide unbroken across every chamfered edge, requiring up to 40 hours for a single calibre.",
      spec: "45° Hand Chamfers • Black Polish Finish",
    },
    {
      title: "Breguet Overcoil & Free-Sprung Balance",
      description:
        "Tuned to five concentric positions across severe temperature extremes. Our regulation guarantees chronometric variance under ±1.5 seconds per day, far exceeding standard chronometer tests.",
      spec: "28,800 VpH (4Hz) • Geneva Hallmark Tolerance",
    },
    {
      title: "Obsidian Ceramic Sintering",
      description:
        "Zirconium oxide heated to 1,500°C under 2,000 atmospheres of isostatic pressure. Diamond-milled to surgical tolerance and impervious to scratches, corrosive salts, and UV degradation.",
      spec: "1,500 Vickers Hardness • Hypoallergenic",
    },
    {
      title: "Openworked Architectural Movement",
      description:
        "Each spoke of our titanium wheel trains is skeletonized to reduce inertia while maintaining structural rigidity. The result is pure mechanical transparency where every pulse of the escapement is visible.",
      spec: "Grade 5 Titanium • Sapphire Bridges",
    },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      {/* Hero Header */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-3">
            The Manufacture • Geneva
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl text-ivory font-light tracking-tight mb-6">
            Where Millimeters Become Art
          </h1>
          <p className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            At ATELIER Genève, a watch is not an assembly line product. It is a
            solitary dedication of 300 to 500 hours by a single master horologist,
            bridging centuries of Swiss tradition with avant-garde materials science.
          </p>
        </div>
      </div>

      {/* Editorial Visual Feature */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] bg-surface-lowest border border-hairline overflow-hidden">
            <Image
              src="/macro_close_up_studio_shot_of_a_high_luxury_swiss_mechanical_watch_open.png"
              alt="Artisanal watch movement macro close-up"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <span className="font-mono text-[11px] text-champagne uppercase tracking-widest bg-obsidian/80 px-2.5 py-1 border border-hairline">
                Calibre AG-1801 Movement
              </span>
              <span className="font-mono text-[10px] text-muted">
                100x Optical Inspection
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="font-caption text-xs uppercase tracking-widest text-primary">
              Hand Finishing Philosophy
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-light">
              Every Chamfer Cut by Human Touch
            </h2>
            <p className="font-sans text-muted text-sm sm:text-base leading-relaxed">
              Modern CNC milling can produce geometries of micron precision, but it
              cannot impart soul. At ATELIER, after mechanical shaping, every surface
              passes into the care of our finisher’s hands.
            </p>
            <p className="font-sans text-muted text-sm sm:text-base leading-relaxed">
              Using traditional boxwood pegs, gentian timber harvested from the Jura
              valleys, and progressively fine diamond compounds, our artisans impart
              flawless *anglage* (bevelled chamfers), *traits tirés* (straight-grained
              flanks), and specular black mirror polish.
            </p>
            <div className="pt-4 border-t border-hairline flex gap-8">
              <div>
                <span className="font-headline text-2xl text-champagne block">
                  380+
                </span>
                <span className="font-caption text-[11px] text-muted uppercase tracking-wider">
                  Individual Components
                </span>
              </div>
              <div>
                <span className="font-headline text-2xl text-champagne block">
                  120h
                </span>
                <span className="font-caption text-[11px] text-muted uppercase tracking-wider">
                  Hand Finisher Labor
                </span>
              </div>
              <div>
                <span className="font-headline text-2xl text-champagne block">
                  ±1.5s
                </span>
                <span className="font-caption text-[11px] text-muted uppercase tracking-wider">
                  Daily Chronometry
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="border-t border-hairline pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-caption text-xs uppercase tracking-widest text-primary block mb-2">
              Horological Pillars
            </span>
            <h3 className="font-headline text-3xl text-ivory font-light">
              Standards of the Manufacture
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-surface-lowest border border-hairline p-8 flex flex-col justify-between hover:border-champagne/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-champagne">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                      {pillar.spec}
                    </span>
                  </div>
                  <h4 className="font-headline text-xl text-ivory mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-muted text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-8 sm:p-12 bg-surface-container border border-hairline text-center">
          <span className="font-caption text-primary text-xs uppercase tracking-widest block mb-3">
            Private Commissions
          </span>
          <h3 className="font-headline text-3xl text-ivory mb-4 font-light">
            Commission a Singular Creation
          </h3>
          <p className="font-sans text-muted text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Acquire a piece from our current reference catalogue or arrange an
            audience with our Master Horologist for a private bespoke piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collection"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-obsidian text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne-light transition-colors"
            >
              Explore Timepieces
            </Link>
            <Link
              href="/bespoke"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-hairline text-ivory text-xs tracking-[0.2em] uppercase hover:border-champagne/40 hover:text-champagne transition-colors"
            >
              Bespoke Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
