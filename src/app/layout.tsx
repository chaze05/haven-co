import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "optional",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haven-co.vercel.app"),
  title: "Haven & Co. — Homes with a sense of place",
  description:
    "A boutique real-estate advisory curating considered homes across BGC, Makati, Alabang, Tagaytay and Cebu.",
  openGraph: {
    title: "Haven & Co. — Homes with a sense of place",
    description:
      "Curated homes across BGC, Makati, Alabang, Tagaytay and Cebu, guided by people who live where they sell.",
    type: "website",
    locale: "en_PH",
    images: ["/images/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <MotionProvider>
          <FavoritesProvider>
            <a
              href="#main"
              className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
            >
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </FavoritesProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
