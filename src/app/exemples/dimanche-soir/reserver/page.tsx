import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, FORMULE, entreprise } from "../_composants/donnees";

// Réserver les trois séances : trois soirs, la même heure, trois semaines de suite.
export const metadata: Metadata = {
  title: "Réserver · Dimanche Soir — site de démonstration",
  description: "Choisir ses trois soirs de coaching chez Dimanche Soir, cabinet imaginaire : 3 × 1 h, 270 € TTC (prix d'exemple). Site de démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/dimanche-soir/reserver"),
};

export default function Reserver() {
  return (
    <main className="max-w-6xl mx-auto px-5 pt-10 pb-20 sm:pt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{FORMULE.seances} × {FORMULE.duree} · {FORMULE.prix} TTC</p>
        <h1 className="text-5xl sm:text-7xl">Choisis <span className="italic text-[var(--accent-texte)]">tes trois soirs.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          La même heure, trois semaines de suite. Jamais le dimanche. Prix d&apos;exemple, payé
          séance par séance.
        </p>
      </div>
      <div id="creneaux" className="space-y-4">
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={2}
          titreCarte="Tes trois soirs"
          bouton="Réserver mes trois séances"
          confirmation="Trois soirs réservés. Apporte ta question, telle quelle."
          note="Novembre 2026 · série complète : exemple, l'entreprise est fictive."
          libellePris="Complet"
        />
        <p className="text-sm text-[var(--doux)]">
          Ou appelle le {entreprise.telephone} (numéro fictif, réservé par l&apos;ARCEP aux œuvres
          de fiction).
        </p>
      </div>
    </main>
  );
}
