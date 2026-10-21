import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { euros, tarifs } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tarifs · Capot Ouvert — site de démonstration",
  description: "Les tarifs de Capot Ouvert, garage imaginaire : prix TTC d'exemple, pièces et main-d'œuvre comprises.",
  ...adressesDeLaPage("/exemples/capot-ouvert/tarifs"),
};

export default function Tarifs() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20 space-y-10">
      <div className="space-y-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em]">Tarifs</p>
        <h1 className="text-6xl sm:text-8xl font-bold tracking-[-0.03em] leading-[0.92]">Les prix, à découvert.</h1>
        <p className="text-xl leading-relaxed">TTC, pièces et main-d'œuvre comprises, pour une citadine. Le prix de ta voiture est écrit sur le devis, avant de commencer.</p>
      </div>
      <ul className="border-t-[3px] border-[var(--trait)]">
        {tarifs.map((t) => (
          <li key={t.nom} className="flex items-baseline justify-between gap-4 border-b-[3px] border-[var(--trait)] py-5">
            <span>
              <span className="block font-[family-name:var(--titres)] text-2xl sm:text-3xl font-bold">{t.nom}</span>
              <span className="block text-[var(--doux)]">{t.detail}</span>
            </span>
            <span className="font-[family-name:var(--titres)] text-2xl sm:text-3xl font-bold whitespace-nowrap [font-variant-numeric:lining-nums]">{euros(t.prix)}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-[14px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] space-y-2">
        <p className="font-[family-name:var(--titres)] text-2xl font-bold">Toujours compris</p>
        <p className="text-lg leading-relaxed">Les photos d'avant et d'après sur ta page privée, et ta vieille pièce dans son sac, quand elle peut être rendue.</p>
      </div>
      <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple : le garage est fictif.</p>
    </main>
  );
}
