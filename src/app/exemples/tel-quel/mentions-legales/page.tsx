import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Tel Quel, site de démonstration",
  description:
    "Tel Quel est une conciergerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/tel-quel/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="tel-quel"
      entreprise="Tel Quel"
      polices="DM Serif Display et Work Sans"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions propres à une conciergerie qui loue pour
            des propriétaires. Ici, ce sont des exemples : carte professionnelle mention « Gestion
            immobilière », n° CPI 0000 0000 000 000 000, délivrée par la CCI territoriale de
            l&apos;Exemple ; garantie financière : garant d&apos;exemple, 5 cours de l&apos;Exemple,
            33000 Bordeaux ; assurance de responsabilité civile professionnelle auprès d&apos;un
            assureur d&apos;exemple ; médiateur de la consommation d&apos;exemple, ses coordonnées et
            l&apos;adresse de son site.
          </p>
          <p>
            Les textes qui fondent ces mentions : loi n° 70-9 du 2 janvier 1970, art. 1er et 3 ;
            décret n° 72-678 du 20 juillet 1972, art. 1er et 92 ; arrêté du 10 janvier 2017, art. 2
            (le barème) ; code de la consommation, art. R616-1 (le médiateur). « Remis tel quel » est
            un engagement de méthode, écrit dans le mandat, et non la promesse que rien ne sera
            abîmé. Les photos avant et après sont une seule photo d&apos;illustration utilisée deux
            fois ; aucun logement n&apos;est montré ni situé, aucune date de séjour n&apos;est publiée.
            Le numéro de téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres
            de fiction.
          </p>
        </>
      }
    />
  );
}
