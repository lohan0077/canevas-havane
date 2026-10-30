import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { AppelFinal, Bouton, Titre } from "./_composants/Blocs";
import CalculEtes from "./_composants/CalculEtes";
import CompteARebours from "./_composants/CompteARebours";
import Creneaux from "./_composants/Creneaux";
import FilmChantier from "./_composants/FilmChantier";
import Jardin from "./_composants/Jardin";
import Remplissage from "./_composants/Remplissage";
import { DOSSIER, chantiers, photos, questions } from "./_composants/donnees";

// Le site de Neuf Étés, la marque de piscines des deux vidéos des piscinistes. Il
// garde la marque de « Créer une marque » — le nom, l'âge des enfants et les étés qui
// restent, le chantier filmé jusqu'au premier plongeon — et toutes les idées de
// « Remplir l'agenda » : le jardin qui dit quelle coque rentre et à quel prix, une
// page par chantier, le compte à rebours, les dates qu'on bloque soi-même.
//
// Version « carrée » (24/10/2026) : une idée par écran, sept écrans, une grille et
// une échelle de texte communes ; les coques, la méthode et l'affiche vivent sur leurs
// pages. Les éléments filmés par les deux vidéos (data-film, #date) sont gardés.
export const metadata: Metadata = {
  title: "Neuf Étés — piscines familiales, site de démonstration",
  description:
    "Le site d'une marque de piscines imaginaire : combien d'étés il te reste avec tes enfants, la piscine qui rentre dans ton jardin, chaque chantier filmé jusqu'au premier plongeon, et la semaine de chantier qu'on bloque soi-même.",
  ...adressesDeLaPage("/exemples/neuf-etes"),
};

const CHANTIER_RACONTE = chantiers[0];
// Quatre jours du film : le premier coup de pelle, la coque, la plage, le premier
// plongeon. Les six sont sur la page du chantier.
const JOURS_RACONTES = CHANTIER_RACONTE.jours.filter((j) => [1, 3, 5, 6].includes(j.etape));

/** Le haut de chaque écran : un titre, une phrase. Toujours le même gabarit. */
function Intitule({ titre, texte, clair = false }: { titre: string; texte: string; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <Titre texte={titre} />
      <p className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>{texte}</p>
    </div>
  );
}

export default function NeufEtes() {
  return (
    <main>
      {/* ---------- Premier écran : la piscine qui se remplit ---------- */}
      <div className="flex h-[100svh] min-h-[560px] flex-col">
        <Remplissage />
      </div>

      {/* ---------- L'outil de la marque : combien d'étés ---------- */}
      <section id="etes" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Titre texte={"Quel âge ont tes enfants\u00a0?"} />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Entre leur âge : le site compte les étés qu&apos;il te reste avec eux, à la maison.
              Un par an, jusqu&apos;à leurs 18 ans. Le calcul reste chez toi.
            </Apparition>
          </div>
          <Apparition delai={150}>
            <CalculEtes />
          </Apparition>
        </div>
      </section>

      {/* ---------- Ton jardin fait combien ? Le calculateur en 3D ---------- */}
      <section id="prix" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            titre="La piscine qui rentre dans ton jardin."
            texte="Glisse jusqu'à la surface de ton jardin : la coque qui rentre vraiment, à un mètre des limites, et ce qu'elle coûte, pose comprise."
          />
          <Apparition delai={150}>
            <Jardin />
          </Apparition>
          <Link href={`${DOSSIER}/prix`} className="inline-block text-[15px] underline underline-offset-4">
            Voir ce qui fait varier le prix
          </Link>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : le premier dimanche de juillet ---------- */}
      <section id="juillet" className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.eteEnFamille.src} alt="" fill sizes="100vw" className="object-cover object-[50%_70%] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,42,56,0.15)_0%,rgba(11,42,56,0.35)_45%,rgba(11,42,56,0.92)_100%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 md:pb-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <Titre texte="On ne vend pas une piscine. On vend le premier dimanche de juillet." className="max-w-3xl" />
          <Apparition delai={200} className="w-full max-w-md">
            <CompteARebours />
          </Apparition>
        </div>
      </section>

      {/* ---------- Le chantier, filmé jour après jour ---------- */}
      <section id="film" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            titre="Le chantier, filmé jour après jour jusqu'au premier plongeon."
            texte="Avec l'accord de la famille, chaque chantier est filmé, du premier coup de pelle au premier plongeon. Trois semaines, et une page par chantier."
          />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
            {JOURS_RACONTES.map((j, i) => (
              <Apparition as="li" key={j.etape} delai={i * 90} className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <FilmChantier jour={j} rang={CHANTIER_RACONTE.jours.indexOf(j) + 1} total={CHANTIER_RACONTE.jours.length} />
                </div>
                <h3 className="text-xl font-medium leading-snug">{j.titre}</h3>
              </Apparition>
            ))}
          </ol>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {chantiers.map((c) => (
              <li key={c.slug}>
                <Link href={`${DOSSIER}/chantiers/${c.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-10">
                  <span className="font-[family-name:var(--titres)] text-2xl">{c.titre}</span>
                  <span className="text-[15px] text-[var(--doux)]">{c.duree} à {c.lieu}</span>
                  <span className="text-[15px] font-medium text-[var(--accent-texte)] underline decoration-1 underline-offset-4 group-hover:decoration-2">Voir le chantier</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Ma date : les semaines de chantier ---------- */}
      <section id="date" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            titre={"Chantiers 2027\u00a0: les dates, une par une."}
            texte="Pas de formulaire de quatorze champs. Tu choisis ta semaine, tu la bloques, on vient faire la visite technique."
          />
          <Creneaux />
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Titre texte="Les questions, avant le premier appel." />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.bouee.src} alt={photos.bouee.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon questions={questions.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/questions`} variante="contour">Lire toutes les questions</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
