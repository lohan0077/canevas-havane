import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Sept Mille Dîners — site de démonstration",
  description: "Sept Mille Dîners est une marque de cuisines fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="sept-mille-diners"
      entreprise="Sept Mille Dîners"
      polices="Playfair Display et Outfit"
      enPlus={
        <>
          <p>
            « 7 300 dîners » est un calcul (vingt ans de 365 soirs), dit comme tel sur le site : ce n&apos;est
            pas une durée de vie annoncée pour une cuisine.
          </p>
          <p>
            Le premier dîner est présenté comme offert sans condition : il n&apos;est compté dans aucun prix,
            la cuisine coûte la même chose sans lui, et rien d&apos;autre n&apos;est à payer pour l&apos;avoir. Le
            chef à domicile « déclaré et assuré » est un exemple ; une vraie marque vérifierait ses
            obligations d&apos;hygiène et d&apos;assurance avant de proposer ce dîner.
          </p>
          <p>
            Les prix sont des fourchettes TTC d&apos;exemple, pose comprise, hors électroménager. Aucune
            enseigne d&apos;ameublement n&apos;est citée. L&apos;adresse, {maison.adresse}, est une adresse
            d&apos;exemple ; le numéro {maison.telephone} appartient à une tranche que l&apos;ARCEP réserve aux
            œuvres de fiction. La mise en page s&apos;inspire du modèle « Kairo Studio » de la bibliothèque
            MotionSites, transposé à une marque de cuisines.
          </p>
        </>
      }
    />
  );
}
