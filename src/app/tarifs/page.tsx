import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage, breadcrumbJsonLd, jsonLdScript, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tarifs — Partenariat sans avance de frais",
  description:
    "Votre site haut de gamme à 0 € d'avance : vous ne payez que sur les rendez-vous, ventes et demandes de devis passés via votre site. SEO à 150 €/mois, Ads sur devis.",
  ...adressesDeLaPage("/tarifs"),
};

const modeles = [
  {
    label: "Rendez-vous",
    facturation: "Par rendez-vous pris via votre site",
    modalite: "Montant fixe ou pourcentage, fixé à la signature",
    pourQui:
      "Ostéopathes, psychologues, courtiers, auto-écoles… tous les professionnels qui reçoivent sur rendez-vous.",
    inclus: [
      "Site sur mesure",
      "Module de réservation",
      "Hébergement et maintenance",
      "Fiche Google Business Profile",
    ],
  },
  {
    label: "Vente en ligne",
    facturation: "En pourcentage des ventes réalisées via votre site",
    modalite: "Taux fixé à la signature",
    pourQui:
      "Épiceries fines, caves, torréfacteurs, producteurs, créateurs… les commerces qui vendent leurs produits.",
    inclus: [
      "Boutique en ligne et paiement",
      "Site sur mesure",
      "Hébergement et maintenance",
      "Fiche Google Business Profile",
    ],
  },
  {
    label: "Demandes de devis",
    facturation: "Par demande de devis qualifiée reçue via votre site",
    modalite: "Montant fixe par demande — formulaire complété, coordonnées valides",
    pourQui:
      "Piscinistes, cuisinistes, installateurs, déménageurs, paysagistes… les métiers qui travaillent sur devis.",
    inclus: [
      "Formulaire de demande de devis avec suivi",
      "Site sur mesure",
      "Hébergement et maintenance",
      "Fiche Google Business Profile",
    ],
  },
];

const services = [
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
      "Nous fixons ensemble le montant à la signature, inscrit au devis : par rendez-vous pris, en pourcentage des ventes, ou par demande de devis reçue — via votre site, et rien d'autre.",
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

const faq = [
  {
    question: "Et si le site ne rapporte rien ?",
    reponse:
      "Vous ne payez rien pour la création, et rien ne devient dû tant que le site ne travaille pas : sans rendez-vous pris, vente réalisée ou demande de devis reçue via votre site, aucune facture n'est émise au titre du partenariat. Le risque est le nôtre — c'est le principe du modèle.",
  },
  {
    question: "Comment est calculé ce que je paie ?",
    reponse:
      "Le montant est fixé ensemble à la signature et inscrit au devis, selon votre activité : un montant fixe ou un pourcentage par rendez-vous pris via votre site, un pourcentage des ventes réalisées via votre site, ou un montant fixe par demande de devis qualifiée reçue via votre site — c'est-à-dire un formulaire complété avec des coordonnées valides. Aucun plafond ni abonnement pour le site.",
  },
  {
    question: "Comment vérifier les chiffres ?",
    reponse:
      "Un journal consultable en permanence recense chaque rendez-vous pris, chaque vente réalisée et chaque demande de devis reçue via votre site. Chaque facture s'appuie sur ce journal : vous pouvez vérifier ligne par ligne avant de régler.",
  },
  {
    question: "Quelle différence avec Planity, Doctolib ou Shopify ?",
    reponse:
      "Ces plateformes louent un outil mutualisé contre un abonnement, dû que le mois ait été bon ou non, et votre présence s'y fond dans la leur. Ici, vous avez un site à votre nom, conçu pour votre entreprise, sans abonnement : nous ne sommes rémunérés que lorsque le site vous apporte des rendez-vous, des ventes ou des demandes de devis. Et vous pouvez en devenir pleinement propriétaire.",
  },
  {
    question: "Puis-je racheter mon site ?",
    reponse:
      "Oui, à tout moment. Pendant le partenariat, le site est la propriété de Canevas Havane — c'est ce qui permet de le créer sans avance de frais. Les conditions de rachat sont inscrites au devis dès la signature ; le rachat vous transfère la pleine propriété et met fin à la facturation du partenariat.",
  },
  {
    question: "Comment ça se passe si j'arrête ?",
    reponse:
      "Un préavis d'un mois, sans frais de sortie. Vous récupérez vos contenus et vos données dans un format exploitable ; seules les opérations déjà passées via le site restent facturables.",
  },
  {
    question: "Les ventes en boutique physique sont-elles concernées ?",
    reponse:
      "Non. Seuls comptent les rendez-vous pris, les ventes réalisées et les demandes de devis reçues via votre site. Ce que vous réalisez en boutique, par téléphone ou par tout autre canal ne donne lieu à aucune facturation.",
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
        "Conception, développement, hébergement et maintenance sans avance de frais. Facturation fixée au devis : par rendez-vous pris, en pourcentage des ventes, ou par demande de devis qualifiée — via le site uniquement.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.reponse },
  })),
};

