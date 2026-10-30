import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Sept Mille Dîners, site de démonstration",
  description: "Sept Mille Dîners est une marque de cuisines fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="pt-24">
      <MentionsDemonstration
        site="sept-mille-diners"
        entreprise="Sept Mille Dîners"
        polices="Playfair Display et Figtree"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des cuisinistes : « Créer une marque » (le nom, les trois
              questions sur ta vie et le plan qui va avec, le premier dîner) et « Remplir l&apos;agenda » (la
              longueur de tes murs qui dessine ta cuisine avec une fourchette pose comprise, le guide pour
              choisir son cuisiniste, la pose filmée en accéléré). Il remplace le site « Jusqu&apos;au Café »,
              qui montrait la seconde.
            </p>
            <p>
              « 7 300 dîners » est un calcul (vingt ans de 365 soirs), dit comme tel : ce n&apos;est pas une
              durée de vie annoncée pour une cuisine.
            </p>
            <p>
              Le premier dîner est présenté comme offert sans condition : il n&apos;est compté dans aucun prix,
              la cuisine coûte la même chose sans lui, et rien d&apos;autre n&apos;est à payer pour l&apos;avoir. Le
              chef à domicile « déclaré et assuré » est un exemple ; une vraie marque vérifierait ses
              obligations d&apos;hygiène et d&apos;assurance avant de proposer ce dîner.
            </p>
            <p>
              Les prix sont des fourchettes TTC d&apos;exemple, pose comprise, hors électroménager : le prix
              ferme vient au devis, après la prise de cotes. Le guide ne nomme, ne compare et ne dénigre
              aucun professionnel ; aucune enseigne d&apos;ameublement n&apos;est citée. Les poses ne seraient
              filmées qu&apos;avec l&apos;accord écrit du client, sans rien montrer de chez lui. Les créneaux
              « pris » le sont pour l&apos;exemple ; Mathieu, qui prend les cotes, n&apos;existe pas.
            </p>
            <p>
              L&apos;adresse, {maison.adresse}, {maison.ville}, est une adresse d&apos;exemple ; le numéro{" "}
              {maison.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
