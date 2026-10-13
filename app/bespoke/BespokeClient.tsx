"use client";

export default function BespokeClient() {
  const steps = [
    {
      step: "01",
      title: "Private Audience",
      desc: "An initial private consultation in our Geneva Salon or your residence to establish creative aspirations, material choices, and complication requirements.",
    },
    {
      step: "02",
      title: "Aesthetic & Technical Blueprints",
      desc: "Our design studio drafts hand-rendered gouache sketches and CAD engineering simulations of custom calibres, dials, and unique case geometries.",
    },
    {
      step: "03",
      title: "Artisanal Execution",
      desc: "Over 6 to 14 months, our master watchmakers, engravers, and gem-setters fabricate your singular piece with regular photographic progress dispatches.",
    },
    {
      step: "04",
      title: "Geneva Handover & Provenance Registry",
      desc: "Personal handover celebration with our Master Watchmaker, including your individual leather-bound archival ledger inscribed in the Geneva Vault records.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-3">
            Sur-Mesure • Piece Unique
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl text-ivory font-light tracking-tight mb-6">
            Bespoke Commissions
          </h1>
          <p className="font-sans text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            For collectors who desire an object that exists nowhere else in the
            known universe. We accept just twelve bespoke commissions each year.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-surface-lowest border border-hairline p-8 flex flex-col justify-between hover:border-champagne/40 transition-colors"
            >
              <div>
                <span className="font-mono text-2xl text-champagne block mb-4">
                  {s.step}
                </span>
                <h3 className="font-headline text-xl text-ivory mb-3">
                  {s.title}
                </h3>
                <p className="font-sans text-muted text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Form */}
        <div className="max-w-2xl mx-auto bg-surface-lowest border border-hairline p-8 sm:p-12">
          <span className="font-caption text-xs uppercase tracking-widest text-primary block mb-2 text-center">
            Inquire for Patronage
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl text-ivory font-light text-center mb-6">
            Initiate a Private Commission
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Your private commission dossier has been submitted to the Geneva Client Director. We shall be in touch within 24 hours."
              );
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord Sterling"
                  className="w-full bg-surface-container border border-hairline px-3 py-2 text-ivory focus:border-champagne focus:outline-none"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                  Direct Contact / Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="collector@domain.com"
                  className="w-full bg-surface-container border border-hairline px-3 py-2 text-ivory focus:border-champagne focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                Desired Complication / Aesthetic Focus
              </label>
              <input
                type="text"
                placeholder="e.g. Celestial Chart, Flying Tourbillon, Meteorite Dial"
                className="w-full bg-surface-container border border-hairline px-3 py-2 text-ivory focus:border-champagne focus:outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-muted mb-1 text-[10px]">
                Notes or Historical Context
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe the vision or intended commemorative milestone..."
                className="w-full bg-surface-container border border-hairline px-3 py-2 text-ivory focus:border-champagne focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-obsidian uppercase font-caption text-xs tracking-[0.2em] font-semibold hover:bg-champagne-light transition-colors mt-4"
            >
              Submit Commission Brief
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
