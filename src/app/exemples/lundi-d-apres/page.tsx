import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { Bouton, Intitule, Surtitre, Titre } from "./_composants/Blocs";
import ChansonInterdite from "./_composants/ChansonInterdite";
import PhraseLundi from "./_composants/PhraseLundi";
import SoireeRembobinee from "./_composants/SoireeRembobinee";
import { ACCUEIL, DOSSIER, FORMULES, QUESTIONS, THEMES, euros, photos } from "./_composants/donnees";

// L'accueil de Lundi d'Après. « Créer une marque » : « Sur le site, une seule question :
// qu'est-ce que tes équipes doivent se raconter lundi ? », puis la soirée construite à
// l'envers (#question). « Remplir l'agenda » : « Sur l'accueil, une seule question :
// quelle chanson est interdite à ton mariage ? » (#interdite). Une seule question par
// public : l'entreprise a la sienne, le mariage la sienne.
//
// Version « carrée » (24/10/2026) : sept écrans, une idée par écran, une grille et une
// échelle de texte communes. Le dernier écran — les samedis encore libres — vient du
// gabarit du site, comme sur chaque page.
export const metadata: Metadata = {
  title: "Lundi d'Après — agence d'événements, site de démonstration",
  description:
    "Le site d'une agence d'événements imaginaire, soirées d'entreprise et mariages, DJ compris : ce que vos équipes diront lundi, la soirée construite à l'envers, et la chanson interdite à votre mariage.",
  ...adressesDeLaPage("/exemples/lundi-d-apres"),
};

const exemple = THEMES[0];
const ENVERS = [
  { heure: "Lundi, 9 h", titre: "« On ne savait pas que la compta chantait aussi bien. »" },
  { heure: exemple.moment.heure, titre: exemple.moment.titre },
  { heure: exemple.diner.heure, titre: exemple.diner.titre },
  { heure: ACCUEIL.heure, titre: ACCUEIL.titre },
];

const OFFRES = [
  { titre: "La soirée d'entreprise", prix: "dès 95 € HT par personne", href: `${DOSSIER}/a-l-envers` },
  { titre: "Le séminaire", prix: "dès 260 € HT par personne", href: `${DOSSIER}/formats` },
  { titre: "La fête de fin d'année", prix: "dès 75 € HT par personne", href: `${DOSSIER}/formats` },
  { titre: "Le mariage, DJ compris", prix: `${euros(FORMULES[0].prix)} TTC la soirée`, href: `${DOSSIER}/dj-ou-playlist` },
  { titre: "La phrase du lundi", prix: "une par événement, avec l'accord de chacun", href: `${DOSSIER}/la-phrase-du-lundi` },
];

export default function LundiDApres() {
  return (
    <main>
      {/* ---------- Premier écran : la soirée rembobinée, jusqu'au lundi 9 h ---------- */}
      <SoireeRembobinee />

      {/* ---------- Pour une entreprise : lundi, vos équipes diront quoi ? ---------- */}
      <section id="question" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 md:py-40 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Surtitre>Pour une entreprise</Surtitre>
            <h2 id="question-titre" className="scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold lowercase leading-[1.05] tracking-[-0.035em] text-balance">
              lundi, vos équipes diront quoi&nbsp;?
            </h2>
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Écrivez la phrase qu&apos;on se dira devant la machine à café. On construit la soirée à l&apos;envers, à partir
              d&apos;elle : lundi d&apos;abord, puis 23 h, 21 h, 19 h.
            </Apparition>
          </div>
          <Apparition delai={150}><PhraseLundi /></Apparition>
        </div>
      </section>

      {/* ---------- Pour un mariage : quelle chanson est interdite ? ---------- */}
      <section id="interdite" className="scroll-mt-20 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 md:py-40 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-6">
            <Surtitre clair>Pour un mariage</Surtitre>
            <h2 id="interdite-titre" className="scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold lowercase leading-[1.05] tracking-[-0.035em] text-balance">
              quelle chanson est interdite à votre mariage&nbsp;?
            </h2>
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Vous l&apos;écrivez, le site répond : noté, elle ne passera pas. Même si un oncle la réclame à minuit.
            </Apparition>
          </div>
          <Apparition delai={150} className="rounded-2xl bg-[var(--fond)] p-4 text-[var(--encre)] sm:p-6"><ChansonInterdite /></Apparition>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : le lundi matin d'après ---------- */}
      {/* La photo est claire partout (la mousse, les croissants, le bois) : aucun voile ne la rendrait lisible
          sans l'éteindre. La phrase se pose donc sur un aplat café, à côté de la tasse, jamais dessus. */}
      <section id="lundi" className="relative isolate flex min-h-[92svh] overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.cafe.src} alt={photos.cafe.alt} fill sizes="(max-width: 1023px) 140vh, 100vw" className="object-cover object-[28%_30%] lg:object-[40%_30%]" />
        <div className="relative mx-auto flex w-full max-w-6xl items-end px-6 pb-6 pt-40 md:pb-12">
          <div className="w-full space-y-5 rounded-2xl bg-[var(--sombre)] p-7 sm:p-10 lg:ml-auto lg:max-w-[29rem]">
            <Titre texte="On ne vend pas un cocktail. On vend le lundi, quand tout le monde en parle encore devant la machine à café." clair taille="moyen" />
          </div>
        </div>
      </section>

      {/* ---------- La soirée à l'envers, et ce qu'on organise ---------- */}
      <section id="envers" className="scroll-mt-24 bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            titre={"la soirée à l'envers\u00a0: on commence par la fin."}
            texte="Une agence part du lieu, puis du menu. Nous, on part de lundi, et on remonte le temps. Pour un mariage : la piste encore pleine à deux heures, selon la salle."
          />
          <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--trait)] lg:grid-cols-4">
            {ENVERS.map((e, i) => (
              <Apparition as="li" key={e.heure} delai={i * 90} className="min-w-0 space-y-3 bg-[var(--carte)] p-5 sm:p-6">
                <p className={`font-[family-name:var(--titres)] whitespace-nowrap text-[clamp(1.45rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] ${i === 0 ? "text-[var(--accent-texte)]" : ""}`}>{e.heure}</p>
                <p className="leading-snug text-[var(--doux)]">{e.titre}</p>
              </Apparition>
            ))}
          </ol>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {OFFRES.map((o) => (
              <li key={o.titre}>
                {/* Le trait néon sous le nom dit que la ligne s'ouvre, comme « Aller à la question » sur le premier écran. */}
                <Link href={o.href} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
                  <span className="justify-self-start font-[family-name:var(--titres)] text-2xl font-medium lowercase tracking-[-0.03em] underline decoration-[var(--accent)] decoration-2 underline-offset-[7px] group-hover:decoration-[var(--accent-texte)]">{o.titre}</span>
                  <span className="text-[15px] text-[var(--doux)]">{o.prix} (exemple)</span>
                </Link>
              </li>
            ))}
          </ul>
          <Bouton href={`${DOSSIER}/a-l-envers`} variante="contour">Voir la soirée à l&apos;envers en entier</Bouton>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Titre texte="avant de nous appeler." />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={photos.croissants.src} alt={photos.croissants.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>
    </main>
  );
}
