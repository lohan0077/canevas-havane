import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Patience, site de démonstration",
  description: "Patience est une fromagerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/patience/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Site de démonstration" titre="Ce qui est *inventé.*" balise="p" />
      <MentionsDemonstration
        site="patience"
        entreprise="Patience"
        polices="Playfair Display et DM Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des fromagers : « Créer une marque » (l&apos;âge de chaque
              fromage en jours, la meule réservée six mois à l&apos;avance, le jour de la découpe) et
              « Remplir le carnet de commandes » (« vous êtes combien ? », la carte de chaque fromage,
              une page par occasion, le retrait du samedi matin).
            </p>
            <p>
              Mentions qu&apos;afficherait la vraie fromagerie, ici avec des valeurs d&apos;exemple :
              Patience, SIRET 000 000 000 00000 (exemple), {boutique.adresse}, {boutique.ville}{" "}
              (adresse fictive). Le téléphone {boutique.telephone} appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les fromages, leurs producteurs (Bastien, Yves, Madeleine, Lucie, Hugo, Sarah et Jean),
              leurs distances, leurs dates d&apos;entrée en cave et leurs prix sont inventés.
              L&apos;âge est calculé dans ton navigateur à partir de ces dates : une vraie fromagerie
              n&apos;affiche que l&apos;âge réel, un âge inventé tromperait sur une qualité essentielle du
              produit. La date « prête le 14 avril » est une fin d&apos;affinage prévue, pas une offre
              limitée ; les trente meules et celles déjà réservées sont un exemple.
            </p>
            <p>
              Patience affine elle-même ses fromages, dans sa cave : les cartes disent « son atelier »
              et n&apos;emploient aucun qualificatif laissant entendre une origine fermière (décret
              n° 2007-628, art. 9-1). Le traitement du lait (cru, thermisé) est indiqué pour chaque
              fromage (même décret, art. 14 et 20), et le lait, allergène, avant toute commande ou
              réservation (règlement (UE) n° 1169/2011, art. 14 et 44). Retrait en boutique
              uniquement ; prix TTC d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
          </>
        }
      />
    </main>
  );
}
