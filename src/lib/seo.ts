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
    streetAddress: "274 rue du Couas",
    postalCode: "07430",
    addressLocality: "Vernosc-lès-Annonay",
    addressRegion: "Ardèche",
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

/**
 * Sérialise un objet JSON-LD pour une balise <script>.
 *
 * `JSON.stringify` n'échappe pas le chevron ouvrant : une chaîne contenant la séquence
 * de fermeture d'une balise script refermerait la balise, et tout ce qui suit serait
 * exécuté comme du JavaScript. Les données injectées sont aujourd'hui statiques, mais
 * elles ne le resteront pas forcément — on échappe ici, une fois pour toutes, plutôt
 * que de compter sur la vigilance de l'appelant.
 *
 * La forme échappée est relue à l'identique par un analyseur JSON, mais un analyseur
 * HTML n'y voit plus le début d'une balise. On traite aussi les séparateurs de ligne
 * Unicode U+2028 et U+2029 : valides en JSON, illégaux dans un littéral JavaScript.
 */
export function jsonLdScript(data: unknown) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return { __html: json };
}
