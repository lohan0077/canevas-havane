import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Fournee from "../_composants/Fournee";
import { ouvertures, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La fournée — Après Nous, site de démonstration",
  description: "La fournée d'un atelier de céramique imaginaire : chaque pièce, son numéro, son prix, en ligne le soir de l'ouverture du four. Une seule de chaque.",
  ...adressesDeLaPage("/exemples/apres-nous/fournee"),
};

export default function PageFournee() {
  return (
    <main>
      <EnTetePage numero="V" surtitre={`La fournée du ${ouvertures.derniere.date}`} titre="Une seule *de chaque.*" photo={photos.fournee}>
        Sorties du four en direct, en ligne le soir même. Quand une pièce est partie, elle est partie : sa page le dit, et
        elle ne revient pas.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <Fournee />
        <Apparition as="p" className="mt-10 text-[15px] text-[var(--doux)]">
          Pièces, prix TTC et ventes d&apos;exemple : l&apos;atelier est fictif. Prochaine fournée : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}.
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
