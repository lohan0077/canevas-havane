import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { BILAN } from "../_composants/donnees";
import Bilan from "../_composants/Bilan";

export const metadata: Metadata = {
  title: "Comment on compte · Première Bougie — site de démonstration",
  description: "Le bilan de Première Bougie : qui est compté, comment on sait qu'une recrue est toujours là, et pourquoi jamais une ligne par personne. Chiffres d'exemple.",
  ...adressesDeLaPage("/exemples/premiere-bougie/bilan"),
};

const REGLES = [
  { t: "Tout le monde est compté", d: "Chaque recrue arrivée il y a plus d'un an entre dans le bilan. Pas de tri, pas de « recrutements représentatifs »." },
  { t: "Les départs aussi", d: "Partie avant sa première année, pour quelque raison que ce soit : elle est comptée dans « Parties ». Ne montrer que ceux qui restent serait trompeur." },
  { t: "On le sait sans surveiller", d: "Les points à 30, 90 et 180 jours, puis au jour 365, sont convenus dès le départ avec l'entreprise et avec la personne. On ne la cherche pas en ligne." },
  { t: "Jamais une ligne par personne", d: "Ni nom, ni poste, ni entreprise, ni date de départ : dans un bassin d'emploi, un intitulé et une date suffisent à reconnaître quelqu'un." },
  { t: "Mis à jour chaque jour 365", d: "Chaque première bougie fait bouger le bilan, d'un côté ou de l'autre." },
];

export default function PageBilan() {
  return (
    <main className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:py-20">
      <header className="max-w-3xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Comment on compte</p>
        <h1 className="text-[3rem] sm:text-7xl font-normal">Un bilan, <em className="text-[var(--accent-texte)]">deux chiffres.</em></h1>
        <p className="text-lg leading-relaxed">
          {BILAN.recrues} recrues arrivées il y a plus d&apos;un an ; {BILAN.toujoursLa} toujours là ; {BILAN.parties} parties. Des
          chiffres d&apos;exemple : le cabinet est fictif. Voilà comment un vrai cabinet devrait les compter.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Bilan />
        <ol className="space-y-5">
          {REGLES.map((r, i) => (
            <li key={r.t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-[var(--trait)] pt-4">
              <span className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
              <div className="space-y-1"><h2 className="text-2xl font-normal">{r.t}</h2><p className="leading-relaxed text-[var(--doux)]">{r.d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
