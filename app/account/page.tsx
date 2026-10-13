import type { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "Patron Enclave & Vault Access — ATELIER Genève",
  description:
    "Private collector portfolio portal for ATELIER owners. Access certificates of authenticity, service history, and private reserve allocations.",
};

export default function AccountPage() {
  return <AccountClient />;
}
