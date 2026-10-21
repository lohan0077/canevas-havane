import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Le Veilleur, site de démonstration",
  description:
    "Le Veilleur est une conciergerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/le-veilleur/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="le-veilleur"
        entreprise="Le Veilleur"
        polices="Instrument Serif et Manrope"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres à une conciergerie qui loue
              pour des propriétaires. Ici, ce sont des exemples : carte professionnelle mention
              « Gestion immobilière », n° CPI 0000 0000 000 000 000, délivrée par la CCI territoriale
              de l&apos;Exemple ; garantie financière : garant d&apos;exemple, 1 place de l&apos;Exemple,
              69000 Lyon ; assurance de responsabilité civile professionnelle auprès d&apos;un assureur
              d&apos;exemple ; médiateur de la consommation d&apos;exemple, ses coordonnées et
              l&apos;adresse de son site.
            </p>
            <p>
              Les textes qui fondent ces mentions : loi n° 70-9 du 2 janvier 1970, art. 1er, 3 et 14 ;
              décret n° 72-678 du 20 juillet 1972, art. 1er et 92 ; arrêté du 10 janvier 2017 relatif
              à l&apos;information des consommateurs, art. 2 (le barème, ses prix maximums TTC et qui
              les paie) ; code de la consommation, art. R616-1 (le médiateur). Le barème, le bilan du
              lundi et le relevé sont des exemples : sur un vrai site, ils doivent être exacts. Aucun
              logement n&apos;est montré ni situé, et les photos sont des illustrations. Le numéro de
              téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </div>
  );
}
