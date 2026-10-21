import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { PHRASE_L612_14, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Sans Histoire — site de démonstration",
  description: "Sans Histoire est une société de sécurité privée fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/sans-histoire/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="sans-histoire"
        entreprise="Sans Histoire"
        polices="Newsreader et Space Grotesk"
        enPlus={
          <>
            <p>
              Comme tout document d&apos;une entreprise de sécurité privée, chaque page de ce site
              reproduit l&apos;identification de l&apos;autorisation d&apos;exercer et la phrase de
              l&apos;article L612-14 du Code de la sécurité intérieure (art. L612-15, al. 1) :
              autorisation d&apos;exercer délivrée par le CNAPS n° {entreprise.autorisation}, un
              numéro d&apos;exemple, et « {PHRASE_L612_14} » Le devis et le rapport de nuit les
              portent aussi.
            </p>
            <p>
              La dénomination est toujours suivie de « Sécurité privée », pour faire ressortir
              qu&apos;il s&apos;agit d&apos;une entreprise privée (art. L612-3). Aucun dirigeant ni
              agent n&apos;est présenté par un ancien métier (art. L612-15, al. 2), et rien dans
              le logo, les couleurs ou les mots ne rappelle un service de police (art. R631-12).
              Les prix sont des exemples, HT pour les professionnels et TTC pour les particuliers.
            </p>
            <p>
              L&apos;adresse est fictive. Le numéro {entreprise.telephone} appartient à une tranche
              que l&apos;ARCEP réserve aux œuvres de fiction. La mise en page s&apos;inspire du modèle
              « TrustFlow » de la bibliothèque MotionSites, transposé au gardiennage.
            </p>
          </>
        }
      />
    </div>
  );
}
