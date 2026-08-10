export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canevas-havane.com";

export const siteName = "Canevas Havane";

/**
 * Adresse canonique **et** adresse Open Graph d'une page, produites ensemble.
 *
 * Les deux disaient des choses différentes : le canonique pointait bien sur la
 * page, mais `og:url` était figé sur l'accueil dans le layout et hérité tel quel
 * par les treize pages. Partager la page Tarifs sur LinkedIn ou WhatsApp affichait
 * donc un aperçu qui renvoyait à l'accueil, et les partages ne s'accumulaient pas
 * sur la bonne adresse. Contre-audit du 10/08/2026.
 *
 * Les redonner par une seule fonction est plus solide qu'une règle qui vérifie
 * après coup : on ne peut plus déclarer l'un en oubliant l'autre.
 *
 * Les champs communs sont répétés ici parce que Next **remplace** `openGraph` au
 * lieu de le fusionner : dès qu'une page en déclare un, celui du layout disparaît
 * en entier — c'est ce qui privait les articles du journal de `og:site_name` et
 * de `og:locale`. Les chemins sont relatifs, `metadataBase` les complète.
 */
export function adressesDeLaPage(chemin: string, openGraphEnPlus: Record<string, unknown> = {}) {
  return {
    alternates: { canonical: chemin },
    openGraph: {
      url: chemin,
      siteName,
      locale: "fr_FR",
      type: "website" as const,
      // L'image doit être nommée explicitement.
      //
      // Elle venait jusqu'ici de la convention de fichier `src/app/opengraph-image.png`,
      // que Next applique tant qu'**aucune** page ne déclare `openGraph`. Dès qu'une
      // page en déclare un, la convention ne s'applique plus et l'aperçu de partage
      // part sans visuel. Constaté en compilant : `/tarifs` avait perdu son image.
      // Le fichier de convention reste servi à cette adresse.
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Canevas Havane — Excellence Numérique & Design de Prestige",
        },
      ],
      // Les articles du journal ont leur propre image, leur propre type et une
      // date de publication : ils surchargent ici plutôt que de redéclarer un
      // `openGraph` complet — c'est cette redéclaration qui leur faisait perdre
      // `og:site_name`, `og:locale` et `og:url`.
      ...openGraphEnPlus,
    },
  };
}

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
