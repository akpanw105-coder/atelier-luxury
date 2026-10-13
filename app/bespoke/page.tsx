import type { Metadata } from "next";
import BespokeClient from "./BespokeClient";

export const metadata: Metadata = {
  title: "Bespoke Commissions — ATELIER Genève",
  description:
    "Private horological commissions. Collaborate directly with our Master Horologist to craft a piece unique to your collection.",
};

export default function BespokePage() {
  return <BespokeClient />;
}
