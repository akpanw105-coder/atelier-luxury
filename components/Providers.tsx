"use client";

import { BagProvider } from "@/lib/bag-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <BagProvider>{children}</BagProvider>;
}
