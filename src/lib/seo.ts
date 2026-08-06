export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canevas-havane.com";

export const siteName = "Canevas Havane";

/** Fiche d'identité de l'entreprise, injectée sur toutes les pages via le layout. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.webp`,
  image: `${siteUrl}/opengraph-image.png`,
  description:
    "Agence de création numérique de prestige : sites web sur mesure, identité de marque, SEO et acquisition.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lyon",
    addressCountry: "FR",
  },
  areaServed: { "@type": "Country", name: "France" },
  knowsLanguage: "fr-FR",
};

/** Fil d'Ariane : `trail` liste les segments après l'accueil. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      ...trail.map((step, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: step.name,
        item: `${siteUrl}${step.path}`,
      })),
    ],
  };
}

/** Sérialise un objet JSON-LD pour une balise <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) };
}
