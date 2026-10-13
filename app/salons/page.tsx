import type { Metadata } from "next";
import SalonsClient from "./SalonsClient";

export const metadata: Metadata = {
  title: "Global Salons & Vaults — ATELIER Genève",
  description:
    "Locations of ATELIER private salons: Geneva Flagship, Zurich Suite, Tokyo Ginza, New York Madison Avenue, and London Mayfair.",
};

const salons = [
  {
    city: "Genève",
    title: "Flagship Salon & Manufacture",
    address: "42 Rue du Rhône, 1204 Genève, Switzerland",
    tel: "+41 22 819 00 00",
    hours: "Tuesday – Saturday: 10:00 – 18:30 (By Appointment)",
    features: "Manufacture Observation Suite • Master Watchmaker on site",
  },
  {
    city: "Zürich",
    title: "Private Vault Enclave",
    address: "Bahnhofstrasse 18, 8001 Zürich, Switzerland",
    tel: "+41 44 215 44 00",
    hours: "Private Client Appointments Only",
    features: "Armored Viewing Lounge • High-Complication Consultation",
  },
  {
    city: "Tokyo",
    title: "Ginza Salon",
    address: "Ginza 6-Chome, Chuo-ku, Tokyo 104-0061, Japan",
    tel: "+81 3 5537 1801",
    hours: "Wednesday – Sunday: 11:00 – 19:00",
    features: "Bespoke Fitting Room • Traditional Tea Ceremony Salon",
  },
  {
    city: "New York",
    title: "Madison Avenue Suite",
    address: "740 Madison Avenue, New York, NY 10065, USA",
    tel: "+1 212 988 1801",
    hours: "Monday – Friday: By Appointment",
    features: "Private Safe Deposit Handover • North America Concierge",
  },
  {
    city: "London",
    title: "Mayfair Private Chamber",
    address: "14 Old Bond Street, London W1S 4PP, UK",
    tel: "+44 20 7493 1801",
    hours: "By Private Invitation",
    features: "Historic Horological Library • Collector Roundtable Suites",
  },
];

export default function SalonsPage() {
  return <SalonsClient salons={salons} />;
}
