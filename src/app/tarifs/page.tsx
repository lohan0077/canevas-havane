import type { Metadata } from "next";
import Link from "next/link";
import SimulateurRachat from "@/components/SimulateurRachat";

export const metadata: Metadata = {
  title: "Tarifs — Partenariat à la Commission",
  description:
    "Votre site de prestige sans avance de frais : Canevas Havane se rémunère sur le bénéfice généré. SEO en abonnement à 150 €/mois, campagnes Ads sur devis.",
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
      "Rémunération de 25 à 50 % du bénéfice généré",
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
    titre: "Création",
    texte:
      "Conception, développement et mise en ligne. Vous ne réglez rien : nous prenons le risque à votre place.",
  },
  {
    num: "03",
    titre: "Croissance",
    texte:
      "Le site travaille. Hébergement, maintenance et améliorations restent à notre charge.",
  },
  {
    num: "04",
    titre: "Partage",
    texte:
      "Nous percevons entre 25 et 50 % du bénéfice généré. Sans bénéfice, aucune facture.",
  },
];

export default function TarifsPage() {
  return (
    <div className="layout-safe-zone min-h-screen" style={{ paddingBottom: "100px" }}>
      <div className="max-centered-container px-6">
        {/* Hero */}
        <div className="text-center space-y-8 mb-24 md:mb-40">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--color-foreground)]/5 bg-white/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-foreground)]/60 italic">
              Modèle de partenariat
            </span>
          </div>

          <h1 className="heading-display">
            <span className="block opacity-30">SANS AVANCE</span>
            <span className="text-gradient block italic font-light">DE FRAIS.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-foreground)]/60 font-light leading-relaxed px-4">
            Nous ne vendons pas un site, nous misons sur votre croissance. <br className="hidden md:block" />
            Vous ne payez que sur ce que le site vous rapporte réellement.
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
                    offre.accent ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]/30"
                  }`}
                >
                  {offre.label}
                </h2>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-medium font-serif tracking-tight">{offre.prix}</p>
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/25">
                    {offre.unite}
                  </span>
                </div>
                <p className="text-base md:text-lg text-[var(--color-foreground)]/60 font-light leading-relaxed">
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

              <p className="text-[10px] md:text-[11px] text-[var(--color-foreground)]/30 uppercase tracking-[0.2em] leading-loose border-t border-[var(--color-foreground)]/5 pt-6 italic">
                {offre.note}
              </p>
            </div>
          ))}
        </div>

        {/* Fonctionnement */}
        <div className="space-y-16 md:space-y-24 mb-32 md:mb-48">
          <div className="text-center space-y-6">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)]">
              Le fonctionnement
            </h2>
            <p className="text-3xl md:text-6xl font-medium uppercase tracking-tight font-serif leading-[0.9]">
              <span className="block opacity-20">QUATRE ÉTAPES,</span>
              <span className="text-gradient block italic">ZÉRO RISQUE.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {etapes.map((e) => (
              <div key={e.num} className="space-y-5">
                <span className="block text-5xl md:text-6xl font-medium font-serif text-[var(--color-foreground)]/10">
                  {e.num}
                </span>
                <h3 className="text-xl md:text-2xl font-medium uppercase tracking-tight font-serif text-[var(--color-secondary)]">
                  {e.titre}
                </h3>
                <p className="text-base text-[var(--color-foreground)]/55 font-light leading-relaxed">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Propriété & rachat */}
        <div className="space-y-16 md:space-y-20 mb-32 md:mb-48">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)]">
              Propriété & rachat
            </h2>
            <p className="text-3xl md:text-5xl font-medium uppercase tracking-tight font-serif leading-[0.95]">
              Devenez propriétaire <span className="text-gradient italic">quand vous le décidez.</span>
            </p>
            <p className="text-lg md:text-xl text-[var(--color-foreground)]/55 font-light leading-relaxed">
              Pendant le partenariat, le site reste notre propriété : c'est ce qui nous permet de le créer sans
              rien vous facturer. À tout moment, vous pouvez en acquérir la pleine propriété. Le prix de rachat
              équivaut à <span className="text-[var(--color-foreground)] font-normal">dix fois le bénéfice mensuel</span> que
              le site génère alors.
            </p>
          </div>

          <SimulateurRachat />
        </div>

        {/* CTA */}
        <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 text-center space-y-8">
          <h2 className="text-3xl md:text-6xl font-medium uppercase tracking-tight font-serif leading-[0.9]">
            <span className="block opacity-20">PARLONS DE</span>
            <span className="text-gradient block italic">VOTRE PROJET.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-foreground)]/50 font-light max-w-xl mx-auto leading-relaxed">
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
