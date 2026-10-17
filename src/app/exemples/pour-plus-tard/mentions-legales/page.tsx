import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Pour Plus Tard — site de démonstration",
  description: "Pour Plus Tard est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="pour-plus-tard"
        entreprise="Pour Plus Tard"
        polices="Newsreader et Space Grotesk"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait le studio, son adresse et son numéro
              SIRET. Ici, tout est exemple : SIRET 000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de
              l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Droit à l&apos;image (Code civil, art. 9) : un vrai studio ne publie ni n&apos;expose
              aucune photo sans l&apos;accord écrit des personnes qui y figurent. Droit
              d&apos;auteur : exposer une photo en vitrine est une représentation publique (Code
              de la propriété intellectuelle, art. L122-2), et une photo reste protégée
              soixante-dix ans après la mort de son auteur (art. L123-1).
            </p>
            <p>
              Les photos de ce site ne montrent aucun client : ce sont des photos libres, sans
              visage, créditées ci-dessous ; les tirages de la boîte et le mur de la vitrine
              sont dessinés. La mise en page s&apos;inspire du modèle « Neo Museum » de la
              bibliothèque MotionSites, transposé à un studio photo.
            </p>
          </>
        }
      />
    </main>
  );
}
