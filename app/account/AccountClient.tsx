"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface PatronProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  patron_tier: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  created_at: string;
}

interface VaultTimepiece {
  id: string;
  watch_slug: string;
  watch_name: string;
  serial_number: string;
  acquisition_date: string;
  service_status: string;
}

export default function AccountClient() {
  const [tab, setTab] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PatronProfile | null>(null);
  const [vaultPieces, setVaultPieces] = useState<VaultTimepiece[]>([]);
  const [initialCheck, setInitialCheck] = useState(true);

  // New Piece Registration Modal state
  const [registerModal, setRegisterModal] = useState(false);
  const [newPieceName, setNewPieceName] = useState("Atelier Luna Noir");
  const [newPieceSerial, setNewPieceSerial] = useState("");
  const [registeringPiece, setRegisteringPiece] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchProfileAndVault(user.id);
      }
      setInitialCheck(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfileAndVault(currentUser.id);
      } else {
        setProfile(null);
        setVaultPieces([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchProfileAndVault(userId: string) {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (profileData) {
        setProfile(profileData as PatronProfile);
      }

      const { data: vaultData } = await supabase
        .from("timepiece_vault")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (vaultData) {
        setVaultPieces(vaultData as VaultTimepiece[]);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Vault session authenticated. Welcome back, Patron." });
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      if (data.user) {
        if (city || country || fullName) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            city,
            country,
            patron_tier: "Founding Collector",
          });
        }
        setMessage({
          type: "success",
          text: "Patron account created successfully. Your credentials and ledger have been registered in the Geneva vault.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Patron verification dispatch sent. Please inspect your inbox to complete verification.",
        });
      }
    }
  }

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setUser(null);
    setProfile(null);
    setVaultPieces([]);
    setMessage({ type: "success", text: "Vault enclave session terminated safely." });
  }

  async function handleRegisterPiece(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setRegisteringPiece(true);

    const slug = newPieceName.toLowerCase().replace(/\s+/g, "-");
    const { error } = await supabase.from("timepiece_vault").insert({
      user_id: user.id,
      watch_name: newPieceName,
      watch_slug: slug,
      serial_number: newPieceSerial.trim() || `AT-${Date.now().toString().slice(-4)}`,
      service_status: "Calibrated & In Warranty",
    });

    setRegisteringPiece(false);
    if (error) {
      alert("Failed to register timepiece: " + error.message);
    } else {
      setRegisterModal(false);
      setNewPieceSerial("");
      fetchProfileAndVault(user.id);
    }
  }

  if (initialCheck) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center text-[#c9a96e]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full border border-[#c9a96e]/20 animate-spin"
            style={{ borderTopColor: "#c9a96e", animationDuration: "1.2s" }}
          />
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/50">
            Connecting to Geneva Vault Enclave...
          </span>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW A: LOGGED IN PATRON DASHBOARD
  // ──────────────────────────────────────────────────────────────────────────
  if (user) {
    return (
      <div className="min-h-screen bg-[#08080a] text-white pt-28 pb-24 relative selection:bg-[#c9a96e]/20">
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Card */}
          <div className="bg-[#101014]/90 border border-[#c9a96e]/20 p-8 sm:p-12 mb-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[180px] text-[#c9a96e]">verified</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#16161b] border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e] shadow-[0_0_30px_rgba(201,169,110,0.15)] flex-shrink-0">
                  <span className="material-symbols-outlined text-[36px]">shield_person</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-mono">
                      Geneva Vault Enclave
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[10px] text-[#c9a96e] uppercase tracking-wider font-mono">
                      {profile?.patron_tier || "Founding Collector"}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif text-white font-light">
                    {profile?.full_name || user.email?.split("@")[0] || "Distinguished Patron"}
                  </h1>
                  <p className="text-xs text-white/40 font-mono mt-1">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setRegisterModal(true)}
                  className="px-6 py-3.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#08080a] flex items-center gap-2 transition-all duration-300 hover:brightness-110 shadow-[0_4px_20px_rgba(201,169,110,0.25)]"
                  style={{ background: "linear-gradient(135deg, #c9a96e, #f0d898, #c9a96e)" }}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Register Timepiece
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="px-5 py-3.5 border border-white/15 text-white/60 hover:text-[#c9a96e] hover:border-[#c9a96e]/50 text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[15px]">logout</span>
                  Exit Enclave
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                label: "Registered Provenance",
                val: `${vaultPieces.length} Timepiece${vaultPieces.length === 1 ? "" : "s"}`,
                sub: "Recorded on Geneva ledger",
                icon: "lock_clock",
              },
              {
                label: "Enclave Standing",
                val: profile?.patron_tier || "Founding Collector",
                sub: "Complimentary annual service",
                icon: "diamond",
              },
              {
                label: "Calibre Concierge",
                val: "Direct Line Open",
                sub: "Geneva Flagship Salon",
                icon: "verified_user",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-[#101014]/80 border border-white/10 p-6 backdrop-blur-sm relative group hover:border-[#c9a96e]/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
                    {m.label}
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#c9a96e]/70">
                    {m.icon}
                  </span>
                </div>
                <div className="text-xl font-serif text-white mb-1">{m.val}</div>
                <div className="text-xs text-white/40">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Timepiece Vault Ledger */}
          <div className="bg-[#101014]/90 border border-white/10 p-8 sm:p-10 backdrop-blur-md">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-mono block mb-1">
                  Private Reserve
                </span>
                <h3 className="text-2xl font-serif text-white">Registered Timepiece Ledger</h3>
              </div>
              <Link
                href="/collection"
                className="text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] hover:text-[#f0d898] flex items-center gap-1 transition-colors"
              >
                Acquire New Piece
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            {vaultPieces.length === 0 ? (
              <div className="text-center py-16 px-4 border border-dashed border-white/10">
                <span className="material-symbols-outlined text-[44px] text-[#c9a96e]/50 mb-3 block">
                  lock_open
                </span>
                <h4 className="text-lg font-serif text-white mb-2">No Timepieces Registered Yet</h4>
                <p className="text-white/40 text-xs max-w-md mx-auto mb-6">
                  Register your acquired Atelier timepiece with its certificate serial number to activate lifetime calibre servicing and private enclave invitations.
                </p>
                <button
                  onClick={() => setRegisterModal(true)}
                  className="px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#08080a] inline-flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg, #c9a96e, #f0d898, #c9a96e)" }}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Register First Timepiece
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaultPieces.map((piece) => (
                  <div
                    key={piece.id}
                    className="p-6 bg-[#141419] border border-white/10 hover:border-[#c9a96e]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#c9a96e]">
                          {piece.serial_number}
                        </span>
                        <span className="px-2 py-0.5 bg-[#08080a] border border-white/10 text-[9px] uppercase tracking-wider text-white/50 font-mono">
                          {piece.service_status}
                        </span>
                      </div>
                      <h4 className="text-lg font-serif text-white mb-2">{piece.watch_name}</h4>
                      <p className="text-xs text-white/40">
                        Ledger stamped: {new Date(piece.acquisition_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-white/40 text-[11px]">Calibre 1801 Guarantee</span>
                      <span className="text-[#c9a96e] text-[11px] flex items-center gap-1 font-mono">
                        Active <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {registerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#101014] border border-[#c9a96e]/30 max-w-md w-full p-8 shadow-2xl relative">
              <button
                onClick={() => setRegisterModal(false)}
                className="absolute top-5 right-5 text-white/40 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-mono block mb-2">
                Physical Provenance
              </span>
              <h3 className="text-2xl font-serif text-white mb-2">Register Timepiece</h3>
              <p className="text-white/50 text-xs mb-6">
                Link your physical certificate of authenticity and engraved serial number to your digital enclave ledger.
              </p>

              <form onSubmit={handleRegisterPiece} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1.5 font-mono">
                    Timepiece Model
                  </label>
                  <select
                    value={newPieceName}
                    onChange={(e) => setNewPieceName(e.target.value)}
                    className="w-full bg-[#16161b] border border-white/15 px-3.5 py-3 text-white text-sm focus:border-[#c9a96e] focus:outline-none"
                  >
                    <option value="Atelier Luna Noir">Atelier Luna Noir (Ref. AT-1801-NOIR)</option>
                    <option value="Chronographe Titane">Chronographe Titane (Ref. AT-2024-CT)</option>
                    <option value="Grand Complication Platine">Grand Complication Platine (Ref. AT-HC-001)</option>
                    <option value="Tourbillon Vitreux">Tourbillon Vitreux (Ref. AT-TV-3201)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block mb-1.5 font-mono">
                    Certificate Serial Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AT-1801-042"
                    value={newPieceSerial}
                    onChange={(e) => setNewPieceSerial(e.target.value)}
                    className="w-full bg-[#16161b] border border-white/15 px-3.5 py-3 text-white text-sm focus:border-[#c9a96e] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setRegisterModal(false)}
                    className="flex-1 py-3 border border-white/15 text-white/60 hover:text-white text-[10px] uppercase tracking-[0.2em]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registeringPiece}
                    className="flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#08080a]"
                    style={{ background: "linear-gradient(135deg, #c9a96e, #f0d898, #c9a96e)" }}
                  >
                    {registeringPiece ? "Registering..." : "Confirm Provenance"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW B: PREMIUM SPLIT-SCREEN AUTHENTICATION (SIGN UP & SIGN IN)
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen text-white pt-24 pb-20 relative selection:bg-[#c9a96e]/20"
      style={{ background: "#08080a" }}
    >
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 85% 70%, rgba(201,169,110,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Breadcrumb */}
        <div className="flex items-center justify-between py-4 mb-6 sm:mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-[#c9a96e] text-xs uppercase tracking-widest transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Return to Salon
          </Link>
          <div
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest px-4 py-2 border"
            style={{
              color: "#c9a96e",
              borderColor: "rgba(201,169,110,0.2)",
              background: "rgba(201,169,110,0.04)",
            }}
          >
            <span className="material-symbols-outlined text-[13px]">lock</span>
            GENEVA ENCLAVE PROTOCOL · 256-BIT TLS
          </div>
        </div>

        {/* Outer Split Card Container */}
        <div className="border border-[#c9a96e]/25 bg-[#0e0e12]/95 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
          {/* Top Gold Accent Line */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #c9a96e 25%, #f0d898 50%, #c9a96e 75%, transparent 100%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
            {/* ── LEFT SHOWCASE PANEL (5 cols on lg) ── */}
            <div className="lg:col-span-5 relative bg-[#0a0a0d] p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#c9a96e]/15 flex flex-col justify-between overflow-hidden">
              {/* Background Boutique Image with moody overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <Image
                  src="/atelier_flagship_boutique.png"
                  alt="Atelier Flagship Geneva Salon"
                  fill
                  className="object-cover object-center filter grayscale contrast-125"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,10,13,0.85) 0%, rgba(10,10,13,0.92) 50%, rgba(10,10,13,0.98) 100%)",
                  }}
                />
              </div>

              {/* Decorative Corner Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#c9a96e]/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#c9a96e]/30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#c9a96e]/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#c9a96e]/30 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#c9a96e]/30 bg-[#c9a96e]/5 mb-8">
                  <span className="material-symbols-outlined text-[14px] text-[#c9a96e]">
                    workspace_premium
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a96e] font-mono">
                    Geneva Private Registry
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif text-white font-light tracking-tight leading-tight mb-4">
                  The Sanctuary of <br />
                  <span
                    className="italic font-normal"
                    style={{
                      background: "linear-gradient(135deg, #f0d898, #c9a96e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Haute Horlogerie
                  </span>
                </h2>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-8">
                  The ATELIER Patron Enclave grants authenticated collectors sovereign access to provenance ledgers, private reserve calibre allocations, and direct consultations with our Master Horologist.
                </p>

                {/* Exclusive Patron Benefits List */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  {[
                    {
                      icon: "verified",
                      title: "Cryptographic Provenance",
                      desc: "Tamper-proof ownership records tied directly to your timepiece's serial number.",
                    },
                    {
                      icon: "support_agent",
                      title: "Dedicated Geneva Concierge",
                      desc: "Direct private messaging with our salon directors in Geneva, Zurich, and London.",
                    },
                    {
                      icon: "build",
                      title: "Calibre Servicing Priority",
                      desc: "Complimentary ultrasonic overhaul every five years at our Swiss manufacture.",
                    },
                    {
                      icon: "key",
                      title: "Private Allocation Releases",
                      desc: "First access to ultra-limited numbered editions prior to public release.",
                    },
                  ].map((b) => (
                    <div key={b.title} className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-sm bg-[#141419] border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] flex-shrink-0 group-hover:border-[#c9a96e]/50 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">{b.icon}</span>
                      </div>
                      <div>
                        <div className="text-xs font-serif text-white tracking-wide">{b.title}</div>
                        <div className="text-[11px] text-white/45 leading-relaxed mt-0.5">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quote Badge */}
              <div className="relative z-10 pt-8 mt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] text-xs font-serif">
                    G
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#c9a96e] font-mono">
                      Poinçon de Genève Certified
                    </div>
                    <div className="text-[11px] text-white/40">Manufacture d&apos;Horlogerie · Rue du Rhône 42</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT AUTH PANEL (7 cols on lg) ── */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#0e0e12]">
              <div className="max-w-xl w-full mx-auto">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] font-mono block mb-1">
                      {tab === "signup" ? "New Collector Commission" : "Returning Patron"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                      {tab === "signup" ? "Create Patron Account" : "Access Your Vault"}
                    </h3>
                  </div>

                  {/* Vault Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#16161c] border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] shadow-[0_0_20px_rgba(201,169,110,0.15)] flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">
                      {tab === "signup" ? "badge" : "lock"}
                    </span>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-2 p-1 bg-[#141419] border border-white/10 mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setTab("signup");
                      setMessage(null);
                    }}
                    className={`py-3 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 text-center ${
                      tab === "signup"
                        ? "bg-[#c9a96e] text-[#08080a] font-bold shadow-md"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("signin");
                      setMessage(null);
                    }}
                    className={`py-3 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 text-center ${
                      tab === "signin"
                        ? "bg-[#c9a96e] text-[#08080a] font-bold shadow-md"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                </div>

                {/* Status Message Alert */}
                {message && (
                  <div
                    className={`mb-6 p-4 text-xs flex items-start gap-3 border transition-all ${
                      message.type === "success"
                        ? "bg-[#c9a96e]/10 text-[#f0d898] border-[#c9a96e]/40"
                        : "bg-red-950/40 text-red-200 border-red-800/60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">
                      {message.type === "success" ? "verified" : "error"}
                    </span>
                    <span className="leading-relaxed">{message.text}</span>
                  </div>
                )}

                {/* ─── TAB 1: CREATE ACCOUNT (SIGN UP) ─── */}
                {tab === "signup" && (
                  <form onSubmit={handleSignUp} className="space-y-5 text-left">
                    {/* Full Name */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-mono">
                        Patron Designation / Full Name <span className="text-[#c9a96e]">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          person
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jean-Luc de Montmollin"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#141419] border border-white/15 pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-mono">
                        Confidential Email Address <span className="text-[#c9a96e]">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          mail
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="collector@private-residence.ch"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#141419] border border-white/15 pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* City & Country Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-mono">
                          City of Residence
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            location_city
                          </span>
                          <input
                            type="text"
                            placeholder="Geneva, Zurich, London..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#141419] border border-white/15 pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-mono">
                          Country
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            public
                          </span>
                          <input
                            type="text"
                            placeholder="Switzerland"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-[#141419] border border-white/15 pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
                          Vault Passphrase <span className="text-[#c9a96e]">*</span>
                        </label>
                        <span className="text-[10px] text-white/40 font-mono">Min. 6 characters</span>
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          lock
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={6}
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#141419] border border-white/15 pl-11 pr-12 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[18px] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#08080a] flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 shadow-[0_4px_25px_rgba(201,169,110,0.3)] disabled:opacity-50 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #b8914f 0%, #f0d898 50%, #c9a96e 100%)",
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">
                              progress_activity
                            </span>
                            Registering in Vault Database...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">shield</span>
                            Register Patron Enclave
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-white/40 text-center leading-relaxed pt-2">
                      By registering, your profile is enrolled in our Geneva client ledger with cryptographic row-level security.
                    </p>
                  </form>
                )}

                {/* ─── TAB 2: SIGN IN ─── */}
                {tab === "signin" && (
                  <form onSubmit={handleSignIn} className="space-y-6 text-left">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-mono">
                        Patron ID / Registered Email <span className="text-[#c9a96e]">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          mail
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="patron@estate.ch"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#141419] border border-white/15 pl-11 pr-4 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
                          Enclave Vault Password <span className="text-[#c9a96e]">*</span>
                        </label>
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[18px] text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          lock
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#141419] border border-white/15 pl-11 pr-12 py-3.5 text-white text-sm focus:border-[#c9a96e] focus:bg-[#181820] focus:outline-none transition-all placeholder:text-white/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[18px] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#08080a] flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 shadow-[0_4px_25px_rgba(201,169,110,0.3)] disabled:opacity-50 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #b8914f 0%, #f0d898 50%, #c9a96e 100%)",
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">
                              progress_activity
                            </span>
                            Authenticating Session...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">key</span>
                            Authenticate Session
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-white/40 text-center leading-relaxed pt-2">
                      Encrypted connection to Supabase patron authentication node.
                    </p>
                  </form>
                )}

                {/* Footer Security Badges */}
                <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] text-white/35 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#c9a96e]/70">verified</span>
                    GENEVA SEAL VAULT
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#c9a96e]/70">shield</span>
                    RLS PROTECTED
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#c9a96e]/70">lock</span>
                    256-BIT TLS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gold Line */}
          <div
            className="h-[1px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.4) 50%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
