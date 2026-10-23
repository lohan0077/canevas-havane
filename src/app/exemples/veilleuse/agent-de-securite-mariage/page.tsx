import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, TARIFS, euros, photos } from "../_composants/donnees";

// Une page par besoin, avec les mots des clients : « agent de sécurité mariage prix »
// (suggestion Google relevée le 15/10/2026, voir la vidéo agenda-securite).
export const metadata: Metadata = {
  title: "Agent de sécurité pour un mariage : prix — Veilleuse, site de démonstration",
  description: "Un agent de sécurité discret pour un mariage : entrée, parking, vestiaire. Prix d'exemple TTC et déroulé de la soirée. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/agent-de-securite-mariage"),
};

const t = TARIFS.mariage;

const SOIREE = [
  { heure: "17 h 30", texte: "L'agent arrive et fait le tour du lieu avec la personne que vous avez désignée." },
  { heure: "18 h 00", texte: "Accueil au portail : il oriente les voitures, garde un œil sur le parking." },
  { heure: "21 h 00", texte: "Ronde du lieu : salle, jardin, vestiaire, sorties de secours dégagées." },
  { heure: "01 h 30", texte: "Départ des invités : il raccompagne vers le parking, éclaire le chemin." },
];

const QUESTIONS = [
  { question: "L'agent sera-t-il en uniforme ?", reponse: "En tenue sobre, sans rien qui ressemble à un uniforme de police. Il doit pouvoir passer inaperçu sur les photos." },
  { question: "Que fait-il si un invité pose problème ?", reponse: "Il parle, calmement, et prévient la personne que vous avez désignée. Il n'a aucun pouvoir de police : s'il le faut, il appelle les secours ou la police, comme n'importe qui." },
  { question: "Faut-il un agent pour chaque mariage ?", reponse: "Non. Souvent, le lieu n'en demande pas. On vous le dit franchement au téléphone." },
];

export default function AgentSecuriteMariage() {
  return (
    <main>
      <EnTetePage surtitre="Agent de sécurité pour un mariage" titre="Les mariés n'ont à penser *à rien.*" photo={photos.jardin}>
        Un agent discret à l&apos;entrée et au parking, du premier invité au dernier. Prix d&apos;exemple
        en TTC : un mariage, c&apos;est un particulier.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Apparition de="zoom" className="space-y-6 rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-10 lg:sticky lg:top-28">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em]">Prix d&apos;exemple · TTC</p>
          <p className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,5.2rem)] leading-[0.95] tabular-nums">{euros(t.min)} – {euros(t.max)}</p>
          <p className="text-lg">la soirée, {t.detail}.</p>
          <Bouton href={`${DOSSIER}/devis`} variante="nuit">Faire mon devis</Bouton>
        </Apparition>
        <div className="space-y-8">
          <Apparition><Surtitre>La soirée, heure par heure</Surtitre></Apparition>
          <TitreRevele texte="Pendant que *vous dansez.*" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.98]" classeAccent="text-[var(--accent-texte)]" />
          <ol className="ml-2 space-y-8 border-l border-[var(--trait)]">
            {SOIREE.map((s, i) => (
              <Apparition as="li" key={s.heure} delai={i * 120} className="relative pl-8">
                <span aria-hidden="true" className="absolute -left-[7px] top-3 h-[13px] w-[13px] rounded-full bg-[var(--accent)] shadow-[0_0_12px_3px_rgba(244,201,93,0.5)]" />
                <p className="font-[family-name:var(--titres)] text-3xl tabular-nums">{s.heure}</p>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </Apparition>
            ))}
          </ol>
          <p className="text-sm text-[var(--doux)]">Déroulé d&apos;exemple : il se cale sur votre programme.</p>
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <TitreRevele texte="Vos questions, *avant le grand jour.*" className="text-[clamp(2.6rem,5vw,4.2rem)] font-normal leading-[0.98]" classeAccent="text-[var(--accent-texte)]" />
          <Accordeon questions={QUESTIONS} />
        </div>
      </section>

      <div className="h-3 bg-[var(--carte)] sm:h-5" />
      <div className="bg-[var(--carte)]"><AppelFinal /></div>
    </main>
  );
}
