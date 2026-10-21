import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Autographe, site de démonstration",
  description: "Autographe est une épicerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/autographe/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="autographe"
        entreprise="Autographe"
        polices="Bodoni Moda et Newsreader"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie épicerie, ici avec des valeurs
              d&apos;exemple : Autographe, SIRET 000 000 000 00000 (exemple),{" "}
              {boutique.adresse} (adresse fictive). Le téléphone {boutique.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les auteurs (Hélène, Joseph, Lina, Anouk, Paul, Mathilde), leurs lieux, leurs
              pots et leurs signatures sont inventés. Une vraie épicerie qui reprend
              l&apos;idée publie le nom d&apos;un producteur avec son accord écrit, et
              n&apos;attribue à personne un produit qu&apos;il n&apos;a pas fait.
            </p>
            <p>
              Étiquetage : la collerette « Autographe » s&apos;ajoute à l&apos;étiquette du
              producteur sans la modifier (règlement (UE) n° 1169/2011, art. 8). Pour
              chaque pot mis de côté en ligne, la dénomination, le poids, les ingrédients et
              les allergènes sont affichés avant la réservation, les allergènes en gras
              (même règlement, art. 9, 14 et 21) ; l&apos;origine du miel est indiquée
              (décret n° 2003-587), comme la quantité de fruits et de sucres des confitures
              (décret n° 85-872). Prix TTC d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
          </>
        }
      />
    </div>
  );
}
