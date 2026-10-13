"use client";

import { useEffect } from "react";
import { useBag, BagItem } from "@/lib/bag-context";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/data";

export default function BagDrawer() {
  const { items, isOpen, closeBag, removeItem, updateQuantity, subtotal, totalItems } = useBag();

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Scrim */}
      <div
        role="presentation"
        onClick={closeBag}
        className={`bag-overlay ${isOpen ? "visible" : ""}`}
      />

      {/* Drawer */}
      <aside
        aria-label="Acquisition Tray"
        className={`bag-drawer ${isOpen ? "open" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
          <div>
            <p className="text-caps-sm text-gold">Private Portfolio</p>
            <h2 className="text-editorial font-serif text-ivory mt-0.5">Acquisition Tray</h2>
          </div>
          <div className="flex items-center gap-3">
            {totalItems > 0 && (
              <span className="text-spec text-stone uppercase">{totalItems} {totalItems === 1 ? "Masterpiece" : "Pieces"}</span>
            )}
            <button
              onClick={closeBag}
              aria-label="Close acquisition tray"
              className="w-9 h-9 flex items-center justify-center text-platinum hover:text-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Items or Empty */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyBag closeBag={closeBag} />
          ) : (
            <div className="px-6 py-6 flex flex-col gap-5">
              {items.map((item) => (
                <BagItemRow
                  key={`${item.id}-${item.selectedCase}-${item.selectedStrap}`}
                  item={item}
                  onRemove={removeItem}
                  onQty={updateQuantity}
                />
              ))}

              {/* Complimentary Inclusions */}
              <div className="mt-2 p-4 bg-surface-mid border border-hairline">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-gold text-[16px]">verified</span>
                  <span className="text-caps-sm text-ivory">Salon Inclusions</span>
                  <span className="ml-auto text-caps-sm text-gold">Complimentary</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    ["inventory_2", "Polished Macassar Ebony Box"],
                    ["luggage", "Fine Travel Leather Pouch"],
                    ["verified_user", "Signed Master Certificate & 5yr Warranty"],
                  ].map(([icon, label]) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-gold text-[14px]">{icon}</span>
                      <span className="text-spec text-platinum">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-hairline bg-charcoal">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-spec text-stone uppercase">Portfolio Value</span>
              <span className="text-editorial font-serif text-gold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-spec text-stone mb-5">
              Excl. taxes. Includes complimentary worldwide armored courier.
            </p>
            <Link
              href="/checkout"
              onClick={closeBag}
              className="btn-primary w-full text-center block mb-3"
            >
              Proceed to Acquisition
            </Link>
            <button
              onClick={closeBag}
              className="btn-ghost w-full"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyBag({ closeBag }: { closeBag: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center gap-4">
      <span className="material-symbols-outlined text-stone text-[48px]">shopping_bag</span>
      <h3 className="text-headline-sm font-serif text-ivory">Your tray is empty</h3>
      <p className="text-body-sm text-stone max-w-xs">
        Explore our curated collection and select a timepiece worthy of your portfolio.
      </p>
      <button onClick={closeBag} className="btn-primary mt-2">
        Explore Collection
      </button>
    </div>
  );
}

function BagItemRow({
  item,
  onRemove,
  onQty,
}: {
  item: BagItem;
  onRemove: (id: string) => void;
  onQty: (id: string, qty: number) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-24 bg-surface-low flex-shrink-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          sizes="80px"
        />
        <span className="absolute bottom-1 left-1 text-[9px] font-semibold tracking-widest text-gold uppercase bg-obsidian/80 px-1 py-0.5">
          Piece
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-caps-sm text-stone">Atelier Genève</span>
            <h3 className="text-body-md font-serif text-ivory mt-0.5 leading-tight">{item.name}</h3>
            <p className="text-spec text-gold mt-0.5">{item.reference}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
            className="text-stone hover:text-red-400 transition-colors mt-0.5"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
        {item.selectedCase && (
          <p className="text-spec text-platinum mt-1.5">{item.selectedCase} · {item.selectedStrap}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          {/* Qty controls */}
          <div className="flex items-center gap-2 border border-hairline">
            <button
              onClick={() => onQty(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center text-platinum hover:text-gold transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[14px]">remove</span>
            </button>
            <span className="text-body-sm text-ivory w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => onQty(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center text-platinum hover:text-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
            </button>
          </div>
          <span className="text-body-sm text-gold font-medium">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
