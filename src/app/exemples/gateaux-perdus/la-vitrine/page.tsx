import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { FICHES } from "../_composants/donnees";
import Fiche from "../_composants/Fiche";
import { Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "La vitrine — Gâteaux Perdus — site de démonstration",
  description: "La vitrine d'une pâtisserie imaginaire : les fiches de recettes des familles, épinglées avec leur accord, à côté des gâteaux refaits.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/la-vitrine"),
};

// Le coup de lancement de la vidéo : en vitrine, à côté des gâteaux, les vraies fiches
// des clients, épinglées avec leur accord. Ici, des fiches inventées.
export default function LaVitrine() {
  return (
    <main>
      <div className="mx-auto max-w-3xl space-y-5 px-4 pt-12 text-center sm:px-6 sm:pt-16">
        <Surtitre centre>La vitrine</Surtitre>
        <h1 className="text-[48px] leading-[1] text-[var(--accent)] sm:text-[80px]">Leurs recettes, <span className="italic text-[var(--accent-texte)]">épinglées.</span></h1>
        <p className="text-lg leading-relaxed">Chaque fiche est en vitrine avec l&apos;accord écrit de la famille. Sans accord, elle reste dans le tiroir — et le gâteau, lui, se refait quand même.</p>
      </div>
      <section className="mt-12 bg-[#B98A5E] bg-[radial-gradient(rgba(61,29,19,0.18)_1px,transparent_1.5px)] [background-size:9px_9px] py-14">
        <ul className="mx-auto grid max-w-6xl gap-x-6 gap-y-12 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {FICHES.map((f, i) => (
            <li key={f.titre} className="space-y-3">
              <Fiche fiche={f} angle={[-3, 2, -1.5, 3, -2, 1.5][i]} punaise />
              <div className="mx-2 rounded-[6px] bg-[var(--carte)] px-4 py-3 text-sm">
                <p className="font-semibold">{f.famille} · {f.refait}</p>
                <p className="text-[var(--doux)]">Allergènes du gâteau refait : {f.allergenes}.</p>
                <p className="text-xs text-[var(--doux)]">Épinglée avec l&apos;accord écrit de la famille.</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <p className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-[var(--doux)]">Fiches, prénoms et initiales inventés pour l&apos;exemple : la pâtisserie est fictive.</p>
    </main>
  );
}
