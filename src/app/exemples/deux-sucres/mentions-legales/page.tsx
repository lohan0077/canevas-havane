import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { agence } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Deux Sucres — site de démonstration",
  description: "Deux Sucres est une entreprise d'aide à domicile fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/deux-sucres/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="deux-sucres"
      entreprise="Deux Sucres"
      polices="Lora et Manrope"
      enPlus={
        <>
          <p>
            Comme l&apos;exige l&apos;arrêté du 17 mars 2015 relatif à l&apos;information préalable du
            consommateur sur les prestations de services à la personne, le prix est affiché hors
            taxes et toutes taxes comprises (art. 4), la mention de l&apos;avantage fiscal est
            détachée du prix et plus petite (art. 5), et la phrase sur le devis gratuit est
            reproduite mot pour mot (art. 6). Le crédit d&apos;impôt de 50 % est celui de l&apos;article
            199 sexdecies du code général des impôts, sous conditions. Prix d&apos;exemple.
          </p>
          <p>
            L&apos;entreprise imaginée fait le ménage et les courses ; l&apos;aide aux gestes du
            quotidien d&apos;une personne âgée exige une autorisation du département (code du
            travail, art. D7231-1), et le site le dit. « Nadia » et « Sophie » sont des prénoms
            d&apos;exemple, leurs portraits sont dessinés : sur un vrai site, photos et goûts ne
            seraient publiés qu&apos;avec l&apos;accord écrit de chacune. Aucune ancienneté n&apos;est
            affichée : la marque est créée de zéro. Les dates du café du premier mardi sont
            calculées le jour de la visite.
          </p>
          <p>
            Le numéro de déclaration ({agence.declaration}), le SIRET ({agence.siret}),
            l&apos;adresse et le numéro {agence.telephone}, pris dans une tranche que l&apos;ARCEP réserve
            aux œuvres de fiction, sont des exemples. Rien n&apos;est envoyé. La mise en page
            s&apos;inspire du modèle « Mindora » de la bibliothèque MotionSites, transposé à une
            entreprise d&apos;aide à domicile.
          </p>
        </>
      }
    />
  );
}
