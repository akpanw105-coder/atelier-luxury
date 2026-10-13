"use client";

import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Collection",
    links: [
      { label: "All Timepieces", href: "/collection" },
      { label: "Complications", href: "/collection?category=complications" },
      { label: "Chronographs", href: "/collection?category=chronographs" },
      { label: "Tourbillons", href: "/collection?category=tourbillon" },
      { label: "Minimalist", href: "/collection?category=minimalist" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Our Heritage", href: "/heritage" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Bespoke Services", href: "/bespoke" },
      { label: "Salon Locations", href: "/salons" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Account", href: "/account" },
      { label: "Acquisition Tray", href: "/bag" },
      { label: "After-Sales Care", href: "/care" },
      { label: "Authenticity", href: "/authenticity" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-hairline mt-auto">
      {/* Newsletter */}
      <div className="border-b border-hairline py-12 md:py-16">
        <div className="container-luxury flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-caps-sm text-gold mb-1">Private Circle</p>
            <h2 className="text-headline-md font-serif text-ivory mb-1">
              First access to rare pieces.
            </h2>
            <p className="text-body-sm text-stone max-w-sm">
              Join our collector circle for pre-release previews, limited editions, and exclusive salon invitations.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Links */}
      <div className="py-12 md:py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Wordmark */}
            <div>
              <div className="flex flex-col leading-none mb-4">
                <span className="text-caps-sm text-gold tracking-[0.35em] text-base">ATELIER</span>
                <span className="text-spec text-stone" style={{ fontSize: "0.6rem" }}>GENÈVE · EST. MCMLIX</span>
              </div>
              <p className="text-body-sm text-stone max-w-[200px]">
                Haute horlogerie forged in the tradition of the Vallée de Joux masters.
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  { icon: "language", label: "Website" },
                  { icon: "mail", label: "Email" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 border border-hairline flex items-center justify-center text-stone hover:border-gold hover:text-gold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-caps-sm text-gold mb-4">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-body-sm text-stone hover:text-platinum transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline py-5">
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-spec text-stone">
            © 2026 Atelier Genève SA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Sale", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="text-spec text-stone hover:text-platinum transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Newsletter Form ─────────────────────────────────────────────── */
function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.querySelector("input") as HTMLInputElement;
        if (input?.value) {
          input.value = "";
          const msg = form.querySelector("[data-success]") as HTMLElement;
          if (msg) {
            msg.style.display = "block";
            setTimeout(() => { msg.style.display = "none"; }, 5000);
          }
        }
      }}
      className="flex flex-col gap-3 w-full md:w-auto"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full sm:w-72 px-4 py-3 bg-charcoal border border-hairline text-body-sm text-ivory placeholder:text-stone outline-none focus:border-gold transition-colors"
          />
        </div>
        <button type="submit" className="btn-primary whitespace-nowrap">
          Join the Circle
        </button>
      </div>
      <p
        data-success
        style={{ display: "none" }}
        className="text-spec text-gold flex items-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[14px]">check_circle</span>
        Welcome to the Private Circle. Expect an invitation shortly.
      </p>
      <p className="text-spec text-stone">
        By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
      </p>
    </form>
  );
}
