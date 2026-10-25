import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import { AppelFinal, Appli, Bouton, Surtitre, Titre } from "./_composants/Blocs";
import Creneau from "./_composants/Creneau";
import Journee from "./_composants/Journee";
import { DOSSIER, PANNEAUX, POMPES, QUESTIONS, photos } from "./_composants/donnees";

// L'accueil de L'Heure Dite. Il réunit les deux vidéos du métier : « Créer une marque »
// (le nom, l'heure de l'appel choisie par le client, l'affiche et son message France
// Rénov') et « Remplir l'agenda » (pas des économies : midi ; le toit heure par heure et
// le conseil « lance la machine » ; le rappel seulement sur demande ; le lien France
// Rénov' tout en haut).
//
// Version « carrée » (24/10/2026) : sept écrans, une idée par écran, une grille et une
// échelle de texte communes. La règle du démarchage et l'affiche vivent sur « Choisir mon
// heure », le détail des pompes et des panneaux sur leurs pages. Les éléments filmés
// (#journee, #toit-*, #courbe, #heure, et le bandeau France Rénov' tout en haut) sont
// gardés.
export const metadata: Metadata = {
  title: "L'Heure Dite — pompes à chaleur et panneaux solaires, site de démonstration",
  description:
    "Le site d'un installateur de pompes à chaleur et de panneaux solaires imaginaire : tu choisis le jour et l'heure de ton appel ; le site te montre ton toit heure par heure et te dit quand lancer la machine. Pas de démarchage, et France Rénov' tout en haut.",
  ...adressesDeLaPage("/exemples/l-heure-dite"),
};

// Ce qu'on installe, en une liste : les trois pompes, les trois tailles de toit.
const INSTALLE = [
  ...POMPES.map((p) => ({ nom: p.nom, detail: p.phrase, prix: p.prix, href: `${DOSSIER}/pompes-a-chaleur` })),
  ...PANNEAUX.map((p) => ({ nom: `Panneaux · ${p.taille.toLowerCase()}`, detail: p.detail, prix: p.prix, href: `${DOSSIER}/panneaux-solaires` })),
];

/** Le haut de chaque écran : un numéro, un titre, une phrase. Toujours le même gabarit. */
function Intitule({ numero, surtitre, titre, texte, clair = false }: { numero: string; surtitre: string; titre: string; texte: string; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div className="space-y-5">
        <Apparition><Surtitre clair={clair}>{numero} — {surtitre}</Surtitre></Apparition>
        <Titre texte={titre} clair={clair} />
      </div>
      <Apparition as="p" delai={150} className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
        {texte}
      </Apparition>
    </div>
  );
}

export default function LHeureDite() {
  return (
    <main>
      {/* ---------- Premier écran : le nom, et l'horloge ---------- */}
      <section className="flex min-h-[100svh] items-center bg-[var(--fond)]">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Apparition><Surtitre>Pompes à chaleur et solaire · Exemple-Ville</Surtitre></Apparition>
            <Titre as="h1" texte="L'Heure *Dite.*" taille="geant" />
            <Apparition as="p" delai={300} className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Tu choisis l&apos;heure de l&apos;appel, on appelle à cette heure-là. Et ton toit, lui, te dit l&apos;heure de la
              machine.
            </Apparition>
            <Apparition delai={450}>
              <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir mon heure</Bouton>
            </Apparition>
          </div>
          <Apparition de="zoom" delai={150} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)]">
            <Image src={photos.horloge.src} alt={photos.horloge.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. L'outil de la marque : l'heure de l'appel ---------- */}
      <section id="appel" className="scroll-mt-20 border-t border-[var(--trait)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="01"
            surtitre="Comme chez le coiffeur"
            titre="Ton appel, *à l'heure dite.*"
            texte="Personne n'a le droit de te démarcher pour ces travaux. Toi, tu choisis un jour parmi les cinq prochains jours ouvrables, et une heure. On appelle à ce moment-là, pas une minute avant, et seulement pour ton devis."
          />
          <Apparition delai={150} className="mx-auto max-w-3xl">
            <Appli titre="Quand veux-tu qu'on t'appelle ?" note="exemple">
              <Creneau />
            </Appli>
          </Apparition>
        </div>
      </section>

      {/* ---------- 02. L'outil de l'agenda : ton toit, heure par heure ---------- */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            clair
            numero="02"
            surtitre="Ta journée"
            titre="Ton toit, *heure par heure.*"
            texte="Dis où regarde ton toit : la courbe montre quand il produit, glisse l'heure pour la suivre. Ton toit regarde l'ouest ? La courbe glisse, et le site te dit quand lancer la machine."
          />
          <Apparition id="journee" delai={150} className="mx-auto max-w-3xl scroll-mt-24">
            <Appli titre="Ta journée" note="forme indicative">
              <Journee titre={false} />
            </Appli>
          </Apparition>
          <Link href={`${DOSSIER}/ma-journee`} className="inline-block text-[15px] underline underline-offset-4">
            Comment lire la courbe, et ce que tu peux décaler
          </Link>
        </div>
      </section>

      {/* ---------- Une phrase, une photo : midi. Pas les panneaux sous le ciel bleu, que la vidéo prête à tous les sites de solaire : le linge qui sèche, à l'heure où le toit produit. ---------- */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.linge.src} alt="" fill sizes="100vw" className="object-cover opacity-85" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,48,31,0)_0%,rgba(24,48,31,0.3)_45%,rgba(24,48,31,0.92)_100%)]" />
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 md:pb-24">
          <Apparition><Surtitre clair>Ce qu&apos;on vend</Surtitre></Apparition>
          <Titre texte="Pas des économies. *Midi.*" clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- 03. Ce qu'on installe ---------- */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="03"
            surtitre="Ce qu'on installe"
            titre="De la chaleur prise dehors. *Du courant pris au toit.*"
            texte="Prix TTC, pose comprise, à titre d'exemple. Le prix ferme est au devis écrit, après la visite. Aucune aide promise : France Rénov' t'informe."
          />
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {INSTALLE.map((x, i) => (
              <Apparition as="li" key={x.nom} delai={i * 60}>
                <Link href={x.href} className="group grid gap-1 py-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-baseline sm:gap-8">
                  <span className="font-[family-name:var(--titres)] text-2xl">{x.nom}</span>
                  <span className="text-[15px] text-[var(--doux)]">{x.detail}</span>
                  <span className="whitespace-nowrap text-[15px] tabular-nums">à partir de {x.prix} · exemple</span>
                  <span aria-hidden="true" className="hidden text-[var(--accent-texte)] transition-transform group-hover:translate-x-1 sm:inline">→</span>
                </Link>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Ce qu'on nous *demande.*" />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)] lg:block">
              <Image src={photos.radiateur.src} alt={photos.radiateur.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150} className="space-y-8">
            <Accordeon questions={QUESTIONS.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="contour">La règle, et ce qui se passe ensuite</Bouton>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
