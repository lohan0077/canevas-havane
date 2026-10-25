import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Fiche from "../_composants/Fiche";
import { FICHES, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La vitrine — Gâteaux Perdus, site de démonstration",
  description: "La vitrine d'une pâtisserie imaginaire : les fiches de recettes des familles, épinglées avec leur accord, à côté des gâteaux refaits.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/la-vitrine"),
};

// Le coup de lancement de la vidéo : en vitrine, à côté des gâteaux, les vraies fiches
// des clients, épinglées avec leur accord. Ici, des fiches inventées.
export default function LaVitrine() {
  return (
    <main>
      <EnTetePage surtitre="La vitrine" titre="Leurs recettes, *épinglées.*" photo={PHOTOS.dentelle} origine="50% 55%">
        Chaque fiche est en vitrine avec l&apos;accord écrit de la famille. Sans accord, elle reste
        dans le tiroir — et le gâteau, lui, se refait quand même.
      </EnTetePage>
      <section className="bg-[#B98A5E] bg-[radial-gradient(rgba(61,29,19,0.18)_1px,transparent_1.5px)] [background-size:9px_9px] py-20">
        <ul className="mx-auto grid max-w-6xl gap-x-6 gap-y-14 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {FICHES.map((f, i) => (
            <Apparition as="li" key={f.titre} delai={(i % 3) * 120} de="zoom" className="space-y-4">
              <Fiche fiche={f} angle={[-3, 2, -1.5, 3, -2, 1.5][i]} punaise />
              <div className="mx-2 rounded-[1rem] bg-[var(--carte)] px-4 py-3 text-[15px]">
                <p className="font-bold">{f.famille} · {f.refait}</p>
                <p className="text-[var(--doux)]">Allergènes du gâteau refait : {f.allergenes}.</p>
                <p className="text-[13px] text-[var(--doux)]">Épinglée avec l&apos;accord écrit de la famille.</p>
              </div>
            </Apparition>
          ))}
        </ul>
      </section>
      <p className="mx-auto max-w-3xl px-5 py-10 text-center text-[13px] text-[var(--doux)]">Fiches, prénoms et initiales inventés pour l&apos;exemple : la pâtisserie est fictive.</p>
      <AppelFinal />
    </main>
  );
}
