import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Dimanche Libre — site de démonstration",
  description: "Dimanche Libre est une entreprise d'informatique à domicile fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/dimanche-libre/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="dimanche-libre"
      entreprise="Dimanche Libre"
      polices="Bricolage Grotesque et DM Sans"
      enPlus={
        <>
          <p>
            Le crédit d&apos;impôt n&apos;est présenté que pour ce qui peut y ouvrir droit :
            l&apos;installation, la maintenance des logiciels et les cours, à domicile, par une
            entreprise déclarée services à la personne (Code du travail, art. D7231-1 ; CGI,
            art. 199 sexdecies), dans la limite de 3 000 € de dépenses par an (art. D7233-5).
            Le dépannage, la réparation, la vente et l&apos;aide à distance en sont exclus, et
            le site le dit sur chaque page qui en parle. L&apos;avantage fiscal n&apos;est jamais
            accolé à un prix.
          </p>
          <p>
            Les prix sont des exemples, affichés hors taxes et toutes taxes comprises (arrêté
            du 17 mars 2015, art. 4). La déclaration n° {entreprise.declarationSap} est un
            numéro d&apos;exemple. Aucune exclusivité n&apos;est revendiquée.
          </p>
          <p>
            L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une tranche
            que l&apos;ARCEP réserve aux œuvres de fiction. La mise en page s&apos;inspire du modèle
            « Playful Idea » de la bibliothèque MotionSites, transposé à l&apos;informatique à
            domicile.
          </p>
        </>
      }
    />
  );
}
