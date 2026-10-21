import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { marque } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Reviens. — site de démonstration",
  description: "Reviens. est une marque d'outillage fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/reviens/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="reviens"
      entreprise="Reviens."
      polices="Outfit et Work Sans"
      enPlus={
        <>
          <p>
            Comme le ferait une vraie boutique en ligne, ce site affiche une adresse ({marque.adresse}), un
            numéro SIRET ({marque.siret}) et un téléphone ({marque.telephone}) : trois mentions d&apos;exemple.
            Le numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Les prix sont affichés toutes taxes comprises, gravure comprise, et marqués « exemple ». Un
            outil gravé au prénom de l&apos;acheteur est un bien personnalisé : il est exclu du droit de
            rétractation (code de la consommation, art. L221-28, 3°), ce que la page de commande dit
            avant le bouton ; les garanties légales de conformité et des vices cachés s&apos;appliquent.
          </p>
          <p>
            Aucune marque réelle n&apos;est nommée ni montrée : les outils sont dessinés, sans logo. La
            journée gravure est gratuite et sans obligation d&apos;achat ; graver l&apos;outil d&apos;un
            autre fabricant peut toucher à sa garantie, et la page demande de le vérifier. L&apos;affiche
            n&apos;est posée que dans les dépôts qui l&apos;acceptent. Les prénoms sont inventés.
          </p>
          <p>
            L&apos;ouverture de la page d&apos;accueil s&apos;inspire du modèle « Future Machine » de la
            bibliothèque MotionSites, transposé à un outil gravé.
          </p>
        </>
      }
    />
  );
}
