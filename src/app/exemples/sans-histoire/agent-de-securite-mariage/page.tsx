import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Questions } from "../_composants/Blocs";
import { DOSSIER, TARIFS, euros, photos } from "../_composants/donnees";

// Une page par besoin, avec les mots des clients : « agent de sécurité mariage prix »
// (suggestion Google relevée le 15/10/2026, voir la vidéo agenda-securite).
export const metadata: Metadata = {
  title: "Agent de sécurité pour un mariage : prix · Sans Histoire — site de démonstration",
  description: "Un agent de sécurité discret pour un mariage : entrée, parking, vestiaire. Prix d'exemple TTC et déroulé de la soirée. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-histoire/agent-de-securite-mariage"),
};

const t = TARIFS.mariage;

const SOIREE = [
  { heure: "17 h 30", texte: "L'agent arrive, fait le tour du lieu avec la personne que vous avez désignée." },
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
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-14 space-y-10">
        <Intitule niveau={1} surtitre="Agent de sécurité pour un mariage" titre={<>Les mariés n&apos;ont à penser <span className="italic text-[var(--accent-texte)]">à rien.</span></>}>
          Un agent discret à l&apos;entrée et au parking, du premier invité au dernier. Prix
          d&apos;exemple en TTC : vous êtes un particulier.
        </Intitule>
        <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.jardin.src} alt={photos.jardin.alt} fill sizes="(min-width: 1152px) 640px, 100vw" className="object-cover" />
          </div>
          <div className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 flex flex-col justify-between gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Prix d&apos;exemple</p>
            <p className="font-[family-name:var(--titres)] text-4xl leading-tight tabular-nums">{euros(t.min)} – {euros(t.max)} <span className="text-2xl">TTC</span></p>
            <p className="text-[var(--doux)]">la soirée, {t.detail}.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-10">
          <Intitule sombre surtitre="La soirée, heure par heure" titre={<>Ce que fait l&apos;agent, <span className="italic text-[#F0A47F]">pendant que vous dansez.</span></>} />
          <ol className="border-l border-[#4A5652] ml-2 space-y-8">
            {SOIREE.map((s) => (
              <li key={s.heure} className="relative pl-7">
                <span aria-hidden="true" className="absolute -left-[6px] top-2 h-[11px] w-[11px] rounded-full bg-[var(--accent)]" />
                <p className="font-[family-name:var(--titres)] text-2xl italic tabular-nums">{s.heure}</p>
                <p className="text-[#C7C1B4] leading-relaxed">{s.texte}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#C7C1B4]">Déroulé d&apos;exemple : il se cale sur votre programme.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-normal">Vos questions sur l&apos;agent de sécurité d&apos;un mariage</h2>
        <Questions questions={QUESTIONS} />
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <div className="rounded-[28px] border border-[var(--encre)] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Une date, un lieu, <span className="italic">une fourchette.</span></p>
          <Link href={`${DOSSIER}/devis`} className="shrink-0 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-semibold text-center">Faire mon devis</Link>
        </div>
      </section>
    </div>
  );
}
