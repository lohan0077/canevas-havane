import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { Surtitre } from "../_composants/Blocs";
import { cabinet, creneaux } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Rendez-vous — Le Pourquoi, site de démonstration",
  description:
    "Prendre rendez-vous chez une ostéopathe imaginaire : un créneau, et aucune question sur ce qui vous amène.",
  ...adressesDeLaPage("/exemples/le-pourquoi/rendez-vous"),
};

export default function RendezVous() {
  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <Surtitre>Rendez-vous</Surtitre>
        <h1 className="text-[48px] sm:text-7xl font-semibold tracking-[-0.045em]">
          Un créneau. <span className="text-[var(--accent-texte)]">Pas de questionnaire.</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Le site ne vous demande pas pourquoi vous venez : c&apos;est une donnée de santé, et
          c&apos;est à moi que vous le direz, au cabinet. Ici, les seules questions sont les
          vôtres.
        </p>
        <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          <div className="py-3.5 flex justify-between gap-4"><dt className="text-[var(--doux)]">Séance</dt><dd className="font-[family-name:var(--titres)] font-semibold">{cabinet.duree} · {cabinet.prix}</dd></div>
          <div className="py-3.5 flex justify-between gap-4"><dt className="text-[var(--doux)]">Facture</dt><dd className="font-[family-name:var(--titres)] font-semibold">à chaque séance</dd></div>
          <div className="py-3.5 flex justify-between gap-4"><dt className="text-[var(--doux)]">Téléphone</dt><dd className="font-[family-name:var(--titres)] font-semibold tabular-nums">{cabinet.telephone}</dd></div>
        </dl>
      </div>
      <div className="space-y-5">
        <p className="font-[family-name:var(--titres)] text-xl font-medium">Cette semaine</p>
        <Creneaux
          creneaux={creneaux}
          colonnes={3}
          titreCarte="Votre séance"
          bouton="Réserver ce créneau"
          confirmation="Réservé : {creneau} · on vous rappelle la veille"
          note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          libellePris="Pris"
          libelleLibre="Libre"
        />
        <p className="text-sm text-[var(--doux)]">En cas d&apos;urgence, ne réservez pas : appelez le 15.</p>
      </div>
    </main>
  );
}
