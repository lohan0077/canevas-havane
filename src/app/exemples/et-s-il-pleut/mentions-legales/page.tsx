import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Et s'il pleut — site de démonstration",
  description: "Et s'il pleut est une wedding planner fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="et-s-il-pleut"
      entreprise="Et s'il pleut"
      polices="Bodoni Moda et Outfit"
      enPlus={
        <>
          <p>
            Les prix sont des exemples, toutes taxes comprises, affichés pour des particuliers
            (arrêté du 17 mars 2015). Le plan B figure au devis d&apos;exemple, ligne par ligne :
            l&apos;annoncer sans le chiffrer serait trompeur.
          </p>
          <p>
            L&apos;affiche dit « Et s&apos;il pleut ? C&apos;est prévu. » : une promesse de méthode.
            Aucun « il a plu, c&apos;était parfait », aucun avis, aucune note, aucun nombre de
            mariages : une marque qui se lance n&apos;en a pas encore (Code de la consommation,
            art. L121-2). Aucune photo ne montre de mariés ni d&apos;invités (Code civil, art. 9).
            La date du 11 septembre 2027 et les prénoms des parapluies sont des exemples, pas
            une prévision ni de vraies personnes.
          </p>
          <p>
            L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une
            tranche que l&apos;ARCEP réserve aux œuvres de fiction. L&apos;ouverture de l&apos;accueil
            s&apos;inspire du modèle « Vectrus Energy » de la bibliothèque MotionSites, transposé
            au mariage.
          </p>
        </>
      }
    />
  );
}
