import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PHRASE_L322_2, photos, situations } from "./_composants/donnees";
import { Faq, Intitule, Photo } from "./_composants/Blocs";
import Frise from "./_composants/Frise";
import Recherche from "./_composants/Recherche";
import RendezVous from "./_composants/RendezVous";

// L'accueil de Mot pour Mot. Dans l'ordre de la vidéo : la phrase que la loi impose, en
// titre, présentée comme la loi de tous les courtiers en crédit immobilier ; le client qui
// vient (plus de démarchage sans accord) ; la frise « quand est-ce que je paie ? » ; une
// page par situation ; le créneau qu'on choisit soi-même. Aucun taux affiché.
export const metadata: Metadata = {
  title: "Mot pour Mot — site de démonstration",
  description:
    "Site de démonstration d'un courtier en crédit immobilier imaginaire, réalisé par Canevas Havane : la phrase que la loi impose en titre, la frise qui dit quand on paie, une page par situation.",
  ...adressesDeLaPage("/exemples/mot-pour-mot"),
};

const ENGAGEMENTS = [
  { oui: "Te dire ce que les banques vont regarder, avant qu'elles le regardent.", non: "Te promettre l'accord d'une banque. Personne ne le peut." },
  { oui: "Te transmettre chaque réponse, positive ou non, et pourquoi.", non: "Afficher un taux « à partir de » qui ne vaut pas pour ton dossier." },
  { oui: "Fixer nos honoraires par écrit, avant de commencer.", non: "T'appeler pour te démarcher. C'est toi qui viens." },
];

