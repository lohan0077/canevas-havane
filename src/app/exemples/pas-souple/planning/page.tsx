import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { TARIFS } from "../_composants/donnees";
import Planning from "../_composants/Planning";

export const metadata: Metadata = {
  title: "Planning · Pas Souple — site de démonstration",
  description: "Le planning de Pas Souple, studio de pilates imaginaire : les cours de la semaine, et la place qu'on réserve sans appeler.",
  ...adressesDeLaPage("/exemples/pas-souple/planning"),
};

export default function PagePlanning() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Cette semaine</p>
        <h1 className="text-5xl sm:text-7xl font-light tracking-[-0.03em] leading-[1]">Le planning, <span className="font-normal text-[var(--accent-texte)]">en vrai.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">Tu choisis ton cours, tu réserves ta place. Sans appeler, sans PDF.</p>
        <ul className="rounded-[28px] bg-[var(--carte)] p-5 divide-y divide-[var(--trait)]">
          {TARIFS.map((t) => (
            <li key={t.nom} className="flex items-baseline justify-between gap-4 py-3">
              <span><span className="block font-semibold">{t.nom}</span><span className="block text-sm text-[var(--doux)]">{t.detail}</span></span>
              <span className="font-[family-name:var(--titres)] text-xl whitespace-nowrap">{t.prix}</span>
            </li>
          ))}
          <li className="pt-3 text-sm text-[var(--doux)]">Prix TTC d'exemple.</li>
        </ul>
      </div>
      <Planning />
    </main>
  );
}
