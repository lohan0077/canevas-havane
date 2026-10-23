import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre, TERRE } from "../_composants/Blocs";
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

export default function Disponibilites() {
  return (
    <main>
      <EnTetePage surtitre="Comme une chambre d'hôtel" titre="Les vraies *disponibilités.*" photo={photos.godets} origine="50% 60%">
        Tente par tente, machine par machine, samedi par samedi. Ce qui est libre est libre&nbsp;; ce qui est pris est pris. Tu
        réserves en ligne.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Juin 2027</Surtitre></Apparition>
          <TitreRevele texte="Touche un samedi *libre.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.92] tracking-[-0.03em]" classeAccent={TERRE} />
          <Apparition as="ul" delai={150} className="space-y-3 text-lg">
            {["Le prix s'affiche, TTC, livré", "Avec chauffeur, si la machine le permet", "« Réserver ce samedi », et c'est bloqué", "Sur un vrai site, la grille bouge à chaque réservation"].map((t) => (
              <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-3">
                <span aria-hidden="true" className="text-[var(--accent-texte)]">✿</span>
                {t}
              </li>
            ))}
          </Apparition>
        </div>
        <Apparition de="zoom"><Planning /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