export default function TarifsPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: "100px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(offreCatalogueJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Tarifs", path: "/tarifs" }]))}
      />
      <div className="max-centered-container px-6">
        {/* Hero */}
        <div className="text-center space-y-8 mb-16 md:mb-24">
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
        </div>

        {/* Bloc commun */}
        <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 text-center space-y-6 mb-20 md:mb-28 max-w-4xl mx-auto">
          <p className="text-4xl md:text-5xl font-medium font-serif tracking-tight">
            0 € <span className="text-xl md:text-2xl font-light text-[var(--color-foreground)]/70">à l'avance</span>
          </p>
          <p className="text-lg md:text-xl text-[var(--color-foreground)]/70 font-light leading-relaxed">
            Vous ne payez que sur ce que votre site vous rapporte. Montant fixé ensemble à la signature.
            Aucun plafond, aucun abonnement.
          </p>
          <p className="text-[10px] md:text-[11px] text-[var(--color-foreground)]/70 uppercase tracking-[0.2em] leading-loose border-t border-[var(--color-foreground)]/5 pt-6 italic">
            Canevas Havane demeure propriétaire du site — rachat possible à tout moment.
          </p>
        </div>

        {/* Trois modèles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-48">
          {modeles.map((m) => (
            <div
              key={m.label}
              className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
                  {m.label}
                </h2>
                <p className="text-2xl md:text-3xl font-medium font-serif tracking-tight leading-tight">
                  {m.facturation}
                </p>
                <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/70">
                  {m.modalite}
                </span>
                <p className="text-base md:text-lg text-[var(--color-foreground)]/70 font-light leading-relaxed">
                  {m.pourQui}
                </p>
              </div>

              <ul className="space-y-4 flex-1">
                {m.inclus.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 text-sm md:text-base text-[var(--color-foreground)]/70 font-light leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0 mt-2.5"></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Services complémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-32 md:mb-48 max-w-4xl mx-auto">
          {services.map((offre) => (
            <div
              key={offre.label}
              className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/70">
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

        {/* FAQ */}
        <div className="space-y-16 md:space-y-20 mb-32 md:mb-48">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary-texte)]">
              Questions fréquentes
            </h2>
            <p className="text-3xl md:text-5xl font-medium uppercase tracking-tight font-serif leading-[0.95]">
              Tout ce que vous <span className="text-gradient italic">voudrez savoir.</span>
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((f) => (
              <details key={f.question} className="glass-card rounded-[1.5rem] md:rounded-[2rem] group">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none p-6 md:p-8">
                  <span className="text-lg md:text-xl font-medium font-serif tracking-tight">{f.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-[var(--color-primary-texte)] shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 md:px-8 pb-6 md:pb-8 text-base md:text-lg text-[var(--color-foreground)]/70 font-light leading-relaxed">
                  {f.reponse}
                </p>
              </details>
            ))}
          </div>
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
