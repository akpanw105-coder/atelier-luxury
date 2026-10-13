"use client";

import Link from "next/link";

export default function AccountClient() {
  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-surface-lowest border border-hairline p-8 sm:p-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-surface-container border border-hairline flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-[24px]">
              key
            </span>
          </div>

          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-2">
            Private Client Portal
          </span>
          <h1 className="font-headline text-3xl sm:text-4xl text-ivory font-light mb-4">
            Patron Vault Access
          </h1>
          <p className="font-sans text-muted text-xs sm:text-sm leading-relaxed mb-8">
            Access your registered timepiece provenance ledgers, complimentary
            servicing bookings, and invitation-only previews of future calibre
            allocations.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Patron authentication token requested. Check your registered VIP concierge email."
              );
            }}
            className="space-y-4 text-left text-xs mb-8"
          >
            <div>
              <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                Patron ID / Registered Email
              </label>
              <input
                type="email"
                required
                placeholder="patron@estate.ch"
                className="w-full bg-surface-container border border-hairline px-3 py-2.5 text-ivory focus:border-champagne focus:outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                Timepiece Provenance Serial Code
              </label>
              <input
                type="text"
                placeholder="e.g. AG-1801-007"
                className="w-full bg-surface-container border border-hairline px-3 py-2.5 text-ivory focus:border-champagne focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-obsidian uppercase font-caption text-xs tracking-[0.2em] font-semibold hover:bg-champagne-light transition-colors mt-2"
            >
              Authenticate Vault Session
            </button>
          </form>

          <div className="pt-6 border-t border-hairline text-xs text-muted">
            <p>
              Not yet registered as an ATELIER Patron?{" "}
              <Link href="/collection" className="text-champagne underline">
                Acquire a timepiece
              </Link>{" "}
              or{" "}
              <Link href="/bespoke" className="text-champagne underline">
                request a private audience
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
