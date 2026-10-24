import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import TitreRevele from "../_kit/TitreRevele";
import Agenda from "./_composants/Agenda";
import { ACCENT_SOMBRE, AppelFinal, Bouton, Intitule, Surtitre, Titre } from "./_composants/Blocs";
import ListeNon from "./_composants/ListeNon";
import { DOSSIER, cabinet, gestes, photos, questions, questionsHebdo, seanceAdulte } from "./_composants/donnees";

// Le site des deux vidéos des ostéopathes. De « Créer une marque » : le nom, chaque
// geste expliqué sur sa page, une question de patient par semaine. De « Remplir
// l'agenda » : ce que je ne fais pas, le prix en gros, les créneaux de 7 h et de 20 h.
//
// Version « carrée » (24/10/2026) : une idée par écran, sept écrans, une grille et une
// échelle de texte communes. La séance pas à pas, les tarifs et toutes les questions
// vivent sur /seance-et-prix. Les cibles filmées par les vidéos (#gestes h2,
// [data-geste]) sont gardées ; les autres sont sur les pages intérieures. Aucune photo
// de nuque ni de colonne vertébrale en grand : c'est ce que la voix reproche aux sites
// du métier.
export const metadata: Metadata = {
  title: "Le Pourquoi — cabinet d'ostéopathie, site de démonstration",
  description:
    "Le site d'un cabinet d'ostéopathie imaginaire qui explique tout : chaque geste a sa page, ce que l'ostéopathe ne fait pas est écrit, le prix est affiché, et l'on réserve dès 7 h.",
  ...adressesDeLaPage("/exemples/le-pourquoi"),
};

// Les questions de l'accueil : cinq, pas plus. Les huit sont sur /seance-et-prix.
const QUESTIONS_ACCUEIL = [0, 1, 2, 3, 6].map((i) => questions[i]);

export default function LePourquoi() {
  return (
    <main>
      {/* ---------- Premier écran : la question, posée en grand ---------- */}
      <section className="relative flex min-h-[100svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28">
          <div className="space-y-8">
            <Apparition><Surtitre clair>{cabinet.titre} · {cabinet.ville}</Surtitre></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Pourquoi ?"}
              className="text-[clamp(4.5rem,13vw,10rem)] font-normal leading-[0.9] tracking-[-0.03em]"
            />
            <TitreRevele
              as="p"
              auChargement
              delai={300}
              texte="L'ostéopathie, *expliquée.* Chaque geste a sa page, ce que je ne fais pas est écrit, le prix est affiché."
              className="max-w-[30rem] font-[family-name:var(--titres)] text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.3]"
              classeAccent={ACCENT_SOMBRE}
            />
            <Apparition delai={600} className="flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}/rendez-vous`}>Prendre rendez-vous</Bouton>
              <Bouton href={`${DOSSIER}#gestes`} variante="contour">Voir les gestes</Bouton>
            </Apparition>
          </div>
          <Apparition delai={200} className="relative aspect-[3/2] overflow-hidden rounded-2xl lg:aspect-[4/5]">
            <Image src={photos.attente.src} alt={photos.attente.alt} fill priority sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. Les gestes : une page chacun, une question par semaine ---------- */}
      <section id="gestes" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="01"
            surtitre="Les gestes"
            titre="Chaque geste a *sa page.*"
            texte="Ce que je fais, pourquoi, et ce que ça ne promet pas. Chaque semaine, une question de patient et sa réponse filmée — jamais un patient à l'image."
          />
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {questionsHebdo.map((q, i) => {
              const g = gestes.find((x) => x.slug === q.geste);
              const ligne = (
                <>
                  <span className="text-[13px] tabular-nums text-[var(--doux)]">Semaine {q.n}</span>
                  <span className="font-[family-name:var(--titres)] text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.2]">{q.q}</span>
                  <span className="text-[13px] text-[var(--doux)] sm:text-right">{g ? "Lire la page →" : `À venir · ${q.date}`}</span>
                </>
              );
              return (
                <Apparition as="li" key={q.n} delai={i * 70}>
                  {g ? (
                    <Link href={`${DOSSIER}/gestes/${g.slug}`} data-geste={g.slug} className="group grid items-center gap-x-6 gap-y-1 py-5 sm:grid-cols-[6.5rem_1fr_auto]">
                      {ligne}
                    </Link>
                  ) : (
                    <div className="grid items-center gap-x-6 gap-y-1 py-5 sm:grid-cols-[6.5rem_1fr_auto]">{ligne}</div>
                  )}
                </Apparition>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- 02. Ce que je ne fais pas ---------- */}
      <section id="non" className="scroll-mt-24 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            numero="02"
            surtitre="Comme tout ostéopathe"
            titre="Ce que je ne fais *pas.*"
            texte="La page la plus importante du site. Une limite dite, c'est une surprise de moins — et c'est souvent ce qui décide à réserver."
          />
          <ListeNon />
          <Bouton href={`${DOSSIER}/ce-que-je-ne-fais-pas`} variante="contour">Lire la page</Bouton>
        </div>
      </section>

      {/* ---------- Une photo, une phrase : le manifeste ---------- */}
      <section className="bg-[var(--sombre)] px-6 pb-6 text-[var(--sur-sombre)] md:pb-10">
        <div className="relative mx-auto aspect-[4/5] max-w-6xl overflow-hidden rounded-2xl sm:aspect-[16/10]">
          <Image src={photos.table.src} alt={photos.table.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover object-[50%_62%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,42,36,0)_35%,rgba(19,42,36,0.88)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 space-y-4 p-7 md:p-12">
            <Apparition><Surtitre clair>Sur la table</Surtitre></Apparition>
            <Titre texte="Vous avez le droit de demander *pourquoi.*" clair className="max-w-2xl" />
          </div>
        </div>
      </section>

      {/* ---------- 03. Le rendez-vous, et le prix ---------- */}
      <section id="rendez-vous" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Surtitre>03 — Rendez-vous</Surtitre></Apparition>
            <Titre texte="Le créneau, *avant ou après le travail.*" />
            <Apparition as="p" delai={150} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Dès 7 h et jusqu&apos;à 20 h 45, sans poser sa journée. Un nom et un téléphone : on ne
              vous demande pas pourquoi vous venez.
            </Apparition>
            <Apparition delai={250}>
              <dl className="grid grid-cols-2 gap-6 border-t border-[var(--trait)] pt-6">
              <div>
                <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Séance adulte</dt>
                <dd className="mt-2 font-[family-name:var(--titres)] text-4xl tabular-nums">{seanceAdulte.prix}</dd>
                <dd className="text-[15px] text-[var(--doux)]">{seanceAdulte.duree} · prix d&apos;exemple</dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">À chaque séance</dt>
                <dd className="mt-2 font-[family-name:var(--titres)] text-4xl">Facture</dd>
                <dd className="text-[15px] text-[var(--doux)]">pour votre mutuelle</dd>
              </div>
              </dl>
            </Apparition>
            <Apparition delai={300}>
              <Link href={`${DOSSIER}/seance-et-prix`} className="inline-block text-[15px] underline underline-offset-4">La séance et le prix</Link>
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Agenda />
          </Apparition>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Ce qu'on me demande *le plus.*" />
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon questions={QUESTIONS_ACCUEIL.map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/seance-et-prix#questions`} variante="contour">Toutes les questions</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
