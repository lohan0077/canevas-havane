import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { TARIFS } from "../_composants/donnees";
import Seances from "../_composants/Seances";

export const metadata: Metadata = {
  title: "Séances · Mode Avion — site de démonstration",
  description: "Réserver une séance d'une heure chez Mode Avion, salle de sport imaginaire, et recevoir sa carte d'embarquement : l'heure, le casier, le téléphone en soute.",
  ...adressesDeLaPage("/exemples/mode-avion/seances"),
};

export default function PageSeances() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5">
        <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Séances</p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[1]">Ta séance, comme un vol.</h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">Choisis ton heure : tu reçois ta carte d'embarquement, avec ton casier. Le téléphone voyage en soute.</p>
        <ul className="rounded-[24px] bg-[var(--carte)] p-5 divide-y divide-[var(--trait)]">
          {TARIFS.map((t) => (
            <li key={t.nom} className="flex items-baseline justify-between gap-4 py-3">
              <span><span className="block font-semibold">{t.nom}</span><span className="block text-sm text-[var(--doux)]">{t.detail}</span></span>
              <span className="font-[family-name:var(--titres)] text-xl font-semibold whitespace-nowrap">{t.prix}</span>
            </li>
          ))}
          <li className="pt-3 text-sm text-[var(--doux)]">Prix TTC d'exemple.</li>
        </ul>
      </div>
      <Seances />
    </main>
  );
}
