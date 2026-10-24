import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, CarteOccasion, EnTetePage } from "../_composants/Blocs";
import { IMAGES, OCCASIONS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'occasion — Tour du Quartier, site de démonstration",
  description: "Les vélos d'occasion d'un magasin imaginaire : chacun a sa fiche, sa batterie testée et son marquage, comme la loi l'impose.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/occasion"),
};

export default function Occasions() {
  return (
    <main>
      <EnTetePage pastille="L'occasion · révisée à l'atelier" titre="Révisés, testés, *marqués.*" photo={IMAGES.chaine}>
        Chaque vélo d&apos;occasion passe à l&apos;atelier avant d&apos;arriver ici. Sa fiche dit ce qu&apos;on a
        changé, ce que vaut encore sa batterie, et à quelle taille il va.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Apparition as="li" key={o.id} delai={i * 100} de="zoom">
              <CarteOccasion o={o} />
            </Apparition>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-[var(--doux)]">Vélos sans marque, prix TTC et tests d&apos;exemple : le magasin est fictif.</p>
      </section>
      <AppelFinal />
    </main>
  );
}
