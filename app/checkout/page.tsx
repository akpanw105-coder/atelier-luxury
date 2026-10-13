import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Acquisition Tray & Checkout — ATELIER Genève",
  description:
    "Secure private acquisition protocol for ATELIER haute horlogerie timepieces. Fully insured diplomatic transit or private salon handover.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
