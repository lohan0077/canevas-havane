import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Lundi d'Après, site de démonstration",
  description: "Lundi d'Après est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="ce qui est inventé, *ce qui est vrai.*" niveau="p" />
      <MentionsDemonstration
        site="lundi-d-apres"
        entreprise="Lundi d'Après"
        polices="DM Sans et Inter"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société de l&apos;agence, son adresse et son numéro SIRET. Ici, tout est
              exemple : SIRET {entreprise.siret}, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              <strong>Prix.</strong> Pour les entreprises, clients professionnels, les prix sont affichés hors taxes, par
              personne ; pour les mariages, ils sont TTC. Tous sont des exemples. L&apos;heure de fin d&apos;une soirée est
              toujours dite « selon la salle » : c&apos;est le règlement de la salle et les règles locales sur le bruit qui la
              fixent, pas le DJ.
            </p>
            <p>
              <strong>Les phrases.</strong> Les phrases montrées (« On refait ça quand ? », « On ne savait pas que la
              compta chantait aussi bien. » et les autres) sont inventées pour la démonstration et marquées « exemple ». Sur un vrai site, la rubrique « la
              phrase du lundi » ne publierait que des phrases réellement entendues, avec l&apos;accord écrit de l&apos;entreprise
              cliente ou des mariés, et de la personne si elle est reconnaissable : une phrase inventée serait un faux
              témoignage (Code de la consommation, art. L. 121-4, 28°), et les mots d&apos;une personne relèvent de sa vie
              privée (Code civil, art. 9). Aucun avis, aucune note n&apos;est affiché.
            </p>
            <p>
              <strong>Les samedis.</strong> Les samedis « pris » sont un exemple ; aucune case ne bascule toute seule, il
              n&apos;y a ni « dernière date » ni compte à rebours (Code de la consommation, art. L. 121-4, 7°). La phrase écrite
              dans « Construire la soirée » et la chanson notée ne quittent pas le navigateur.
            </p>
            <p>
              Ce site réunit les deux vidéos de l&apos;événementiel : « Créer une marque » (le nom Lundi d&apos;Après, la question
              « lundi, vos équipes diront quoi ? », la soirée construite à l&apos;envers, la phrase du lundi, les croissants du
              lancement) et « Remplir l&apos;agenda » (le DJ de mariage : la chanson interdite, la page honnête « DJ ou
              playlist ? », les samedis encore libres sur chaque page, la date bloquée en ligne). Les deux sites de
              démonstration d&apos;origine n&apos;en font plus qu&apos;un.
            </p>
          </>
        }
      />
    </main>
  );
}
