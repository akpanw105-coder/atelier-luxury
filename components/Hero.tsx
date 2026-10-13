"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const HERO_VIDEO_URL =
  "https://res.cloudinary.com/oebaqlvj/video/upload/v1791843559/Luxury_watch_assembly_animation_20261012151237.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /* Resume autoplay if paused by browser */
    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {/* silently ignore */});
      }
    };

    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, []);

  return (
    <section
      aria-label="Brand hero"
      className="relative w-full"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* ── Background Video ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-obsidian">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster="/atelier_flagship_boutique.png"
          style={{ objectPosition: "center center" }}
        />
        {/* Reduced motion: hide video, show poster */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            video { display: none; }
          }
        `}</style>
      </div>

      {/* ── Cinematic Overlay ─────────────────────────────────── */}
      <div className="hero-overlay" />
      {/* Bottom vignette for content legibility */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "55%",
          background: "linear-gradient(to top, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.5) 50%, transparent 100%)",
        }}
      />

      {/* ── Calibre Badge — top-left ──────────────────────────── */}
      <div className="absolute top-20 md:top-24 left-6 md:left-[4vw] flex items-center gap-2 px-3 py-1.5 bg-obsidian/60 backdrop-blur-md border border-hairline">
        <span className="w-1.5 h-1.5 rounded-full bg-gold pulse" />
        <span className="text-spec text-gold tracking-widest">CALIBRE 1801</span>
        <span className="text-spec text-stone">· 28,800 VPH</span>
      </div>

      {/* ── Hero Content — bottom ─────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 container-luxury pb-14 md:pb-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4 md:mb-5">
          <span className="w-6 h-px bg-gold" />
          <span className="text-caps-sm text-gold">The Art of Horology</span>
        </div>

        {/* Headline */}
        <h1
          className="text-display font-serif text-ivory mb-4 md:mb-6 max-w-2xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
        >
          TIME,<br />PERFECTED.
        </h1>

        {/* Supporting copy */}
        <p className="text-body-lg text-platinum mb-8 md:mb-10 max-w-md" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>
          An expression of precision, crafted for those<br className="hidden md:block" /> who recognize the extraordinary.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link href="/collection" className="btn-primary">
            Explore the Collection
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <Link href="/craftsmanship" className="btn-ghost">
            Discover Our Craft
            <span className="text-gold">↗</span>
          </Link>
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-50">
        <span className="text-spec text-stone tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone to-transparent animate-[slideDown_1.5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
