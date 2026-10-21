import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Sans Soupir — site de démonstration",
  description: "Sans Soupir est une marque d'assistance informatique fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/sans-soupir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="sans-soupir"
      entreprise="Sans Soupir"
      polices="Sora et Figtree"
      enPlus={
        <>
          <p>
            Le crédit d&apos;impôt n&apos;est présenté que pour ce qui peut y ouvrir droit :
            l&apos;installation, la maintenance des logiciels et les cours, à domicile, par une
            entreprise déclarée services à la personne dont c&apos;est l&apos;activité principale
            (Code du travail, art. D7231-1, L7232-1-2 et D7233-5). Le dépannage, la
            réparation et l&apos;aide à distance en sont exclus, et le site le dit. L&apos;avantage
            fiscal n&apos;est jamais accolé à un prix.
          </p>
          <p>
            Les prix sont des exemples, affichés hors taxes et toutes taxes comprises (arrêté du
            17 mars 2015, art. 4). La déclaration n° {entreprise.declarationSap} est un numéro
            d&apos;exemple. « On répète, sans soupirer » décrit une manière de faire : aucune
            exclusivité n&apos;est revendiquée. Le goûter numérique, sa date et son lieu sont des
            exemples ; la fiche « Appeler Léa en vidéo » ne nomme aucune application.
          </p>
          <p>
            L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une tranche
            que l&apos;ARCEP réserve aux œuvres de fiction. La page d&apos;accueil s&apos;inspire du
            modèle « Mindora » de la bibliothèque MotionSites, transposé à l&apos;assistance
            informatique.
          </p>
        </>
      }
    />
  );
}
