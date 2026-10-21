import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import ChoixRayon from "../_composants/ChoixRayon";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Au rayon — Rayon Frais, site de démonstration",
  description:
    "Choisir le rayon qu'on fait ensemble, chez une diététicienne imaginaire : le petit-déj, l'apéro, le goûter. En individuel, si vous voulez.",
  ...adressesDeLaPage("/exemples/rayon-frais/rayons"),
};

export default function Rayons() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4 px-1">
        <p className="text-sm font-semibold text-[var(--accent-texte)]">Au supermarché · en individuel</p>
        <h1 className="text-[56px] sm:text-8xl font-bold leading-[0.95]">Quel <span className="bg-[#F2C94C] px-2">rayon</span>&nbsp;?</h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Après la première séance au cabinet, on peut aller au rayon ensemble. Vous choisissez
          lequel. {cabinet.dieteticienne}, diététicienne diplômée.
        </p>
      </div>
      <ChoixRayon />
    </main>
  );
}
