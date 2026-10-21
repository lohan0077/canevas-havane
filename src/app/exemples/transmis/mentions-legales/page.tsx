import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Transmis — site de démonstration",
  description: "Transmis est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/transmis/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="transmis"
        entreprise="Transmis"
        polices="Playfair Display, Work Sans et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société du traiteur, son adresse et son
              numéro SIRET. Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de
              l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction. Mamie Jo, Léa
              et les autres prénoms sont inventés.
            </p>
            <p>
              Les prix sont affichés par personne, toutes taxes comprises, et sont des exemples.
              Les allergènes sont indiqués plat par plat, parmi les quatorze de l&apos;annexe II du
              règlement (UE) n° 1169/2011, et les allergies sont demandées avant toute commande
              (pour des repas non préemballés, l&apos;information se donne par écrit : décret
              n° 2015-447). Aucune boisson alcoolisée n&apos;est proposée, ni utilisée dans une recette.
            </p>
            <p>
              La photo d&apos;une page de cahier choisie sur ce site s&apos;affiche dans le navigateur
              et n&apos;en sort pas. La carte de table ne dit que l&apos;histoire vraie de la famille ;
              les vidéos de la recette du mois ne montrent que des personnes qui ont donné leur
              accord écrit (Code civil, art. 9). Aucun avis, aucune note n&apos;est affiché.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Book Hero » de la bibliothèque MotionSites,
              transposé à des fiches de recettes de famille ; les fiches, la page de cahier et la
              carte de table sont dessinées.
            </p>
          </>
        }
      />
    </div>
  );
}
