import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Et s'il pleut, site de démonstration",
  description: "Et s'il pleut est une wedding planner fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="À savoir" titre="Une wedding planner *qui n'existe pas.*" />
      <MentionsDemonstration
        site="et-s-il-pleut"
        entreprise="Et s'il pleut"
        polices="Bodoni Moda et Outfit"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des wedding planners : « Créer une marque » (le plan B
              prévu, chiffré, réservé ; chaque mariage en deux versions ; les cent parapluies jaunes)
              et « Remplir l&apos;agenda » (une seule question sur l&apos;accueil, « tu te maries quand ? »,
              et le rétroplanning ; le prix sur l&apos;accueil ; les coulisses plutôt que les couchers de
              soleil).
            </p>
            <p>
              Les prix sont des exemples, toutes taxes comprises, affichés pour des particuliers
              (arrêté du 17 mars 2015). Le plan B figure au devis d&apos;exemple, ligne par ligne :
              l&apos;annoncer sans le chiffrer serait trompeur. Le rétroplanning est un ordre courant,
              pas une règle ; il se calcule dans le navigateur à partir de la date du jour, sans
              fausse urgence.
            </p>
            <p>
              L&apos;affiche dit « Et s&apos;il pleut ? C&apos;est prévu. » : une promesse de méthode. Aucun
              « il a plu, c&apos;était parfait », aucun avis, aucune note, aucun nombre de mariages : une
              marque qui se lance n&apos;en a pas encore (Code de la consommation, art. L121-2). Aucune
              photo ne montre de mariés ni d&apos;invités (Code civil, art. 9). L&apos;épisode des coulisses
              est un exemple écrit pour la démonstration : aucun vrai mariage, aucun prestataire
              nommé. La date du 11 septembre 2027 et les prénoms des parapluies sont des exemples.
            </p>
            <p>
              L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une tranche que
              l&apos;ARCEP réserve aux œuvres de fiction. Rien de ce qui est saisi sur ce site n&apos;est
              envoyé.
            </p>
          </>
        }
      />
    </main>
  );
}
