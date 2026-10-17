import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Intitule from "../_composants/Intitule";
import Planning from "../_composants/Planning";

export const metadata: Metadata = {
  title: "Leçons · Premier Trajet — site de démonstration",
  description: "Le planning des leçons de conduite de Premier Trajet, auto-école imaginaire : les créneaux libres de la semaine, réservés sans appeler.",
  ...adressesDeLaPage("/exemples/premier-trajet/lecons"),
};

const REGLES = [
  { titre: "Une heure, au volant", texte: "Départ et retour devant l'école. Le moniteur du créneau est indiqué avant de réserver." },
  { titre: "Jusqu'à la veille, 18 h", texte: "Tu réserves une leçon jusqu'à la veille au soir, et tu la décales sur le site, sans appeler." },
  { titre: "Décomptée du forfait", texte: "Tant qu'il te reste des heures au forfait, la leçon y est décomptée. Après, c'est le tarif à l'unité." },
];

export default function Lecons() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Intitule niveau={1} pastille="Leçons de conduite" titre={<>Les leçons, <span className="text-[var(--doux)]">en vrai.</span></>}>
          Le vrai planning de la semaine. Tu touches un créneau libre, tu réserves. Pas
          besoin d'appeler.
        </Intitule>
        <div id="planning" className="scroll-mt-24">
          <Planning />
        </div>
      </div>

      <ul className="grid gap-3 md:grid-cols-3">
        {REGLES.map((r) => (
          <li key={r.titre} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-2">
            <h2 className="text-xl font-extrabold">{r.titre}</h2>
            <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-[var(--doux)]">Règles d'exemple : l'école est fictive.</p>
    </main>
  );
}
