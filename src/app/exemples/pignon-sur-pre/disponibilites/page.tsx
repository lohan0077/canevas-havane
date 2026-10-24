import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Intitule } from "../_composants/Blocs";
import Planning from "../_composants/Planning";
import { photos } from "../_composants/donnees";

// « Et les vraies disponibilités, machine par machine. Tu réserves en ligne, comme une
// chambre d'hôtel. » Les tentes et les engins, samedi par samedi ; les « pris » sont un
// exemple (C. consom., art. L. 121-4, 7° : pas de fausse rareté).
export const metadata: Metadata = {
  title: "Disponibilités — Pignon sur Pré, site de démonstration",
  description: "Les vraies disponibilités, tente par tente et machine par machine, samedi par samedi : on réserve en ligne, comme une chambre d'hôtel. Site de démonstration.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/disponibilites"),
};

const ETAPES = [
  "Le prix s'affiche, TTC, livré",
  "Avec chauffeur, si la machine le permet",
  "« Réserver ce samedi », et c'est bloqué",
  "Sur un vrai site, la grille bouge à chaque réservation",
];

export default function Disponibilites() {
  return (
    <main>
      <EnTetePage surtitre="Comme une chambre d'hôtel" titre="Les vraies *disponibilités.*" photo={photos.godets} origine="50% 60%">
        Tente par tente, machine par machine, samedi par samedi. Ce qui est libre est libre&nbsp;; ce qui est pris est pris. Tu
        réserves en ligne.
      </EnTetePage>

      <section className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <div className="space-y-10 lg:sticky lg:top-28">
            <Intitule surtitre="Juin 2027" titre="Touche un samedi *libre.*" />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
              {ETAPES.map((t, i) => (
                <Apparition as="li" key={t} delai={i * 90} className="py-3.5">{t}</Apparition>
              ))}
            </ul>
          </div>
          <Apparition delai={150}><Planning /></Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
