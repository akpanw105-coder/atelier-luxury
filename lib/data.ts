// ──────────────────────────────────────────────────────────────────────────────
// ATELIER DATA STORE
// Prices in Nigerian Naira (NGN ₦)
// ──────────────────────────────────────────────────────────────────────────────

export interface WatchVariant {
  type: "case" | "strap";
  label: string;
  value: string;
  colorHex?: string;
}

export interface WatchSpec {
  label: string;
  value: string;
}

export interface Watch {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: "complications" | "chronographs" | "minimalist" | "tourbillon";
  material: "ceramic" | "titanium" | "gold" | "steel";
  price: number; // in NGN
  reference: string;
  edition?: string;
  badge?: string;
  inStock: boolean;
  images: {
    dial: string;
    movement: string;
    caseback?: string;
  };
  description: string;
  shortDescription: string;
  specs: WatchSpec[];
  variants: WatchVariant[];
  relatedIds: string[];
}

const WATCH_IMAGES = {
  lunaNoirDial:
    "/front_luxury_studio_photograph_of_a_magnificent_minimalist_luxury_wristwatch.png",
  chronoTitaneDial:
    "/front_luxury_studio_photograph_of_an_avant_garde_titanium_luxury_chronograph.png",
  minimalistDial:
    "/front_luxury_studio_photograph_of_a_magnificent_minimalist_luxury_wristwatch.png",
  movement:
    "/macro_close_up_studio_shot_of_a_high_luxury_swiss_mechanical_watch_open.png",
  collection:
    "/front_luxury_studio_photograph_of_a_magnificent_minimalist_luxury_wristwatch.png",
  acquisitionTray:
    "/atelier_acquisition_tray.png",
};

