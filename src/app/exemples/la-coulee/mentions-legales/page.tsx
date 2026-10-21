import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { CONTACT } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La Coulée — site de démonstration",
  description: "La Coulée est une savonnerie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/la-coulee/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="la-coulee"
        entreprise="La Coulée"
        polices="Space Grotesk et Newsreader"
        enPlus={
          <>
            <p>
              Ce qu&apos;une vraie savonnerie doit avoir fait avant le premier savon vendu, et qu&apos;elle indiquerait ici
              avec ses vrais numéros : une personne responsable établie dans l&apos;Union (règlement (CE) n° 1223/2009,
              art. 4) ; un rapport sur la sécurité de chaque produit, signé par l&apos;évaluateur (art. 10) ; la
              notification de chaque produit sur le portail européen CPNP (art. 13) ; la déclaration de l&apos;atelier
              auprès de la DGCCRF (code de la santé publique, art. L5131-2). Personne responsable fictive : La Coulée,
              12 rue de l&apos;Exemple · exemple. SIRET 000 000 000 00000 · exemple.
            </p>
            <p>
              Les étiquettes montrées suivent l&apos;article 19 du règlement : contenu, date de durabilité minimale,
              numéro de lot, fonction, précautions, liste des ingrédients précédée de « Ingredients ». Les lots, les
              dates, les quantités, les listes d&apos;ingrédients et les prix sont des exemples. Aucune allégation sur
              la peau n&apos;est faite (art. 20 ; règlement (UE) n° 655/2013). Le numéro {CONTACT.telephone} appartient
              à la tranche que l&apos;ARCEP réserve à la fiction ; l&apos;adresse est inventée.
            </p>
            <p>
              Premier écran inspiré du modèle « Nature Ritual » de la bibliothèque MotionSites, transposé à une
              savonnerie.
            </p>
          </>
        }
      />
    </main>
  );
}
