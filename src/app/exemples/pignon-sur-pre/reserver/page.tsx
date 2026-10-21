import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Surtitre } from "../_composants/Blocs";
import Reservation from "../_composants/Reservation";

// « Ça rentre ? Tu réserves. Et tu préviens les voisins. » La tente, le samedi, le
// récapitulatif (capacité du fabricant, montage la veille), puis le mot pour les voisins.
export const metadata: Metadata = {
  title: "Réserver · Pignon sur Pré — site de démonstration",
  description: "Choisir sa tente et son samedi, réserver, et recevoir le mot pour prévenir les voisins. Site de démonstration : rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/reserver"),
};

export default function Reserver() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-10 pb-16 sm:pt-16 sm:pb-24 space-y-10">
      <div className="space-y-4">
        <Surtitre>Réserver</Surtitre>
        <h1 className="text-[48px] sm:text-7xl font-normal">Ton samedi, <em className="text-[var(--accent-texte)]">dans ton pré.</em></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          On monte la veille, on démonte le lundi. Trois semaines avant, on vient voir le pré.
        </p>
      </div>
      <Reservation />
    </div>
  );
}
