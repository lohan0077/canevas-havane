import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { jsonLdScript, organizationJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canevas Havane | Excellence Numérique & Design de Prestige",
    template: "%s | Canevas Havane",
  },
  description: "Canevas Havane, agence de design et stratégie numérique de prestige. Expertise en SEO, Ads et architectures web sur mesure.",
  applicationName: "Canevas Havane",
  authors: [{ name: "Canevas Havane", url: siteUrl }],
  creator: "Canevas Havane",
  publisher: "Canevas Havane",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    siteName: "Canevas Havane",
    locale: "fr_FR",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Canevas Havane | Excellence Numérique & Design de Prestige",
    description: "Agence de création numérique de prestige : sites sur mesure, identité de marque, SEO et acquisition.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
        />
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
