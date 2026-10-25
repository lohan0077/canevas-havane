import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Pignon sur Pré — site de démonstration",
  description: "Pignon sur Pré est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="Ce qui est inventé, *ce qui est vrai.*" niveau="p" />
      <MentionsDemonstration
        site="pignon-sur-pre"
        entreprise="Pignon sur Pré"
        polices="Fraunces et Figtree"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société qui loue les tentes et les engins, son adresse,
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
              <strong>Les engins.</strong> Profondeur de fouille, largeur, charge utile : toujours la
              capacité du fabricant, jamais un calcul du site. Les durées (« une journée suffit »)
              sont des estimations d&apos;exemple, avec leur hypothèse écrite. Creuser oblige à
              déclarer les travaux aux exploitants de réseaux (DT-DICT), particuliers compris : le
              site le dit avant le bouton de réservation et renvoie au téléservice officiel
              « Réseaux et canalisations ». Les conditions de conduite (âge, assurance) relèvent du
              contrat de location, en exemple.
            </p>
            <p>
              Ce site réunit les deux vidéos des loueurs : « Créer une marque » (le nom Pignon sur
              Pré, la tente posée sur la vue du ciel, le mot pour les voisins, le bal) et
              « Remplir l&apos;agenda » (une seule question, « tu veux faire quoi ? », l&apos;option
              avec chauffeur, les vraies disponibilités réservables en ligne). Les deux sites de
              démonstration d&apos;origine n&apos;en font plus qu&apos;un. La vue du ciel, le logo et
              les pictogrammes des projets sont dessinés.
            </p>
          </>
        }
      />
    </main>
  );
}
