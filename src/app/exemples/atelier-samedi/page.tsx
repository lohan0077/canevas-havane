import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CarteProjet, Faq, Intitule, Section } from "./_composants/Blocs";
import Calcul from "./_composants/Calcul";
import { APPORTS, DOSSIER, PROJETS, agence, photos } from "./_composants/donnees";

// L'accueil d'Atelier Samedi. Les idées de la vidéo, en état de marche : « architecte ou
// pas ? », la réponse dès l'accueil (le seuil de 150 m², seulement avec permis de
// construire) ; chaque projet devient une page, avec son budget ; un samedi matin par
// mois, trente minutes, les vrais créneaux en ligne.
export const metadata: Metadata = {
  title: "Atelier Samedi — site de démonstration",
  description: "Site de démonstration d'une agence d'architecture imaginaire, réalisé par Canevas Havane : architecte ou pas ? Ta maison, ton extension, et la réponse.",
  ...adressesDeLaPage("/exemples/atelier-samedi"),
};

const REPERES = [
  { titre: "La réponse d'abord", texte: "Architecte ou pas : le calcul est sur l'accueil, avant tout rendez-vous." },
  { titre: "Un projet, une page", texte: "La surface, l'année de la maison, le budget, la durée." },
  { titre: "Un samedi par mois", texte: "Trente minutes pour savoir si ton projet tient." },
  { titre: "Le prix, avant", texte: "Notre rémunération est dite avant tout engagement." },
];

const LOI = [
  { titre: "Jusqu'à 150 m² au total", texte: "Un particulier qui construit pour lui-même peut se passer d'architecte, tant que la surface de plancher de l'ensemble ne dépasse pas 150 m²." },
  { titre: "Au-delà, avec permis", texte: "Si ton projet passe l'ensemble au-delà de 150 m² et demande un permis de construire, l'architecte devient obligatoire." },
  { titre: "Une petite extension", texte: "Jusqu'à 20 m² créés (40 m² en zone urbaine d'un PLU, si le total reste sous 150 m²), une déclaration préalable suffit : pas d'architecte imposé." },
  { titre: "Une société, une SCI", texte: "Elle n'a pas la dispense : dès qu'il faut un permis de construire, il faut un architecte." },
];

const METHODE = [
  { titre: "Trente minutes, un samedi", texte: "Ton terrain, ta maison, ton budget. On te dit si le projet tient, et ce qu'il demande." },
  { titre: "L'esquisse", texte: "Deux ou trois pistes dessinées, chiffrées, avant de choisir." },
  { titre: "L'autorisation", texte: "Déclaration préalable ou permis de construire : on monte le dossier, on suit l'instruction." },
  { titre: "Le chantier", texte: "Les entreprises consultées, les travaux suivis chaque semaine, jusqu'à la réception." },
];

