import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Jusqu'au Café — site de démonstration",
  description: "Jusqu'au Café est un cuisiniste fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/jusqu-au-cafe/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="jusqu-au-cafe"
      entreprise="Jusqu'au Café"
      polices="Fraunces et Manrope"
      enPlus={
        <>
          <p>
            Les fourchettes de prix sont des fourchettes TTC d&apos;exemple, pose comprise, hors
            électroménager ; un vrai cuisiniste donne son prix ferme au devis, après la prise de cotes.
            Rien n&apos;est dit « gratuit » : les réglages des portes et tiroirs sont compris dans le prix.
          </p>
          <p>
            Le guide « Comment choisir un bon cuisiniste » ne nomme, ne compare et ne dénigre aucun
            concurrent, et aucune enseigne d&apos;ameublement n&apos;est citée sur ce site. Les poses
            filmées ne le seraient qu&apos;avec l&apos;accord écrit du client, sans rien montrer de chez lui.
          </p>
          <p>
            L&apos;adresse ({atelier.adresse}) et le numéro SIRET ({atelier.siret}) sont des exemples ; le
            numéro {atelier.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de
            fiction. Mathieu est un prénom d&apos;exemple. La mise en page s&apos;inspire du modèle
            « Interior Features » de la bibliothèque MotionSites, transposé à un cuisiniste.
          </p>
        </>
      }
    />
  );
}
