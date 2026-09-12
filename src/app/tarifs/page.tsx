import type { Metadata } from "next";
import Link from "next/link";
import SimulateurRachat from "@/components/SimulateurRachat";
import { adressesDeLaPage, breadcrumbJsonLd, jsonLdScript, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tarifs — Partenariat sans avance de frais",
  description:
    "Votre site de prestige à 0 € d'avance : rémunération négociée au devis, montant fixe ou pourcentage du bénéfice, rachat possible à tout moment. SEO à 150 €/mois.",
  ...adressesDeLaPage("/tarifs"),
};

const offres = [
  {
    label: "Site Internet",
    prix: "0 €",
    unite: "à l'avance",
    accroche: "Nous investissons dans votre réussite avant d'en tirer profit.",
    details: [
      "Conception & développement sur mesure",
      "Hébergement et maintenance inclus",
      "Évolutions continues du site",
      "Rémunération négociée au devis : montant fixe ou pourcentage du bénéfice",
    ],
    note: "Canevas Havane demeure propriétaire du site. Option de rachat à tout moment.",
    accent: true,
  },
  {
    label: "SEO",
    prix: "150 €",
    unite: "par mois",
    accroche: "Une présence qui s'installe durablement en tête des recherches.",
    details: [
      "Audit de positionnement",
      "Optimisation sémantique continue",
      "Stratégie de contenu",
      "Rapport de performance mensuel",
    ],
    note: "Abonnement mensuel, facturé indépendamment du site.",
    accent: false,
  },
  {
    label: "Ads",
    prix: "Sur devis",
    unite: "selon le budget média",
    accroche: "Des campagnes chirurgicales, calibrées sur vos objectifs.",
    details: [
      "Google Ads & Meta Ads",
      "Ciblage et exclusions rigoureuses",
      "Pages de destination dédiées",
      "Pilotage au coût par client acquis",
    ],
    note: "Tarification établie après étude de votre marché.",
    accent: false,
  },
];

const etapes = [
  {
    num: "01",
    titre: "Étude",
    texte:
      "Nous analysons votre marché et le potentiel du projet. Cette étape est gratuite et sans engagement.",
  },
  {
    num: "02",
    titre: "Accord",
    texte:
      "Nous fixons ensemble la rémunération, inscrite au devis : un montant fixe ou un pourcentage du bénéfice. Rien d'autre, rien de caché.",
  },
  {
    num: "03",
    titre: "Création",
    texte:
      "Conception, développement et mise en ligne. Vous ne réglez rien : nous prenons le risque à votre place.",
  },
  {
    num: "04",
    titre: "Croissance",
    texte:
      "Le site travaille. Hébergement, maintenance et améliorations restent à notre charge — et vous pouvez racheter le site quand vous le décidez.",
  },
];

const offreCatalogueJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Prestations Canevas Havane",
  url: `${siteUrl}/tarifs`,
  provider: { "@id": `${siteUrl}/#organization` },
  itemListElement: [
    {
      "@type": "Offer",
      name: "Création de site internet",
      description:
        "Conception, développement, hébergement et maintenance sans avance de frais. Rémunération négociée au devis : montant fixe ou pourcentage du bénéfice généré.",
      price: "0",
      priceCurrency: "EUR",
      category: "Création de site internet",
      seller: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Offer",
      name: "Référencement naturel (SEO)",
      description: "Audit, optimisation sémantique continue et stratégie de contenu.",
      price: "150",
      priceCurrency: "EUR",
      category: "Référencement naturel",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "150",
        priceCurrency: "EUR",
        billingIncrement: 1,
        unitCode: "MON", // mois
      },
      seller: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Offer",
      name: "Campagnes publicitaires (Ads)",
      description: "Google Ads et Meta Ads, tarification établie après étude du marché.",
      category: "Publicité en ligne",
      seller: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function TarifsPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: "100px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(offreCatalogueJsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Tarifs", path: "/tarifs" }]))}
      />
      <div className="max-centered-container px-6">
        {/* Hero */}
        <div className="text-center space-y-8 mb-24 md:mb-40">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/70 italic">
              Modèle de partenariat
            </span>
          </div>

          <h1 className="heading-display">
            <span className="block opacity-60">SANS AVANCE</span>
            <span className="text-gradient block italic font-light">DE FRAIS.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed px-4">
            Nous créons votre site à nos frais, sans que vous avanciez un euro. <br className="hidden md:block" />
            La rémunération se négocie ensemble — un montant fixe ou un pourcentage du bénéfice.
          </p>
        </div>

        {/* Offres */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-48">
          {offres.map((offre) => (
            <div
              key={offre.label}
              className={`glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col space-y-8 ${
                offre.accent ? "lg:-translate-y-6 shadow-2xl" : ""
              }`}
            >
              <div className="space-y-6">
                <h2
                  className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] ${
                    offre.accent ? "text-[var(--color-primary-texte)]" : "text-[var(--color-foreground)]/70"
                  }`}
                >
                  {offre.label}
                </h2>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-medium font-serif tracking-tight">{offre.prix}</p>
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/70">
                    {offre.unite}
                  </span>
                </div>
                <p className="text-base md:text-lg text-[var(--color-foreground)]/70 font-light leading-relaxed">
                  {offre.accroche}
                </p>
              </div>

              <ul className="space-y-4 flex-1">
                {offre.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 text-sm md:text-base text-[var(--color-foreground)]/70 font-light leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0 mt-2.5"></span>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="text-[10px] md:text-[11px] text-[var(--color-foreground)]/70 uppercase tracking-[0.2em] leading-loose border-t border-[var(--color-foreground)]/5 pt-6 italic">
                {offre.note}
              </p>
            </div>
          ))}
        </div>

        {/*
          Mention obligatoire : en franchise en base de TVA, les prix sont nets et
          doivent le dire — sur le site comme sur les factures (art. 293 B du CGI).
        */}
        <p className="text-center text-[10px] md:text-[11px] text-[var(--color-foreground)]/70 uppercase tracking-[0.25em] leading-loose mb-32 md:mb-48 max-w-3xl mx-auto">
          Prix nets en euros — TVA non applicable, article 293 B du CGI. <br />
          Prestations soumises aux{" "}
          <Link href="/cgv" className="text-[var(--color-primary-texte)] hover:underline decoration-1 underline-offset-4">
            conditions générales de vente
          </Link>
          .
        </p>

        {/* Fonctionnement */}
        <div className="space-y-16 md:space-y-24 mb-32 md:mb-48">
          <div className="text-center space-y-6">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary-texte)]">
              Le fonctionnement
            </h2>
            <p className="text-3xl md:text-6xl font-medium uppercase tracking-tight font-serif leading-[0.9]">
              <span className="block opacity-60">QUATRE ÉTAPES,</span>
              <span className="text-gradient block italic">ZÉRO RISQUE.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {etapes.map((e) => (
              <div key={e.num} className="space-y-5">
                <span className="block text-5xl md:text-6xl font-medium font-serif text-[var(--color-foreground)]/70">
                  {e.num}
                </span>
                <h3 className="text-xl md:text-2xl font-medium uppercase tracking-tight font-serif text-[var(--color-secondary)]">
                  {e.titre}
                </h3>
                <p className="text-base text-[var(--color-foreground)]/70 font-light leading-relaxed">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Propriété & rachat */}
        <div className="space-y-16 md:space-y-20 mb-32 md:mb-48">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary-texte)]">
              Propriété & rachat
            </h2>
            <p className="text-3xl md:text-5xl font-medium uppercase tracking-tight font-serif leading-[0.95]">
              Devenez propriétaire <span className="text-gradient italic">quand vous le décidez.</span>
            </p>
            <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
              Pendant le partenariat, le site reste notre propriété : c'est ce qui nous permet de le créer sans
              rien vous facturer. À tout moment, vous pouvez en acquérir la pleine propriété. Sauf accord
              différent inscrit au devis, le prix de rachat équivaut à{" "}
              <span className="text-[var(--color-foreground)] font-normal">dix fois le bénéfice mensuel</span> que
              le site génère alors — et la rémunération s'arrête.
            </p>
          </div>

          <SimulateurRachat />
        </div>

        {/* CTA */}
        <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 text-center space-y-8">
          <h2 className="text-3xl md:text-6xl font-medium uppercase tracking-tight font-serif leading-[0.9]">
            <span className="block opacity-60">PARLONS DE</span>
            <span className="text-gradient block italic">VOTRE PROJET.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light max-w-xl mx-auto leading-relaxed">
            L'étude de votre marché est gratuite. Vous saurez rapidement si le modèle vous convient.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="btn-premium !px-12 md:!px-20 !py-5 md:!py-6 !text-[10px] md:!text-xs inline-block"
            >
              Demander une étude
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
