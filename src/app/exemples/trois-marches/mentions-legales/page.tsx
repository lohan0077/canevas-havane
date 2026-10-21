import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Trois Marches, site de démonstration",
  description: "Trois Marches est une agence immobilière fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/trois-marches/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="trois-marches"
      entreprise="Trois Marches"
      polices="Bodoni Moda, Manrope et Caveat"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions propres aux agents immobiliers. Ici,
            elles sont des exemples : Trois Marches, 8 rue de l&apos;Exemple, 69000 Lyon ; carte
            professionnelle « Transactions sur immeubles et fonds de commerce » n° CPI 0000 0000 0000
            0000, délivrée par la CCI de Lyon ; garantie financière apportée par un garant d&apos;exemple,
            dont le nom et l&apos;adresse sont indiqués ; assurance de responsabilité civile
            professionnelle et médiateur de la consommation d&apos;exemple (loi n° 70-9 du 2 janvier
            1970 ; décret n° 72-678 du 20 juillet 1972, art. 92 à 94).
          </p>
          <p>
            Chaque annonce donne le prix honoraires inclus en plus gros, le prix hors honoraires, les
            honoraires en pourcentage et qui les paie, et renvoie au barème (arrêté du 10 janvier 2017,
            art. 2 et 3) ; elle porte les classes énergie et climat et les dépenses d&apos;énergie
            estimées (code de la construction et de l&apos;habitation, art. L126-33). Les maisons, leurs
            histoires, les prénoms et les prix sont des exemples ; aucune annonce ne donne
            d&apos;adresse. Sur un vrai site, chaque récit serait publié avec l&apos;accord écrit de ceux
            qui l&apos;ont écrit, et la dernière photo ne serait prise qu&apos;avec l&apos;accord écrit de
            chacun — des deux parents pour un enfant — et jamais publiée. Le téléphone affiché
            appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Inspiration : le modèle « Heritage Grove » de MotionSites (papier crème, gravure au trait,
            serif classique), transposé sans texte ni code repris. La gravure de la maison est
            dessinée pour ce site.
          </p>
        </>
      }
    />
  );
}
