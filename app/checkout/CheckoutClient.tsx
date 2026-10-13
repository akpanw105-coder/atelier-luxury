"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBag } from "@/lib/bag-context";
import { formatPrice } from "@/lib/data";

type DeliveryMethod = "courier" | "salon";

export default function CheckoutClient() {
  const { items, subtotal, updateQuantity, removeItem, clearBag } = useBag();

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("courier");
  const [monogram, setMonogram] = useState("M.V. • MCMLXXXVIII");
  const [wristSize, setWristSize] = useState("Standard Medium (175mm–190mm)");
  const [isEditingMonogram, setIsEditingMonogram] = useState(false);
  const [isEditingWrist, setIsEditingWrist] = useState(false);

  // Form states
  const [salutation, setSalutation] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Switzerland");
  const [salonLocation, setSalonLocation] = useState("Geneva Flagship Salon");
  const [clientNotes, setClientNotes] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `ATG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(refCode);
    setOrderPlaced(true);
    clearBag();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-surface">
        <div className="max-w-xl w-full bg-surface-lowest border border-hairline p-8 md:p-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-[28px]">
              verified
            </span>
          </div>

          <span className="font-caption text-primary tracking-[0.25em] uppercase text-xs">
            Acquisition Confirmed
          </span>
          <h1 className="font-headline text-3xl md:text-4xl text-ivory mt-2 mb-4 font-normal">
            Your Commission is Sealed
          </h1>

          <div className="inline-block px-4 py-2 bg-surface-container border border-hairline font-mono text-champagne text-xs tracking-widest my-4">
            DOSSIER REF: {orderReference}
          </div>

          <p className="font-sans text-muted text-sm leading-relaxed mb-6">
            Thank you, {salutation} {lastName || "Patron"}. Your dossier has been
            transmitted directly to our Geneva Client Concierge. Our Master
            Horologist and Private Client Director will contact you within 4
            hours to coordinate handover formalities and provenance registry.
          </p>

          <div className="p-4 bg-surface-low border border-hairline/60 text-left text-xs text-muted mb-8 space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary">Handover Protocol:</span>
              <span className="text-ivory font-medium">
                {deliveryMethod === "courier"
                  ? "Armored Diplomatic Courier"
                  : salonLocation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Custom Inscription:</span>
              <span className="text-ivory font-mono">{monogram || "None"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Payment Method:</span>
              <span className="text-champagne font-medium">
                Private Escrow / Bank Wire on Handover
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-obsidian text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne-light transition-colors"
            >
              Return to Salon
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-hairline text-ivory text-xs tracking-[0.2em] uppercase hover:border-champagne/40 hover:text-champagne transition-colors"
            >
              Explore Timepieces
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/collection"
              className="text-muted hover:text-champagne text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              Return to Collection
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-champagne bg-surface-container px-3 py-1 border border-hairline">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            256-BIT ENCRYPTED VAULT ENCLAVE
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="font-caption text-primary tracking-[0.3em] uppercase text-xs block mb-2">
            Private Portfolio Protocol
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl text-ivory font-light tracking-tight">
            Acquisition Tray & Checkout
          </h1>
          <p className="font-sans text-muted text-sm mt-2 max-w-xl">
            Complete your bespoke acquisition. Every ATELIER timepiece is
            hand-regulated, certified by COSC, and accompanied by our lifetime
            provenance ledger.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-surface-lowest border border-hairline p-12 text-center max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-container flex items-center justify-center text-muted">
              <span className="material-symbols-outlined text-[28px]">
                shopping_bag
              </span>
            </div>
            <h2 className="font-headline text-2xl text-ivory mb-2 font-normal">
              Your Acquisition Tray is Empty
            </h2>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              You have not yet selected a timepiece for your private portfolio.
              Explore our current horological creations.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-obsidian text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne-light transition-colors"
            >
              View Collection
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left Column: Cart Items & Customization & Client Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Items Card */}
              <div className="bg-surface-lowest border border-hairline p-6 md:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                  <h2 className="font-headline text-xl text-ivory">
                    Acquisition Masterpieces
                  </h2>
                  <span className="font-caption text-xs uppercase tracking-widest text-champagne">
                    {items.length} {items.length === 1 ? "Piece" : "Pieces"}
                  </span>
                </div>

                <div className="divide-y divide-hairline">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedCase}-${item.selectedStrap}`}
                      className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6"
                    >
                      <div className="relative w-28 h-36 bg-surface-container flex-shrink-0 border border-hairline overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="112px"
                          className="object-contain p-2"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-surface-lowest/90 text-[9px] font-mono tracking-widest text-champagne uppercase">
                          {item.reference}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="font-caption text-[11px] text-muted uppercase tracking-widest">
                                Atelier Genève
                              </span>
                              <h3 className="font-headline text-xl text-ivory mt-0.5">
                                {item.name}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-muted hover:text-primary transition-colors p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                close
                              </span>
                            </button>
                          </div>

                          <div className="text-xs text-secondary mt-2 space-y-0.5">
                            {item.selectedCase && (
                              <p>
                                Case:{" "}
                                <span className="text-ivory">
                                  {item.selectedCase}
                                </span>
                              </p>
                            )}
                            {item.selectedStrap && (
                              <p>
                                Strap:{" "}
                                <span className="text-ivory">
                                  {item.selectedStrap}
                                </span>
                              </p>
                            )}
                            <p className="text-muted">
                              Ref. {item.reference}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-hairline/60">
                          <div className="flex items-center border border-hairline">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-muted hover:text-champagne transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono text-ivory">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-muted hover:text-champagne transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-headline text-lg text-champagne">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-muted">
                                {formatPrice(item.price)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier Bespoke Directives */}
              <div className="bg-surface-lowest border border-hairline p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    tune
                  </span>
                  <h2 className="font-headline text-lg text-ivory">
                    Atelier Customization Directives
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Monogram */}
                  <div className="p-4 bg-surface-container border border-hairline">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          history_edu
                        </span>
                        <div>
                          <p className="text-xs font-medium text-ivory uppercase tracking-wider">
                            Caseback Monogram Inscription
                          </p>
                          <p className="font-mono text-xs text-champagne mt-0.5">
                            {monogram ? `“${monogram}”` : "No engraving specified"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditingMonogram(!isEditingMonogram)}
                        className="text-xs uppercase font-caption tracking-widest text-primary hover:text-champagne-light"
                      >
                        {isEditingMonogram ? "Save" : "Edit"}
                      </button>
                    </div>

                    {isEditingMonogram && (
                      <div className="mt-3 pt-3 border-t border-hairline">
                        <input
                          type="text"
                          value={monogram}
                          onChange={(e) => setMonogram(e.target.value)}
                          placeholder="e.g. M.V. • MCMLXXXVIII"
                          maxLength={32}
                          className="w-full bg-surface-lowest border border-hairline px-3 py-2 text-xs text-ivory focus:border-champagne focus:outline-none"
                        />
                        <p className="text-[10px] text-muted mt-1">
                          Up to 32 Roman characters, initials, or year of commemorative commission. Hand-engraved by our master gilder.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Wrist sizing */}
                  <div className="p-4 bg-surface-container border border-hairline">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          straighten
                        </span>
                        <div>
                          <p className="text-xs font-medium text-ivory uppercase tracking-wider">
                            Bespoke Wrist Fitting
                          </p>
                          <p className="font-mono text-xs text-secondary mt-0.5">
                            {wristSize}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditingWrist(!isEditingWrist)}
                        className="text-xs uppercase font-caption tracking-widest text-primary hover:text-champagne-light"
                      >
                        {isEditingWrist ? "Save" : "Adjust"}
                      </button>
                    </div>

                    {isEditingWrist && (
                      <div className="mt-3 pt-3 border-t border-hairline space-y-2">
                        <select
                          value={wristSize}
                          onChange={(e) => setWristSize(e.target.value)}
                          className="w-full bg-surface-lowest border border-hairline px-3 py-2 text-xs text-ivory focus:border-champagne focus:outline-none"
                        >
                          <option value="Petite (150mm–165mm)">
                            Petite (150mm–165mm)
                          </option>
                          <option value="Standard Medium (175mm–190mm)">
                            Standard Medium (175mm–190mm)
                          </option>
                          <option value="Grand Large (195mm–210mm)">
                            Grand Large (195mm–210mm)
                          </option>
                          <option value="Custom Size (Concierge Call Required)">
                            Custom Size (Concierge Call Required)
                          </option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Dossier Information Form */}
              <div className="bg-surface-lowest border border-hairline p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-hairline">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    person
                  </span>
                  <h2 className="font-headline text-xl text-ivory">
                    Client Dossier & Delivery
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex gap-4 items-center mb-2">
                    {["Mr.", "Mrs.", "Ms.", "Dr.", "Hon."].map((title) => (
                      <label
                        key={title}
                        className="flex items-center gap-1.5 text-xs text-secondary cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="salutation"
                          checked={salutation === title}
                          onChange={() => setSalutation(title)}
                          className="accent-primary"
                        />
                        <span>{title}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Alexander"
                      className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="von Habsburg"
                      className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                      Private Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patron@estate.ch"
                      className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                      Direct Mobile / Signal *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 22 819 00 00"
                      className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>

                  {deliveryMethod === "courier" ? (
                    <>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                          Delivery Address (Residential / Private Office) *
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Rue du Rhône 42, Private Residence"
                          className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                          City & Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="1204 Genève"
                          className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                          Jurisdiction / Country *
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                        >
                          <option value="Switzerland">Switzerland</option>
                          <option value="France">France</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="Japan">Japan</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Germany">Germany</option>
                          <option value="Monaco">Monaco</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                        Preferred Handover Flagship Salon *
                      </label>
                      <select
                        value={salonLocation}
                        onChange={(e) => setSalonLocation(e.target.value)}
                        className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                      >
                        <option value="Geneva Flagship Salon — Rue du Rhône 42">
                          Geneva Flagship Salon — Rue du Rhône 42
                        </option>
                        <option value="Zurich Private Suite — Bahnhofstrasse 18">
                          Zurich Private Suite — Bahnhofstrasse 18
                        </option>
                        <option value="Tokyo Ginza Atelier — Ginza 6-Chome">
                          Tokyo Ginza Atelier — Ginza 6-Chome
                        </option>
                        <option value="New York Salon — Madison Avenue 740">
                          New York Salon — Madison Avenue 740
                        </option>
                        <option value="London Mayfair Chamber — Old Bond Street 14">
                          London Mayfair Chamber — Old Bond Street 14
                        </option>
                      </select>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">
                      Confidential Notes for Master Horologist (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Special instructions regarding presentation, security liaison, or date preferences..."
                      className="w-full bg-surface-container border border-hairline px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Handover Protocol & Financial Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-8 sticky top-28">
              {/* Delivery Protocol */}
              <div className="bg-surface-lowest border border-hairline p-6 md:p-8">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-hairline">
                  <span className="font-caption text-xs uppercase tracking-wider text-ivory font-medium">
                    Handover & Transit Protocol
                  </span>
                  <span className="text-[11px] font-mono text-champagne">
                    Fully Insured
                  </span>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryMethod("courier")}
                    className={`block p-4 border transition-all cursor-pointer ${
                      deliveryMethod === "courier"
                        ? "bg-surface-container border-champagne/60 shadow-lg"
                        : "bg-surface-low border-hairline hover:border-hairline-light"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery_method"
                        checked={deliveryMethod === "courier"}
                        onChange={() => setDeliveryMethod("courier")}
                        className="mt-1 accent-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-ivory">
                            Armored White-Glove Courier
                          </span>
                          <span className="text-[10px] uppercase font-caption tracking-wider text-primary">
                            Complimentary
                          </span>
                        </div>
                        <p className="text-[11px] text-muted mt-1 leading-relaxed">
                          Dedicated diplomatic courier with GPS telemetry and tamper-evident sealed vault. 48h global dispatch.
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod("salon")}
                    className={`block p-4 border transition-all cursor-pointer ${
                      deliveryMethod === "salon"
                        ? "bg-surface-container border-champagne/60 shadow-lg"
                        : "bg-surface-low border-hairline hover:border-hairline-light"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="delivery_method"
                        checked={deliveryMethod === "salon"}
                        onChange={() => setDeliveryMethod("salon")}
                        className="mt-1 accent-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-ivory">
                            Private Salon Handover
                          </span>
                          <span className="text-[10px] uppercase font-caption tracking-wider text-secondary">
                            By Appointment
                          </span>
                        </div>
                        <p className="text-[11px] text-muted mt-1 leading-relaxed">
                          VIP presentation suite with personal horologist: Geneva, Zurich, Tokyo, or New York.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Complimentary Salon Inclusions */}
              <div className="bg-surface-lowest border border-hairline p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      verified
                    </span>
                    <span className="font-caption text-xs uppercase tracking-wider text-ivory font-medium">
                      Salon Inclusions
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-champagne">
                    Complimentary
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-3 p-2.5 bg-surface-container border border-hairline/60">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px]">
                        inventory_2
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-ivory font-medium truncate">
                        Polished Macassar Ebony Box
                      </p>
                      <p className="text-[10px] text-muted truncate">
                        Handcrafted Swiss artisan lacquered casing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-surface-container border border-hairline/60">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px]">
                        luggage
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-ivory font-medium truncate">
                        Fine Travel Leather Pouch
                      </p>
                      <p className="text-[10px] text-muted truncate">
                        Full-grain calfskin protection sleeve
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-surface-container border border-hairline/60">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px]">
                        verified_user
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-ivory font-medium truncate">
                        Signed Master Provenance Certificate
                      </p>
                      <p className="text-[10px] text-muted truncate">
                        Numbered Geneva ledger & 5-year manufacture warranty
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-surface-lowest border border-hairline p-6 md:p-8">
                <span className="font-caption text-xs uppercase tracking-widest text-muted block mb-4">
                  Financial Ledger
                </span>

                <div className="space-y-3 pb-4 border-b border-hairline text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Masterpiece Subtotal</span>
                    <span className="text-ivory font-mono">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Diplomatic Insured Logistics</span>
                    <span className="text-champagne font-mono uppercase">
                      $0.00 (Atelier Care)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Bespoke Monogramming</span>
                    <span className="text-champagne font-mono uppercase">
                      Included
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Import Duties & Taxes</span>
                    <span className="text-secondary italic">
                      Assessed upon handover
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-4 mb-6">
                  <div>
                    <span className="font-headline text-lg text-ivory">
                      Total Payable
                    </span>
                    <p className="text-[10px] text-muted font-mono uppercase">
                      Escrow release upon handover
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-2xl text-champagne font-normal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-primary text-obsidian font-caption text-xs uppercase tracking-[0.22em] font-semibold hover:bg-champagne-light transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                  >
                    <span>Proceed to Bespoke Checkout</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Concierge Direct Line: +41 22 819 00 00\nBank wire instructions and cryptographic multi-sig escrow details will be dispatched securely to your verified email."
                      );
                    }}
                    className="w-full py-3.5 px-6 bg-surface-container hover:bg-surface-container-high text-ivory font-caption text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-hairline"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      account_balance
                    </span>
                    <span>Wire Transfer / Crypto Concierge</span>
                  </button>
                </div>

                {/* Trust Seals */}
                <div className="pt-6 mt-6 border-t border-hairline flex items-center justify-center gap-6 text-[10px] text-secondary font-mono uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      security
                    </span>
                    <span>Geneva Seal Vault</span>
                  </div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      workspace_premium
                    </span>
                    <span>COSC Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
