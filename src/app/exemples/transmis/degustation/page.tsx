import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Section, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Comme une table au restaurant" titre="Viens goûter *ton menu.*" photo={photos.framboises}>
        Un samedi, une heure, pour deux. Tu goûtes ton menu et le dernier essai de ta recette, avec la personne qui te l&apos;a
        transmise si elle le peut. La dégustation est offerte (exemple).
      </EnTetePage>
      <Section className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Mars 2027</Surtitre></Apparition>
          <Titre texte="Choisis *ton samedi.*" />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Le créneau, tes allergies s&apos;il y en a, et c&apos;est réservé. La date du mariage se cale le même jour.
          </Apparition>
        </div>
        <Apparition delai={150}><Degustation /></Apparition>
      </Section>
      <AppelFinal />
    </main>
  );
}
