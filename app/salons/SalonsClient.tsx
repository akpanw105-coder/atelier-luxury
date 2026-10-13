"use client";

interface Salon {
  city: string;
  title: string;
  address: string;
  tel: string;
  hours: string;
  features: string;
}

export default function SalonsClient({ salons }: { salons: Salon[] }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-3">
            Worldwide Enclaves
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl text-ivory font-light tracking-tight mb-6">
            Private Salons
          </h1>
          <p className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discreet sanctuaries for private viewings, bespoke fittings, and
            ceremonial handovers away from public view.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div
              key={salon.city}
              className="bg-surface-lowest border border-hairline p-8 flex flex-col justify-between hover:border-champagne/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline text-2xl text-ivory">
                    {salon.city}
                  </span>
                  <span className="font-mono text-[10px] text-champagne uppercase tracking-widest bg-surface-container px-2 py-0.5 border border-hairline">
                    Salon
                  </span>
                </div>
                <h3 className="font-serif italic text-base text-champagne mb-4">
                  {salon.title}
                </h3>
                <div className="space-y-2 text-xs text-muted mb-6">
                  <p>{salon.address}</p>
                  <p className="font-mono text-ivory">{salon.tel}</p>
                  <p className="text-[11px] text-secondary">{salon.hours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-hairline">
                <span className="text-[10px] text-primary uppercase font-caption tracking-wider block mb-3">
                  {salon.features}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Private appointment requested for ${salon.city}. Our concierge team will reach out to confirm your slot.`
                    )
                  }
                  className="w-full py-2.5 border border-hairline text-ivory text-xs uppercase font-caption tracking-wider hover:border-champagne hover:text-champagne transition-colors"
                >
                  Book Private Audience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
