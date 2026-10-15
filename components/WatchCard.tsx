"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Watch, formatPrice } from "@/lib/data";
import { useBag } from "@/lib/bag-context";

interface WatchCardProps {
  watch: Watch;
  priority?: boolean;
}

export default function WatchCard({ watch, priority = false }: WatchCardProps) {
  const { addItem } = useBag();
  const router = useRouter();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${watch.id}-default`,
      slug: watch.slug,
      name: watch.name,
      reference: watch.reference,
      price: watch.price,
      image: watch.images.dial,
    });
    router.push("/checkout");
  };

  return (
    <article className="watch-card group relative flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <Image
          src={watch.images.dial}
          alt={watch.name}
          fill
          priority={priority}
          className="watch-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {watch.badge && (
            <span className="px-2.5 py-1 bg-obsidian/80 backdrop-blur-md text-spec text-gold">
              {watch.badge}
            </span>
          )}
          {!watch.inStock && (
            <span className="px-2.5 py-1 bg-obsidian/80 backdrop-blur-md text-spec text-stone">
              Sold
            </span>
          )}
        </div>

        {/* Reference pill */}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-obsidian/75 backdrop-blur-sm text-spec text-stone">
          {watch.reference}
        </span>

        {/* Hover reveal overlay */}
        <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-colors duration-700 flex items-end justify-end p-4">
          <span className="text-caps-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
            View Details <span className="material-symbols-outlined text-[14px]">north_east</span>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 bg-charcoal">
        <div className="flex justify-between items-baseline mb-0.5">
          <span className="text-spec text-stone tracking-wider uppercase">{watch.collection}</span>
          <span className="text-caps-sm text-gold">{formatPrice(watch.price)}</span>
        </div>

        <h3 className="text-headline-sm font-serif text-ivory mb-2">{watch.name}</h3>
        <p className="text-body-sm text-platinum flex-1 mb-4 line-clamp-2">{watch.shortDescription}</p>

        {/* Quick specs */}
        <div className="flex gap-3 mb-5">
          {watch.specs.slice(0, 2).map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-spec text-stone uppercase">{s.label}</span>
              <span className="text-spec text-platinum">{s.value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleOrderNow}
            className="btn-primary w-full text-center"
            aria-label={`Order ${watch.name} now`}
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Order Now
          </button>
          <Link
            href={`/collection/${watch.slug}`}
            className="btn-ghost w-full text-center"
            aria-label={`View ${watch.name} details`}
          >
            Inquire with Concierge
          </Link>
        </div>
      </div>
    </article>
  );
}
