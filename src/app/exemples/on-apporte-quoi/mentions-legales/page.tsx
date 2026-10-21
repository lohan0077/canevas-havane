import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — On Apporte Quoi, site de démonstration",
  description: "On Apporte Quoi est une épicerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/on-apporte-quoi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="on-apporte-quoi"
        entreprise="On Apporte Quoi"
        polices="Fraunces, Figtree et Caveat"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie épicerie, ici avec des valeurs
              d&apos;exemple : On Apporte Quoi, entreprise individuelle, SIRET 000 000 000 00000
              (exemple), {boutique.adresse} (adresse fictive). Le téléphone {boutique.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les coffrets sont vendus à distance : la dénomination, le poids, la liste des
              ingrédients et les allergènes de chaque produit sont affichés avant la
              commande, les allergènes en gras dans la liste (règlement (UE) n° 1169/2011,
              art. 9, 14, 21 et 44). Les produits, leurs compositions et leurs origines sont
              des exemples. Les prix sont TTC et d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
            <p>Les dates de dégustation sont de vrais samedis ; les séances complètes sont un exemple.</p>
          </>
        }
      />
    </div>
  );
}
