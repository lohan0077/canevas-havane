import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Suivi from "../_composants/Suivi";

export const metadata: Metadata = {
  title: "Suivi · Mains Libres — site de démonstration",
  description: "Le suivi d'une réparation chez Mains Libres, garage imaginaire : où en est la voiture, et la photo qui pose la question. Oui, ou non.",
  ...adressesDeLaPage("/exemples/mains-libres/suivi"),
};

export default function PageSuivi() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--doux)]">Suivi · exemple</p>
        <h1 className="text-5xl sm:text-7xl font-medium tracking-[-0.04em]">Ta voiture, <span className="text-[var(--accent-texte)]">en direct.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Citadine · vidange + filtre · déposée mardi 8 h. Si l'atelier trouve autre chose, la
          question arrive ici, avec une photo. Rien n'est fait sans ton accord.
        </p>
      </div>
      <Suivi />
    </main>
  );
}
