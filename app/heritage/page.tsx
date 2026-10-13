import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacture Heritage — ATELIER Genève",
  description:
    "An unbroken line of horological reverence. Explore the heritage, archives, and generational philosophy behind ATELIER Genève.",
};

export default function HeritagePage() {
  const milestones = [
    {
      year: "1892",
      title: "Founding in the Vallée de Joux",
      description:
        "Master watchmaker Laurent d'Atelier establishes an independent workshop dedicated strictly to minute repeaters and astronomical pocket complications for royal houses.",
    },
    {
      year: "1934",
      title: "The Monopusher Chronographe Record",
      description:
        "Introduction of the Calibre 34, a high-frequency balance capable of measuring fifths of a second, awarded First Prize at the Geneva Observatory Chronometry trials.",
    },
    {
      year: "1978",
      title: "Defense of Mechanical Purity",
      description:
        "While industry winds shifted toward quartz, ATELIER recommitted to hand-wound architectural escapements, establishing our private vault reserve of unworked vintage movements.",
    },
    {
      year: "2018",
      title: "The Sintered Obsidian Breakthrough",
      description:
        "After five years of proprietary research, ATELIER develops high-density sintered obsidian ceramic—imbuing modern haute horlogerie with scratchless, mineral darkness.",
    },
    {
      year: "Today",
      title: "Strict Production Limitation",
      description:
        "The manufacture produces fewer than 180 total timepieces each year worldwide, ensuring absolute rarity, intimacy of patronage, and lifelong provenance tracking.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      {/* Hero */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-3">
            Since 1892 • Vallée de Joux & Genève
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl text-ivory font-light tracking-tight mb-6">
            Time as a Family Legacy
          </h1>
          <p className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We measure our life not in corporate quarters, but in generations. A
            timepiece from ATELIER is built to outlast dynasties, keeping time
            with quiet, unhurried certainty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Salon Showcase Image */}
        <div className="relative aspect-[21/9] bg-surface-lowest border border-hairline mb-20 overflow-hidden">
          <Image
            src="/atelier_flagship_boutique.png"
            alt="ATELIER Flagship Salon"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <span className="font-mono text-xs text-champagne uppercase tracking-widest block mb-1">
              Private Salon Enclave • Genève
            </span>
            <p className="font-headline text-xl sm:text-2xl text-ivory">
              Where Horological Patrons Are Received in Secrecy
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-caption text-xs uppercase tracking-widest text-primary block mb-2">
              Chronology
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-light">
              Epochs of Independent Mastery
            </h2>
          </div>

          <div className="relative border-l border-hairline/80 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
            {milestones.map((m) => (
              <div key={m.year} className="relative group">
                <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-champagne group-hover:bg-champagne transition-colors" />
                <span className="font-mono text-xs text-champagne tracking-widest block mb-1">
                  {m.year}
                </span>
                <h3 className="font-headline text-xl text-ivory mb-2">
                  {m.title}
                </h3>
                <p className="font-sans text-muted text-sm leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Heritage Quotation */}
        <div className="mt-24 p-8 sm:p-14 bg-surface-lowest border border-hairline text-center max-w-4xl mx-auto">
          <span className="font-serif italic text-2xl sm:text-3xl text-ivory leading-relaxed block mb-6">
            “You never truly own an ATELIER timepiece. You merely safeguard its
            mechanical heartbeat for the next century.”
          </span>
          <span className="font-caption text-xs uppercase tracking-[0.25em] text-champagne">
            — Laurent d&apos;Atelier, Founder
          </span>
        </div>
      </div>
    </div>
  );
}
