import type { Metadata } from "next";
import CollectionPageClient from "./CollectionPageClient";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Browse the ATELIER Genève collection — haute horlogerie timepieces including complications, chronographs, tourbillons, and minimalist designs crafted in our Geneva manufacture.",
};

export default function CollectionPage() {
  return <CollectionPageClient />;
}
