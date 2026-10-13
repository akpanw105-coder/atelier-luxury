"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBag } from "@/lib/bag-context";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Heritage", href: "/heritage" },
  { label: "Bespoke", href: "/bespoke" },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, openBag }     = useBag();
  const pathname                    = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHeroPage = pathname === "/";
  const navBg = scrolled || !isHeroPage
    ? "bg-obsidian/90 backdrop-blur-xl border-b border-hairline shadow-[0_1px_0_rgba(255,255,255,0.04)]"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navBg} pt-safe`}
      >
        <div className="container-luxury h-16 md:h-18 flex items-center justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="flex md:hidden w-10 h-10 items-center justify-center text-platinum hover:text-gold transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Wordmark */}
          <Link
            href="/"
            aria-label="ATELIER home"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex flex-col items-center leading-none group"
          >
            <span
              className="text-caps-sm text-gold tracking-[0.35em] group-hover:tracking-[0.4em] transition-all duration-500"
              style={{ fontFamily: "var(--font-plus-jakarta)", fontSize: "0.8rem" }}
            >
              ATELIER
            </span>
            <span className="text-spec text-stone tracking-widest" style={{ fontSize: "0.55rem" }}>
              GENÈVE · EST. MCMLIX
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname.startsWith(href) ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search timepieces"
              className="w-10 h-10 flex items-center justify-center text-platinum hover:text-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Account placeholder */}
            <Link
              href="/account"
              aria-label="Account"
              className="hidden md:flex w-10 h-10 items-center justify-center text-platinum hover:text-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>

            {/* Bag */}
            <button
              onClick={openBag}
              aria-label={`Acquisition tray — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              className="w-10 h-10 flex items-center justify-center text-platinum hover:text-gold transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-gold ring-2 ring-obsidian pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

/* ── Search Overlay ──────────────────────────────────────────────── */
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const el = document.getElementById("search-input");
    el?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  const results = query.length > 1
    ? [
        query.toLowerCase().includes("luna") && { name: "Atelier Luna Noir", slug: "atelier-luna-noir", price: "$48,000" },
        query.toLowerCase().includes("chro") && { name: "Chronographe Titane", slug: "chronographe-titane", price: "$62,000" },
        query.toLowerCase().includes("tour") && { name: "Tourbillon Vitreux", slug: "tourbillon-vitreux", price: "$96,000" },
        query.toLowerCase().includes("gran") && { name: "Grand Complication Platine", slug: "grand-complication-platine", price: "$185,000" },
      ].filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl flex flex-col">
      <div className="container-luxury pt-24 flex-1">
        <div className="flex items-center gap-4 border-b border-hairline pb-4">
          <span className="material-symbols-outlined text-gold text-[24px]">search</span>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search timepieces, collections, references…"
            className="flex-1 bg-transparent text-headline-md font-serif text-ivory placeholder:text-stone outline-none"
            aria-label="Search timepieces"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-stone hover:text-gold transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {query.length === 0 && (
          <div className="mt-8">
            <p className="text-caps-sm text-stone mb-4">Suggested</p>
            <div className="flex flex-wrap gap-2">
              {["Luna Noir", "Chronograph", "Tourbillon", "Grand Complication"].map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="px-3 py-1.5 border border-hairline text-spec text-platinum hover:border-gold hover:text-gold transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 flex flex-col gap-2">
            {(results as { name: string; slug: string; price: string }[]).map((r) => (
              <Link
                key={r.slug}
                href={`/collection/${r.slug}`}
                onClick={onClose}
                className="flex items-center justify-between py-4 border-b border-hairline hover:border-gold/30 group transition-colors"
              >
                <span className="text-editorial font-serif text-ivory group-hover:text-gold transition-colors">{r.name}</span>
                <span className="text-spec text-gold">{r.price}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Menu ─────────────────────────────────────────────────── */
function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={`bag-overlay ${isOpen ? "visible" : ""}`}
        style={{ zIndex: 250 }}
      />
      <nav
        aria-label="Mobile navigation"
        className={`mobile-menu ${isOpen ? "open" : ""} flex flex-col`}
        style={{ zIndex: 300 }}
      >
        <div className="flex items-center justify-between px-6 py-5 pt-safe">
          <div className="flex flex-col leading-none">
            <span className="text-caps-sm text-gold tracking-[0.35em]" style={{ fontSize: "0.8rem" }}>ATELIER</span>
            <span className="text-spec text-stone" style={{ fontSize: "0.55rem" }}>GENÈVE · EST. MCMLIX</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center text-platinum hover:text-gold transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`block py-5 border-b border-hairline text-headline-md font-serif transition-colors ${pathname.startsWith(href) ? "text-gold" : "text-ivory hover:text-gold"}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/account"
            className="block py-5 border-b border-hairline text-headline-md font-serif text-ivory hover:text-gold transition-colors"
          >
            Account
          </Link>
        </div>

        <div className="px-8 py-8 pb-safe">
          <p className="text-spec text-stone mb-1">Private Client Services</p>
          <p className="text-body-sm text-platinum">+41 22 000 0000</p>
        </div>
      </nav>
    </>
  );
}
