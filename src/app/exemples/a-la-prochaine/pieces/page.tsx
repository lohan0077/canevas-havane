import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import { ListePieces } from "../_composants/Interactions";
import { IMAGES } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les pièces — À la Prochaine, site de démonstration",
  description: "Toutes les pièces d'une marque de bijoux imaginaire : chacune faite une fois, numérotée ; celles qui sont parties gardent leur page.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/pieces"),
};

export default function Pieces() {
  return (
    <main>
      <EnTetePage libelle="Les pièces · une sur une" titre="Toutes, *une seule fois.*" photo={IMAGES.baguesFeuille}>
        Chaque numéro est fait une fois, à l&apos;atelier, et jamais refait. Quand une pièce est partie, sa page reste :
        sa fabrication, sa date, et les prénoms de qui la porte.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <ListePieces />
        <p className="mt-10 text-[14px] text-[var(--doux)]">
          Pièces, prix TTC et ventes d&apos;exemple : la marque est fictive. Les numéros 1 à 40 sont partis avant
          l&apos;ouverture du site.
        </p>
      </section>
      <AppelFinal />
    </main>
  );
}
