import Link from "next/link";

export const metadata = {
  title: "404 — Masterpiece Not Found",
  description: "The requested horological archive could not be located in our private vaults.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md w-full">
        <span className="font-caption text-champagne tracking-[0.3em] uppercase text-xs mb-3 block">
          Reference 404 • Vault Enclave
        </span>
        <h1 className="font-headline text-4xl sm:text-5xl text-ivory font-normal tracking-tight mb-4">
          Timepiece Not Found
        </h1>
        <p className="font-sans text-muted text-sm sm:text-base leading-relaxed mb-8">
          The horological archive or specific reference you are searching for is
          either restricted to private bespoke commissions or currently unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collection"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-primary text-obsidian text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne-light transition-colors"
          >
            Explore Collection
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-white/10 text-ivory text-xs tracking-[0.2em] uppercase font-normal hover:border-champagne/40 hover:text-champagne transition-colors"
          >
            Return to Salon
          </Link>
        </div>
      </div>
    </div>
  );
}
