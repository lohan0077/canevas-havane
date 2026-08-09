import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jsonLdScript, organizationJsonLd, siteUrl } from "@/lib/seo";

// Polices servies depuis notre propre domaine. Next les télécharge à la compilation
// et les intègre au site : aucune requête vers fonts.googleapis.com au chargement.
// Ce n'est pas qu'une question de vitesse — un appel à Google transmet l'adresse IP
// du visiteur à un tiers, ce que la politique de confidentialité ne déclare pas.
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--police-plus",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--police-cormorant",
});

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
    <html lang="fr" className={`scroll-smooth ${plusJakarta.variable} ${cormorant.variable}`}>
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

        {/*
          Pas de bandeau de consentement : le site ne dépose aucun cookie et n'utilise
          aucun traceur. En l'absence de traceur, la CNIL n'en exige pas — et un bandeau
          qui ne pilote rien est une information trompeuse. Si un outil de mesure
          d'audience est ajouté un jour, il faudra réintroduire un bandeau *qui bloque
          réellement* le dépôt tant que le consentement n'est pas donné, et mettre à jour
          /confidentialite dans le même commit.
        */}
      </body>
    </html>
  );
}
