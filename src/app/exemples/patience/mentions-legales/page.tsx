import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Patience, site de démonstration",
  description: "Patience est une fromagerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/patience/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="patience"
        entreprise="Patience"
        polices="Playfair Display et DM Sans"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie fromagerie, ici avec des valeurs
              d&apos;exemple : Patience, SIRET 000 000 000 00000 (exemple),{" "}
              {boutique.adresse} (adresse fictive). Le téléphone {boutique.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              L&apos;âge des fromages est calculé dans ton navigateur à partir de dates
              d&apos;entrée en cave d&apos;exemple. Une vraie fromagerie n&apos;affiche que
              l&apos;âge réel : un âge inventé tromperait sur une qualité essentielle du
              produit. La date « prête le 14 avril » est une fin d&apos;affinage prévue, pas
              une offre limitée. Les trente meules et celles déjà réservées sont un exemple.
              Le lait et son traitement sont indiqués, et l&apos;allergène (lait) avant la
              réservation (règlement (UE) n° 1169/2011, art. 14 et 44). Prix TTC
              d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
          </>
        }
      />
    </div>
  );
}
