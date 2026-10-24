import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, CommeTous, EnTetePage, Etiquette } from "../_composants/Blocs";
import UnePage from "../_composants/UnePage";
import { DOSSIER, photos } from "../_composants/donnees";

// La vidéo « Créer une marque » : « Sur le site, ton rapport, traduit en une seule page.
// Ce qui va, et ce qui cloche. » Exemple : aucun logement réel ; la page traduit le
// rapport sans le remplacer, et ne recommande aucune entreprise (CCH L271-6).
export const metadata: Metadata = {
  title: "Ton rapport en une page — Tiers Regard, site de démonstration",
  description: "Un rapport de diagnostic immobilier traduit en une seule page : ce qui va, ce qui cloche, en clair ou mot pour mot. Exemple d'un diagnostiqueur imaginaire.",
  ...adressesDeLaPage("/exemples/tiers-regard/une-page"),
};

export default function PageUnePage() {
  return (
    <main>
      <EnTetePage etiquette="Exemple de rapport" titre="Ton rapport, traduit en *une seule page.*" photo={photos.priseOuverte} origine="50% 50%">
        Un rapport de diagnostic fait souvent des dizaines de pages. Celle-ci dit l&apos;essentiel : ce
        qui va, ce qui cloche. Touche une ligne pour la lire en clair, ou mot pour mot.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="order-2 space-y-6 lg:order-1 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Etiquette>Ni plus beau, ni plus grave</Etiquette></Apparition>
          <Apparition delai={100} className="space-y-4 text-[17px] leading-relaxed text-[var(--doux)]">
            <p>La page traduit, elle ne remplace rien : le rapport complet reste joint, et c&apos;est lui qui fait foi, page par page.</p>
            <CommeTous />
          </Apparition>
          <Apparition delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`}>Prendre rendez-vous</Bouton>
          </Apparition>
        </div>
        <div className="order-1 lg:order-2">
          <UnePage />
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
