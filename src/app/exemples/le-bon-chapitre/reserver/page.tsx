import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, PRIX, entreprise } from "../_composants/donnees";
import { Note } from "../_composants/Blocs";

// L'agenda, en vrai. La vidéo : « Et l'agenda, en vrai, sur le site. Mercredi, quatorze
// heures, un clic : c'est réservé. »
export const metadata: Metadata = {
  title: "Réserver · Le Bon Chapitre — site de démonstration",
  description: "Les créneaux de la semaine pour un cours de maths à domicile, réservables en un clic. Site de démonstration : rien n'est envoyé ni enregistré.",
  ...adressesDeLaPage("/exemples/le-bon-chapitre/reserver"),
};

export default function Reserver() {
  return (
    <main className="max-w-6xl mx-auto px-5 pt-8 pb-20 sm:pt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4">
        <Note>Semaine du 2 novembre</Note>
        <h1 className="text-5xl sm:text-6xl">L&apos;agenda, <span className="text-[var(--accent-texte)]">en vrai.</span></h1>
        <p className="text-lg leading-relaxed">
          Maths, chez vous, une heure. {PRIX.heure}&nbsp;€ TTC l&apos;heure, déplacement compris
          (exemple). Un clic, et le créneau est à vous ; {entreprise.prof} vous rappelle pour le
          chapitre.
        </p>
      </div>
      <div id="creneaux" data-film="creneaux" className="space-y-4">
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={2}
          titreCarte="Maths · chez vous · 1 heure"
          bouton="Réserver ce créneau"
          confirmation="C'est réservé."
          note="Créneaux pris : exemple, l'entreprise est fictive."
        />
        <p className="text-sm text-[var(--doux)]">
          Ou appelez le {entreprise.telephone} (numéro fictif, réservé par l&apos;ARCEP aux œuvres de
          fiction).
        </p>
      </div>
    </main>
  );
}
