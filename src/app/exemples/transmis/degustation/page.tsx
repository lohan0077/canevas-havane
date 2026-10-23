import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Note, SAUCE } from "../_composants/Blocs";
import Degustation from "../_composants/Degustation";
import { photos } from "../_composants/donnees";

// « Et pour remplir le carnet : la dégustation se réserve en ligne. Comme une table au
// restaurant. » Un samedi, une heure, pour deux ; les allergies dites avant.
export const metadata: Metadata = {
  title: "La dégustation — Transmis, site de démonstration",
  description: "Viens goûter ton menu et le dernier essai de ta recette : la dégustation se réserve en ligne, comme une table au restaurant. Site de démonstration.",
  ...adressesDeLaPage("/exemples/transmis/degustation"),
};

export default function PageDegustation() {
  return (
    <main>
      <EnTetePage note="comme une table au restaurant" titre="Viens goûter *ton menu.*" photo={photos.framboises}>
        Un samedi, une heure, pour deux. Tu goûtes ton menu et le dernier essai de ta recette — avec la personne qui te l&apos;a
        transmise, si elle le peut. La dégustation est offerte (exemple).
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Note>mars 2027</Note></Apparition>
          <TitreRevele texte="Choisis *ton samedi.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,5.5vw,4.8rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Le créneau, tes allergies s&apos;il y en a, et c&apos;est réservé. La date du mariage se cale le même jour.
          </Apparition>
        </div>
        <Apparition de="zoom"><Degustation /></Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
