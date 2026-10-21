import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Pignon sur Pré — site de démonstration",
  description: "Pignon sur Pré est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="pignon-sur-pre"
        entreprise="Pignon sur Pré"
        polices="Newsreader et DM Sans"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société qui loue les tentes, son adresse,
              son numéro SIRET et son assureur. Ici, tout est exemple : SIRET {entreprise.siret},
              12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Le nombre d&apos;invités de chaque tente est présenté comme la capacité du fabricant,
              en exemple : le site n&apos;en calcule aucune. La vue du ciel est dessinée pour la
              démonstration ; un vrai site afficherait la photo aérienne de l&apos;IGN, en citant sa
              source. L&apos;adresse tapée reste dans le navigateur : elle n&apos;est ni envoyée ni
              enregistrée. Les prix sont TTC, pour des particuliers, et sont des exemples.
            </p>
            <p>
              Une tente qui reçoit du public (un bal, une fête de village) ne se monte pas sans
              l&apos;autorisation de la mairie, et occuper une place publique demande un titre
              (Code général de la propriété des personnes publiques, art. L2122-1). Le bal présenté
              est un exemple ; aucune buvette n&apos;y est annoncée. Les samedis « pris » sont un
              exemple ; aucun avis, aucune note n&apos;est affiché.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Camper Overnight » de la bibliothèque
              MotionSites, transposé à un loueur de tentes ; la vue du ciel, le logo et les
              silhouettes de tentes sont dessinés.
            </p>
          </>
        }
      />
    </div>
  );
}
