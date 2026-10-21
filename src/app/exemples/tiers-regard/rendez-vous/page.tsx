import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { Certification, CommeTous, Etiquette } from "../_composants/Blocs";
import { CRENEAUX, PREPARER } from "../_composants/donnees";

// Le rendez-vous se prend en ligne : c'est le propriétaire qui choisit son diagnostiqueur
// et son créneau. Créneaux d'exemple ; rien n'est envoyé.
export const metadata: Metadata = {
  title: "Rendez-vous — Tiers Regard, site de démonstration",
  description: "Choisir son créneau de diagnostic immobilier en ligne, et ce qu'il faut préparer pour la visite. Exemple d'un diagnostiqueur imaginaire.",
  ...adressesDeLaPage("/exemples/tiers-regard/rendez-vous"),
};

export default function PageRendezVous() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-5">
        <Etiquette>Rendez-vous</Etiquette>
        <h1 className="font-[family-name:var(--titres)] text-[38px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[54px]">
          Ton créneau, <span className="text-[var(--accent-texte)]">en ligne.</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-[var(--doux)]">
          C&apos;est toi qui commandes ton diagnostic, et toi qui choisis ton diagnostiqueur. Une à trois
          heures sur place, selon le bien (exemple).
        </p>
        <div className="rounded-[10px] border border-[var(--trait)] bg-[var(--carte)] p-5">
          <Certification />
        </div>
      </div>
      <div className="space-y-8">
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={3}
          titreCarte="Ton diagnostic"
          bouton="Réserver ce créneau"
          confirmation="Diagnostic réservé : {creneau}"
          note="Créneaux d'exemple : sur un vrai site, ils suivent l'agenda réel du diagnostiqueur."
        />
        <section aria-labelledby="tr-preparer" className="space-y-4 rounded-[10px] border border-[var(--trait)] p-5">
          <h2 id="tr-preparer" className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.02em]">Ce qu&apos;il faut préparer</h2>
          <ul className="space-y-3">
            {PREPARER.map((p) => (
              <li key={p} className="flex gap-3 text-[16px] leading-relaxed">
                <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                {p}
              </li>
            ))}
          </ul>
        </section>
        <CommeTous />
      </div>
    </div>
  );
}
