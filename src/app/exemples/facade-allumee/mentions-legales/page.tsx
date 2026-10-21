import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Façade Allumée — site de démonstration",
  description: "Façade Allumée est un enseigniste fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/facade-allumee/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <>
      <MentionsDemonstration
        site="facade-allumee"
        entreprise="Façade Allumée"
        polices="Bodoni Moda et Archivo"
        enPlus={
          <>
            <p>
              Les façades sont dessinées et ne représentent aucune boutique réelle : elles portent un
              nom de métier (« Boulangerie », « Librairie »), jamais le nom d&apos;un commerce. Les
              prix sont hors taxes, la clientèle d&apos;un enseigniste étant professionnelle, et
              marqués « exemple ». L&apos;adresse, le SIRET ({entreprise.siret}) et le numéro{" "}
              {entreprise.telephone}, pris dans une tranche que l&apos;ARCEP réserve aux œuvres de
              fiction, sont des exemples.
            </p>
            <p>
              Le dossier d&apos;autorisation est décrit d&apos;après le Code de l&apos;environnement, dans
              sa version en vigueur depuis le 1er juillet 2026 : autorisation exigée dans certains
              lieux seulement (art. L. 581-18), trois pièces pour tout projet — mise en situation,
              vue avec et sans l&apos;enseigne, document graphique d&apos;intégration (art. R. 581-16) —,
              demande présentée par l&apos;exploitant et déposée en mairie en trois exemplaires
              (art. R. 581-9), décision sous deux mois (art. R. 581-13). Aucune enseigne du site ne
              clignote : c&apos;est interdit hors pharmacies et services d&apos;urgence (art. R. 581-59).
              Ces informations sont générales ; le règlement local de publicité de chaque commune
              s&apos;applique.
            </p>
            <p>
              Le montage « avant / après » fonctionne dans le navigateur : la photo choisie est lue
              sur l&apos;appareil et n&apos;est jamais envoyée. La mise en page s&apos;inspire du modèle
              « Menuchi » de la bibliothèque MotionSites, transposé à un enseigniste.
            </p>
          </>
        }
      />
    </>
  );
}
