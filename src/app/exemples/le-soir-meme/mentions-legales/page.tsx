import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Le Soir Même, site de démonstration",
  description: "Le Soir Même est une agence immobilière fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/le-soir-meme/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <>
      <div className="-mt-[72px] bg-[var(--sombre)] pt-[72px]" />
      <MentionsDemonstration
        site="le-soir-meme"
        entreprise="Le Soir Même"
        polices="Instrument Serif et DM Sans"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux agents immobiliers. Ici,
              elles sont des exemples : carte professionnelle « Transactions sur immeubles et fonds de
              commerce » n° CPI 0000 0000 0000 0000, délivrée par la CCI de Ville-Exemple ; garantie
              financière apportée par un garant d&apos;exemple, dont le nom et l&apos;adresse sont indiqués ;
              assurance de responsabilité civile professionnelle auprès d&apos;un assureur d&apos;exemple ;
              médiateur de la consommation d&apos;exemple (loi n° 70-9 du 2 janvier 1970 ; décret
              n° 72-678 du 20 juillet 1972, art. 92 à 94).
            </p>
            <p>
              Le barème d&apos;honoraires est affiché en page d&apos;accueil et accessible depuis chaque
              annonce (arrêté du 10 janvier 2017, art. 2) ; les annonces donnent le prix honoraires
              inclus en plus gros, le prix hors honoraires, les honoraires en pourcentage et qui les
              paie (art. 3), les classes énergie et climat et les dépenses d&apos;énergie estimées (code de
              la construction et de l&apos;habitation, art. L126-33). Barème, annonces, visites et comptes
              rendus sont des exemples ; les annonces ne donnent aucune adresse. Le téléphone affiché
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Inspiration : le modèle « Sky Estate » de MotionSites (une maison au crépuscule, une barre
              de navigation en pilule, un très grand titre), transposé sans texte ni code repris.
            </p>
          </>
        }
      />
    </>
  );
}
