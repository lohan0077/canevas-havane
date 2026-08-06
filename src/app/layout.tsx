import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canevas-havane.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canevas Havane | Excellence Numérique & Design de Prestige",
    template: "%s | Canevas Havane",
  },
  description: "Canevas Havane, agence de design et stratégie numérique de prestige. Expertise en SEO, Ads et architectures web sur mesure.",
  openGraph: {
    siteName: "Canevas Havane",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="overflow-x-hidden selection:bg-[var(--color-primary)] selection:text-white bg-[var(--color-background)]">
        <div className="noise-overlay" />
        <div className="glow-mesh" />
        
        <Navbar />

        <main>
          {children}
        </main>
        
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
