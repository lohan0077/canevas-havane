import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Reservation from "../_composants/Reservation";
import { photos } from "../_composants/donnees";

// « Ça rentre ? Tu réserves. Et tu préviens les voisins. » La tente, le samedi, le
// récapitulatif (capacité du fabricant, montage la veille), puis le mot pour les voisins.
export const metadata: Metadata = {
  title: "Réserver ma tente — Pignon sur Pré, site de démonstration",
  description: "Choisir sa tente et son samedi, réserver, et recevoir le mot pour prévenir les voisins. Site de démonstration : rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/reserver"),
};

export default function Reserver() {
  return (
    <main>
      <EnTetePage surtitre="Réserver ma tente" titre="Ton samedi, *dans ton pré.*" photo={photos.tenteNuit}>
        On monte la veille, on démonte le lundi. Trois semaines avant, on vient voir le pré. Et après la réservation, le mot
        pour les voisins est prêt.
      </EnTetePage>
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-24">
        <Apparition de="zoom"><Reservation /></Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
