import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Titre } from "../_composants/Blocs";
import EcrireCarte from "../_composants/EcrireCarte";
import { DOSSIER, GESTES, PHOTOS } from "../_composants/donnees";

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
      <EnTetePage titre={"Que mettre sur la carte\u00a0?"} photo={PHOTOS.carteEcrite} origine="50% 40%">
        Choisis une phrase, change un mot, ou écris la tienne : on la recopie à la main, à
        l&apos;encre, sur la carte du bouquet.
      </EnTetePage>
      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <EcrireCarte />
          <Apparition>
            <Bouton href={`${DOSSIER}#choix`}>Choisir le bouquet qui va avec</Bouton>
          </Apparition>
        </div>
      </section>
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Titre texte="Trois gestes, et ta signature." />
          <ol className="grid gap-10 md:grid-cols-3">
            {GESTES.map((g, i) => (
              <Apparition as="li" key={g.titre} delai={i * 100} className="space-y-3 border-t border-[var(--trait)] pt-6">
                <p className="text-[15px] font-medium text-[var(--doux)]">{g.surtitre}</p>
                <h2 className="text-[1.75rem] font-normal leading-tight">{g.titre}</h2>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{g.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
