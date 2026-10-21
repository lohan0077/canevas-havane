import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Le Grand Samedi — site de démonstration",
  description: "Le Grand Samedi est une wedding planner fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/le-grand-samedi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="le-grand-samedi"
      entreprise="Le Grand Samedi"
      polices="Instrument Serif et Work Sans"
      enPlus={
        <>
          <p>
            Les prix sont des exemples, toutes taxes comprises, affichés pour des particuliers
            (arrêté du 17 mars 2015). Aucun avis, aucune note, aucun témoignage, aucun nombre
            de mariages organisés : il n&apos;y en a pas, et ils ne s&apos;inventent pas.
          </p>
          <p>
            Les photos ne montrent aucun marié ni aucun invité : leurs images leur
            appartiennent (Code civil, art. 9). L&apos;épisode des coulisses est un exemple écrit
            pour la démonstration ; aucun vrai mariage n&apos;y est raconté, aucun prestataire
            n&apos;y est nommé. Le rétroplanning est un ordre courant, pas une règle, et il se
            calcule dans ton navigateur.
          </p>
          <p>
            L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une
            tranche que l&apos;ARCEP réserve aux œuvres de fiction. L&apos;ouverture de
            l&apos;accueil s&apos;inspire du modèle « Luxury Botanical » de la bibliothèque
            MotionSites, transposé au mariage.
          </p>
        </>
      }
    />
  );
}