export const watches: Watch[] = [
  {
    id: "w001",
    slug: "atelier-luna-noir",
    name: "Atelier Luna Noir",
    collection: "Luna",
    category: "minimalist",
    material: "ceramic",
    price: 72000000, // ₦72,000,000
    reference: "AT-1801-NOIR",
    edition: "Limited 50",
    badge: "Pièce Unique",
    inStock: true,
    images: {
      dial: WATCH_IMAGES.lunaNoirDial,
      movement: WATCH_IMAGES.movement,
    },
    shortDescription:
      "Deep abyssal pure onyx dial framed by hand-polished zirconium carbide ceramic and solid rose gold lance hands.",
    description:
      "The Luna Noir is a study in controlled darkness — a timepiece born from the intersection of haute dial artistry and obsidian restraint. The Grand Feu enamel dial is fired at 850°C over three days; each piece unique in its depth. Powered by Calibre 1801, a 72-hour twin-barrel movement developed entirely in our Vallée de Joux manufacture.",
    specs: [
      { label: "Case Construction", value: "40mm Monobloc Ceramic" },
      { label: "Profile & Depth", value: "9.8mm Thickness • 50m WR" },
      { label: "Dial Métier d'Art", value: "Grand Feu Obsidian Enamel" },
      { label: "Movement", value: "In-House Calibre 1801 Manual" },
      { label: "Frequency", value: "28,800 vph (4 Hz)" },
      { label: "Power Reserve", value: "72 Hours Twin-Barrel" },
      { label: "Jewels", value: "27 Swiss Jewels" },
      { label: "Strap", value: "Matte Alligator, Hand-Stitched Geneva" },
      { label: "Clasp", value: "Ceramic Folding with 18k Rose Gold Medallion" },
    ],
    variants: [
      { type: "case", label: "Obsidian Noir", value: "ceramic", colorHex: "#161618" },
      { type: "case", label: "Satin Rose Gold", value: "gold", colorHex: "#D4AF37" },
      { type: "strap", label: "Matte Alligator", value: "alligator" },
      { type: "strap", label: "Titanium Mesh", value: "mesh" },
    ],
    relatedIds: ["w002", "w003"],
  },
  {
    id: "w002",
    slug: "chronographe-titane",
    name: "Chronographe Titane",
    collection: "Chronos",
    category: "chronographs",
    material: "titanium",
    price: 93000000, // ₦93,000,000
    reference: "AT-2024-CT",
    edition: "Numbered Edition",
    badge: "Numbered Edition",
    inStock: true,
    images: {
      dial: WATCH_IMAGES.chronoTitaneDial,
      movement: WATCH_IMAGES.movement,
    },
    shortDescription:
      "Calibre 2024 column-wheel integrated chronograph. Grade 5 titanium openworked dial with integrated bracelet.",
    description:
      "An avant-garde interpretation of the classical chronograph. The Chronographe Titane pairs an openworked Grade 5 titanium dial with a column-wheel chronograph mechanism that is visible through the sapphire exhibition caseback. Every bridge is anglé and polished by hand over 14 hours per piece.",
    specs: [
      { label: "Case Construction", value: "42mm Grade 5 Titanium" },
      { label: "Profile & Depth", value: "12.4mm Thickness • 100m WR" },
      { label: "Dial", value: "Openworked Skeletonized Titanium" },
      { label: "Movement", value: "In-House Calibre 2024 Auto Column-Wheel" },
      { label: "Frequency", value: "36,000 vph (5 Hz)" },
      { label: "Power Reserve", value: "56 Hours" },
      { label: "Complications", value: "Flyback Chronograph, Date" },
      { label: "Strap", value: "Integrated Titanium Bracelet" },
    ],
    variants: [
      { type: "case", label: "Brushed Titanium", value: "titanium", colorHex: "#8B8E96" },
      { type: "case", label: "DLC Coated", value: "dlc", colorHex: "#2A2A2E" },
      { type: "strap", label: "Titanium Bracelet", value: "bracelet" },
      { type: "strap", label: "Rubber Sport", value: "rubber" },
    ],
    relatedIds: ["w001", "w003"],
  },
  {
    id: "w003",
    slug: "grand-complication-platine",
    name: "Grand Complication Platine",
    collection: "Haute Horlogerie",
    category: "complications",
    material: "gold",
    price: 275000000, // ₦275,000,000
    reference: "AT-HC-001-PLAT",
    edition: "Unique Piece",
    badge: "Unique Piece",
    inStock: false,
    images: {
      dial: WATCH_IMAGES.collection,
      movement: WATCH_IMAGES.movement,
    },
    shortDescription:
      "Platinum perpetual calendar with flying tourbillon, minute repeater, and split-seconds chronograph.",
    description:
      "The Grand Complication Platine represents the summit of our horological achievement. A platinum case houses four grand complications — perpetual calendar, flying tourbillon, minute repeater, and a split-seconds chronograph. Eleven years in development. Three watchmakers per piece. 847 individual components.",
    specs: [
      { label: "Case Construction", value: "950 Platinum • 45mm" },
      { label: "Profile & Depth", value: "14.5mm • 30m WR" },
      { label: "Dial", value: "Guilloché Grand Feu Enamel, Hand-Engraved" },
      { label: "Movement", value: "In-House Calibre HC-001 Manual" },
      { label: "Frequency", value: "21,600 vph (3 Hz)" },
      { label: "Power Reserve", value: "96 Hours" },
      { label: "Complications", value: "Perpetual Calendar, Tourbillon, Minute Repeater, Split-Seconds Chrono" },
      { label: "Components", value: "847 Individual Parts" },
      { label: "Strap", value: "Platinum Alligator, Blue Stitching" },
    ],
    variants: [
      { type: "case", label: "950 Platinum", value: "platinum", colorHex: "#DDDFE4" },
      { type: "strap", label: "Blue Alligator", value: "alligator-blue" },
      { type: "strap", label: "Black Alligator", value: "alligator-black" },
    ],
    relatedIds: ["w001", "w004"],
  },
  {
    id: "w004",
    slug: "tourbillon-vitreux",
    name: "Tourbillon Vitreux",
    collection: "Tourbillon",
    category: "tourbillon",
    material: "steel",
    price: 144000000, // ₦144,000,000
    reference: "AT-TV-3201",
    badge: "COSC Certified",
    inStock: true,
    images: {
      dial: WATCH_IMAGES.movement,
      movement: WATCH_IMAGES.movement,
    },
    shortDescription:
      "Tri-axial tourbillon in stainless steel with sapphire crystal bridges and obsidian enamel chapter ring.",
    description:
      "The Tourbillon Vitreux brings the tri-axial tourbillon — once exclusively the domain of ultra-thin pocket watches — into a modern 40mm wristwatch. Sapphire crystal bridges suspend the cage, appearing to float above the dark enamel chapter ring. The result is meditative, mesmerizing, and technically extraordinary.",
    specs: [
      { label: "Case Construction", value: "40mm 316L Stainless Steel" },
      { label: "Profile & Depth", value: "11.2mm • 30m WR" },
      { label: "Dial", value: "Obsidian Enamel Chapter Ring, Sapphire Bridges" },
      { label: "Movement", value: "In-House Calibre 3201 Manual" },
      { label: "Frequency", value: "21,600 vph (3 Hz)" },
      { label: "Power Reserve", value: "120 Hours (5 Days)" },
      { label: "Complications", value: "Tri-Axial Tourbillon" },
      { label: "Strap", value: "Hand-Stitched Navy Satin" },
    ],
    variants: [
      { type: "case", label: "Polished Steel", value: "steel", colorHex: "#B0B3BC" },
      { type: "case", label: "Brushed Steel", value: "steel-brushed", colorHex: "#888B93" },
      { type: "strap", label: "Navy Satin", value: "satin-navy" },
      { type: "strap", label: "Black Alligator", value: "alligator" },
    ],
    relatedIds: ["w001", "w003"],
  },
];

export function getWatchBySlug(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug);
}

export function getRelatedWatches(ids: string[]): Watch[] {
  return watches.filter((w) => ids.includes(w.id));
}

export function formatPrice(price: number, currency = "NGN"): string {
  if (currency === "NGN") {
    return `₦${new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
