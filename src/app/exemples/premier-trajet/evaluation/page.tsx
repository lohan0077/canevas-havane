import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { evaluations } from "../_composants/donnees";
import Intitule from "../_composants/Intitule";

export const metadata: Metadata = {
  title: "L'évaluation · Premier Trajet — site de démonstration",
  description: "L'évaluation de départ de Premier Trajet, auto-école imaginaire : une heure au volant pour estimer tes heures, et le créneau qu'on réserve soi-même.",
  ...adressesDeLaPage("/exemples/premier-trajet/evaluation"),
};

const DEROULE = [
  { temps: "10 min", titre: "On fait connaissance", texte: "Tes trajets, ce qui te fait peur, ce que tu as déjà fait au volant. Rien n'est noté." },
  { temps: "40 min", titre: "Au volant", texte: "Sur un parking d'abord, puis dans des rues calmes. Le moniteur a les pédales de son côté." },
  { temps: "10 min", titre: "Tes heures, estimées", texte: "Le moniteur te dit combien d'heures prévoir. Ce nombre prévisionnel est inscrit au contrat." },
];

export default function Evaluation() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <Intitule niveau={1} pastille="Pour commencer" titre={<>Ton évaluation <span className="text-[var(--doux)]">de départ.</span></>}>
            Une heure au volant, avec un moniteur. 45 € TTC (exemple), réglés sur place. Tu
            repars avec un chiffre : tes heures estimées.
          </Intitule>
          <ol className="space-y-3">
            {DEROULE.map((d) => (
              <li key={d.titre} className="rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] p-5 flex gap-4">
                <span className="shrink-0 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] h-8 px-3 inline-flex items-center text-sm font-bold tabular-nums">{d.temps}</span>
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold">{d.titre}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{d.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div id="creneaux" className="space-y-5 scroll-mt-24">
          <h2 className="text-3xl font-extrabold">Choisis ton créneau</h2>
          <Creneaux
            creneaux={evaluations}
            colonnes={3}
            titreCarte="Ton évaluation"
            bouton="Réserver mon évaluation"
            confirmation="Évaluation réservée. On t'attend devant l'école, 5 minutes avant."
            note="Créneaux d'exemple : certains sont déjà pris, les autres sont libres."
            libellePris="Pris"
            libelleLibre="Libre"
          />
          <div className="rounded-[22px] bg-[var(--accent)] text-[var(--sur-accent)] p-5 space-y-1">
            <p className="font-bold">À apporter</p>
            <p>Une pièce d'identité et, si tu portes des lunettes, tes lunettes.</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-[var(--doux)] max-w-2xl">
        Code de la route, art. L213-2 : le contrat est conclu après une évaluation préalable du
        candidat. Décret n° 2020-142, contrat type : il mentionne le nombre prévisionnel
        d'heures établi à la suite de cette évaluation.
      </p>
    </main>
  );
}
