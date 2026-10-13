import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import BagDrawer from "@/components/BagDrawer";
import FadeInObserver from "@/components/FadeInObserver";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATELIER — Haute Horlogerie | Luxury Timepieces",
    template: "%s | ATELIER Genève",
  },
  description:
    "Discover the world of ATELIER — bespoke Swiss mechanical timepieces crafted for those who recognize the extraordinary. Explore our curated collection of haute horlogerie.",
  keywords: "luxury watches, haute horlogerie, Swiss mechanical, bespoke timepieces, ATELIER",
  openGraph: {
    title: "ATELIER — Time, Perfected.",
    description: "An expression of precision, crafted for those who recognize the extraordinary.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} dark`}
    >
      <head>
        <meta name="theme-color" content="#08080A" />
        <meta name="color-scheme" content="dark" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface min-h-svh flex flex-col overflow-x-hidden">
        <Providers>
          <FadeInObserver />
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <BagDrawer />
        </Providers>
      </body>
    </html>
  );
}
