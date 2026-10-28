import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { agence } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nouvelles du Jour — site de démonstration",
  description: "Nouvelles du Jour est une entreprise d'aide à domicile fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/nouvelles-du-jour/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="nouvelles-du-jour"
      entreprise="Nouvelles du Jour"
      polices="Fraunces et Figtree"
      enPlus={
        <>
          <p>
            Comme l&apos;exige l&apos;arrêté du 17 mars 2015 relatif à l&apos;information préalable du
            consommateur sur les prestations de services à la personne, les prix sont affichés
            hors taxes et toutes taxes comprises (art. 4) ; la mention de l&apos;avantage fiscal est
            détachée du prix et écrite plus petit (art. 5) ; la phrase sur le devis gratuit est
            reproduite mot pour mot (art. 6). Le crédit d&apos;impôt de 50 % est celui de
            l&apos;article 199 sexdecies du code général des impôts, sous conditions. Les prix sont
            des exemples ; le taux de TVA implicite (10 %) dépend des activités.
          </p>
          <p>
            Ménage et courses relèvent de la simple déclaration ; l&apos;aide aux gestes du quotidien
            d&apos;une personne âgée exige une autorisation du département (code du travail,
            art. D7231-1) : le site le dit, et l&apos;entreprise imaginée ne la propose pas. Le
            numéro de déclaration ({agence.declaration}), le SIRET ({agence.siret}), l&apos;adresse et
            le numéro {agence.telephone}, pris dans une tranche que l&apos;ARCEP réserve aux œuvres
            de fiction, sont des exemples. « Jeanne » et « Paul » sont des prénoms d&apos;exemple ;
            le message à la famille part avec l&apos;accord de la personne aidée et ne contient
            aucune donnée de santé. Aucune ancienneté n&apos;est affichée.
          </p>
          <p>
            Le devis fonctionne dans le navigateur : rien n&apos;est envoyé. La mise en page
            s&apos;inspire du modèle « Mindful Companion » de la bibliothèque MotionSites,
            transposé à une entreprise d&apos;aide à domicile.
          </p>
        </>
      }
    />
  );
}