export default function AtelierSamedi() {
  return (
    <main>
      <section id="outil" className="scroll-mt-16 bg-[linear-gradient(var(--trait)_1px,transparent_1px),linear-gradient(90deg,var(--trait)_1px,transparent_1px)] bg-[size:28px_28px]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-5 lg:pt-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-[var(--encre)] bg-[var(--accent)]" />
              {agence.accroche}
            </p>
            <h1 className="text-[52px] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[88px]">
              Architecte <span className="text-[var(--accent-texte)]">ou pas&nbsp;?</span>
            </h1>
            <p className="max-w-lg rounded-xl bg-[var(--fond)] text-[18px] leading-relaxed text-[var(--doux)]">
              C&apos;est ce que tout le monde tape avant d&apos;appeler un architecte. Alors on y répond
              ici, tout de suite : ta maison, ce que tu ajoutes, et la règle.
            </p>
          </div>
          <Calcul />
        </div>
      </section>

      <section aria-label="Ce que fait le site" className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <ul className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
          {REPERES.map((r, i) => (
            <li key={r.titre} className={`space-y-1.5 px-5 py-6 sm:px-6 ${i ? "border-t border-[var(--trait)] sm:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""} ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-[var(--trait)]`}>
              <h2 className="text-[17px] font-bold tracking-normal">{r.titre}</h2>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section className="space-y-12">
        <Intitule surtitre="La règle, sans détour" titre="Ce que dit vraiment la loi.">
          Le seuil de 150 m² ne joue que s&apos;il faut un permis de construire. Voilà la règle, en
          quatre phrases. Les textes : loi n° 77-2 du 3 janvier 1977, art. 3 et 4 ; code de
          l&apos;urbanisme, art. R431-2 et R*421-14.
        </Intitule>
        <ol className="grid gap-4 sm:grid-cols-2">
          {LOI.map((l, i) => (
            <li key={l.titre} className="space-y-2 rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[15px] font-bold tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
              <h3 className="text-[22px] font-bold">{l.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="projets" sombre className="space-y-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Intitule surtitre="Projets" titre="Chaque projet a sa page.">
            La surface, l&apos;année de la maison, le budget, la durée, l&apos;autorisation.
            Exactement ce que tu cherches avant d&apos;appeler.
          </Intitule>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {PROJETS.map((p) => (
            <li key={p.slug} className="text-[var(--encre)] [--encre:#16202C] [--doux:#47546A] [--carte:#FFFFFF] [--fond:#ECEFF3] [--trait:#C7D0DC] [--accent-texte:#2A4B8D]">
              <CarteProjet projet={p} />
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-[var(--doux)]">Projets et budgets d&apos;exemple : l&apos;agence est fictive. Budgets de travaux TTC.</p>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[3/4] max-h-[620px] overflow-hidden rounded-[22px]">
          <Image src={photos.lumiere.src} alt={photos.lumiere.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-8">
          <Intitule surtitre="Même quand ce n'est pas obligatoire" titre="Ce qu'un architecte change.">
            En dessous du seuil, le site te le dit : tu n&apos;as pas besoin de nous. Voilà, honnêtement,
            ce qu&apos;on apporte quand même.
          </Intitule>
          <ol className="space-y-4">
            {APPORTS.map((a, i) => (
              <li key={a} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-4 text-[20px] font-semibold">
                <span className="font-[family-name:var(--titres)] text-[15px] text-[var(--accent-texte)] tabular-nums">0{i + 1}</span>
                {a}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="space-y-12 pt-0">
        <Intitule surtitre="Méthode" titre="Du samedi au chantier." />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 rounded-[20px] bg-[var(--carte)] p-6">
              <p className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)]">{i + 1}</p>
              <h3 className="text-[21px] font-bold">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="honoraires" className="grid gap-10 border-t border-[var(--trait)] lg:grid-cols-2 lg:items-center">
        <Intitule surtitre="Honoraires" titre="Dits avant de commencer.">
          <p>
            Notre rémunération dépend de la mission : au forfait, fixé avant le début de la
            mission, ou calculée selon la mission. Avant tout engagement, nous te communiquons
            ses modalités, et elles figurent au contrat.
          </p>
          <p className="mt-4">
            Exemple : pour l&apos;extension de 40 m² du projet n° 12, mission complète au forfait,
            9 800 € TTC. Les trente minutes du samedi : {agence.prixRendezVous}, exemple.
          </p>
        </Intitule>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[var(--trait)]">
          <Image src={photos.croquis.src} alt={photos.croquis.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section sombre className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Intitule surtitre="Un samedi matin par mois" titre="Trente minutes pour savoir si ton projet tient.">
          À l&apos;agence ou en visio. Les vrais créneaux sont en ligne : tu choisis, tu réserves.
          <p className="mt-6">
            <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
              Voir les créneaux du samedi
            </Link>
          </p>
        </Intitule>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[22px]">
          <Image src={photos.maquette.src} alt={photos.maquette.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule surtitre="Questions" titre="Ce qu'on nous demande le samedi." />
        <Faq />
      </Section>
    </main>
  );
}