export default function MotPourMot() {
  return (
    <div>
      {/* 1. Le titre de l'accueil : la phrase de la loi, mot pour mot. */}
      <section id="accueil" className="mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14">
        <div>
          <p className="relative font-[family-name:var(--titres)] text-[68px] leading-[0.84] font-black tracking-[-0.055em] uppercase sm:text-[120px]">
            Avant
            <br />
            toute chose
            <span aria-hidden="true" className="absolute -top-2 right-1 font-[family-name:var(--titres)] text-[96px] leading-none text-[var(--accent-texte)] sm:right-auto sm:left-[62%] sm:text-[160px]">«</span>
          </p>
          <h1 data-film="phrase" className="mt-7 max-w-3xl text-[29px] leading-[1.14] font-bold tracking-[-0.02em] sm:text-[44px]">
            « {PHRASE_L322_2} »
          </h1>
          <p data-film="c-est-la-loi" className="mt-5 max-w-2xl border-l-4 border-[var(--accent)] pl-4 text-[16px] leading-relaxed text-[var(--doux)] sm:text-[18px]">
            C&apos;est la loi, pour tous les courtiers en crédit immobilier (C. consom., art. L322-2). On préfère te le dire en premier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#rendez-vous" className="rounded-full bg-[var(--encre)] px-6 py-3.5 font-semibold text-[var(--fond)]">Choisir mon créneau</Link>
            <Link href="#frise" className="rounded-full border-2 border-[var(--encre)] px-6 py-3.5 font-semibold">Quand est-ce que je paie&nbsp;?</Link>
          </div>
        </div>
        <Photo photo={photos.pignon} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-[4/5] lg:aspect-[3/4]" />
      </section>

      {/* 2. Le client vient. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
          <p className="font-[family-name:var(--titres)] text-[44px] leading-[0.92] font-black tracking-[-0.045em] uppercase sm:text-7xl">
            Le courtier n&apos;appelle plus. <span className="text-[#A9B8FF]">C&apos;est toi qui réserves.</span>
          </p>
          <p className="text-[17px] leading-relaxed text-[#B9B9BE]">
            Depuis le 11 août 2026, démarcher un particulier par téléphone sans son accord est interdit
            (code de la consommation, art. L223-1, sauf contrat en cours). Nous n&apos;appelons donc
            personne qui ne l&apos;a pas demandé : tu choisis ton créneau, en bas de chaque page.
          </p>
        </div>
      </section>

      {/* 3. La frise. */}
      <section id="frise" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="space-y-6">
          <Intitule libelle="Quand je paie" titre={<>Une frise. <span className="text-[var(--accent-texte)]">Pas de surprise.</span></>}>
            <p>Rendez-vous, dossier, offre de la banque : zéro euro. Tu paies quand les fonds sont versés. Touche une étape pour savoir ce qui s&apos;y passe.</p>
          </Intitule>
          <Link href={`${DOSSIER}/honoraires`} className="inline-block font-semibold underline decoration-2 underline-offset-[6px]">Nos honoraires, en détail</Link>
        </div>
        <Frise />
      </section>

      {/* 4. Une page par situation. */}
      <section id="situations" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule libelle="Ta situation" titre={<>Chaque situation <span className="text-[var(--accent-texte)]">a sa page.</span></>}>
            <p>Ce que regardent les banques, les pièces à réunir, un dossier réel anonymisé. Exactement ce que tu tapes avant d&apos;appeler.</p>
          </Intitule>
          <ul className="grid gap-4 lg:grid-cols-3">
            {situations.map((s) => (
              <li key={s.slug}>
                <Link href={`${DOSSIER}/situations/${s.slug}`} className="group flex h-full flex-col justify-between gap-10 rounded-[24px] border-2 border-[var(--encre)] bg-[var(--fond)] p-6 hover:bg-[var(--encre)] hover:text-[var(--fond)]">
                  <span className="text-[13px] font-semibold tracking-[0.14em] uppercase">« {s.recherche} »</span>
                  <span className="font-[family-name:var(--titres)] text-[34px] leading-[0.95] font-black tracking-[-0.04em] uppercase">
                    {s.titre} {s.accent}
                  </span>
                  <span className="text-[15px] font-semibold">Lire la page →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Les questions, telles qu'on les tape. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Intitule libelle="Comment sont-ils payés ?" titre={<>Ce que tout le monde <span className="text-[var(--accent-texte)]">se demande.</span></>}>
          <p>« Courtier immobilier comment sont ils payés » : c&apos;est ce que propose un moteur de recherche quand on commence à taper « courtier immobilier comment » (suggestion relevée le 15 octobre 2026). La réponse tient en trois lignes.</p>
        </Intitule>
        <Recherche />
      </section>

      {/* 6. Photos. */}
      <section aria-label="Photos" className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <Photo photo={photos.angle} sizes="(min-width: 1024px) 460px, 50vw" className="aspect-[3/4]" />
        <div className="flex flex-col justify-end gap-4">
          <Photo photo={photos.piece} sizes="(min-width: 1024px) 640px, 50vw" className="aspect-square lg:aspect-[3/2]" />
          <p className="text-[14px] leading-snug text-[var(--doux)]">Ton projet, écrit noir sur blanc : ce qui est dû, quand, et à qui.</p>
        </div>
      </section>

      {/* 7. Ce que nous faisons, ce que nous ne faisons pas. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <Intitule libelle="Nos engagements" titre={<>Ce qu&apos;on fait. <span className="text-[var(--accent-texte)]">Ce qu&apos;on ne fera pas.</span></>} />
        <ul className="divide-y-2 divide-[var(--encre)] border-y-2 border-[var(--encre)]">
          {ENGAGEMENTS.map((e) => (
            <li key={e.oui} className="grid gap-3 py-5 sm:grid-cols-2 sm:gap-10">
              <p className="flex gap-3 text-[17px] leading-snug"><span aria-hidden="true" className="font-black text-[var(--accent-texte)]">✓</span>{e.oui}</p>
              <p className="flex gap-3 text-[17px] leading-snug text-[var(--doux)]"><span aria-hidden="true" className="font-black">✕</span>{e.non}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Intitule libelle="Questions" titre={<>Avant le <span className="text-[var(--accent-texte)]">rendez-vous.</span></>} />
        <Faq />
      </section>

      {/* 9. Le créneau. */}
      <section id="rendez-vous" className="scroll-mt-20 border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Intitule libelle="Rendez-vous" titre={<>Tu choisis <span className="text-[var(--accent-texte)]">ton créneau.</span></>}>
            <p>Au cabinet ou en visio. Personne ne t&apos;appelle pour te le proposer.</p>
          </Intitule>
          <RendezVous />
        </div>
      </section>
    </div>
  );
}
