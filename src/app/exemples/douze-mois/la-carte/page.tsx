import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage } from "../_composants/Blocs";
import EcrireCarte from "../_composants/EcrireCarte";
import { DOSSIER, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La carte — Douze Mois, site de démonstration",
  description: "Que mettre sur la carte d'un bouquet de fleurs ? Des phrases pour l'amour, un anniversaire, un ami, un merci, un pardon — et la tienne, écrite à la main.",
  ...adressesDeLaPage("/exemples/douze-mois/la-carte"),
};

// Ce que les gens tapent : « message bouquet de fleur amour », « … anniversaire »,
// « … amitié » (suggestions Google relevées le 15/10/2026). La page y répond.
export default function LaCarte() {
  return (
    <main>
      <EnTetePage surtitre="La carte" titre={"Que mettre *sur la carte ?*"} photo={PHOTOS.carteEcrite} origine="50% 40%">
        Choisis une phrase, change un mot, ou écris la tienne : on la recopie à la main, à
        l&apos;encre, sur la carte du bouquet.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <EcrireCarte />
        <Apparition className="mt-14">
          <Bouton href={`${DOSSIER}#choix`} variante="encre">Choisir le bouquet qui va avec</Bouton>
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
