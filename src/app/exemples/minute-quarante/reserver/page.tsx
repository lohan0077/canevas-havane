import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, SEANCE, entreprise } from "../_composants/donnees";
import { Surtitre } from "../_composants/Blocs";

// La réservation. La vidéo : « Le client voit que tout le monde est gêné au début.
// Alors il réserve sa séance. » On choisit un créneau, on le bloque : la démonstration
// le confirme et dit que rien n'est envoyé.
export const metadata: Metadata = {
  title: "Réserver · Minute Quarante — site de démonstration",
  description: "Choisir la date et l'heure d'une séance photo en famille, en extérieur. Site de démonstration : rien n'est envoyé ni enregistré.",
  ...adressesDeLaPage("/exemples/minute-quarante/reserver"),
};

export default function Reserver() {
  return (
    <main className="max-w-6xl mx-auto px-5 pt-8 pb-20 sm:pt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <Surtitre>{SEANCE.nom} · {SEANCE.duree}</Surtitre>
        <h1 className="text-[44px] sm:text-7xl font-medium tracking-[-0.03em]">
          Ta date, <span className="italic">ton heure.</span>
        </h1>
        <p className="text-lg leading-relaxed">
          Choisis un créneau et réserve-le. Je te rappelle dans la journée pour choisir le
          lieu ensemble. {SEANCE.prix} TTC, réglés le jour même (prix d&apos;exemple).
        </p>
        <dl className="hidden lg:grid grid-cols-2 gap-4 pt-4">
          <div className="border-t border-[var(--encre)] pt-3">
            <dt className="text-sm font-bold uppercase tracking-[0.14em]">Durée</dt>
            <dd className="text-xl">{SEANCE.duree}</dd>
          </div>
          <div className="border-t border-[var(--encre)] pt-3">
            <dt className="text-sm font-bold uppercase tracking-[0.14em]">Où</dt>
            <dd className="text-xl">En extérieur</dd>
          </div>
        </dl>
      </div>
      <div id="creneaux" data-film="creneaux" className="space-y-4">
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={2}
          titreCarte="Ta séance"
          bouton="Réserver ma séance"
          confirmation="Séance réservée. Je te rappelle pour le lieu."
          note="Novembre 2026 · créneaux pris : exemple, l'entreprise est fictive."
        />
        <p className="text-sm text-[var(--doux)]">
          Tu préfères parler d&apos;abord ? {entreprise.telephone} (numéro fictif, réservé par
          l&apos;ARCEP aux œuvres de fiction).
        </p>
      </div>
    </main>
  );
}
