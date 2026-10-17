import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Soirs from "../_composants/Soirs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Réserver — Mardi Soir, site de démonstration",
  description:
    "Réserver un soir chez une diététicienne imaginaire : la séance, le soir, l'heure, un nom et un téléphone — ni poids, ni objectif à écrire.",
  ...adressesDeLaPage("/exemples/mardi-soir/reserver"),
};

export default function Reserver() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4 px-1">
        <p className="text-sm font-semibold text-[var(--accent-texte)]">{cabinet.dieteticienne} · diététicienne diplômée</p>
        <h1 className="text-[40px] sm:text-6xl leading-[1.05]">Réservez votre soir.</h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">Vous ne venez pas pour un régime. Vous venez pour votre mardi soir.</p>
      </div>
      <Soirs />
    </main>
  );
}
