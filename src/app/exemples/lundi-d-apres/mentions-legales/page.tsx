import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Lundi d'Après — site de démonstration",
  description: "Lundi d'Après est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="lundi-d-apres"
        entreprise="Lundi d'Après"
        polices="Outfit et Inter"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société de l&apos;agence, son adresse et son
              numéro SIRET. Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de
              l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les clients de l&apos;agence sont des entreprises : les prix sont affichés hors taxes,
              par personne, et sont des exemples.
            </p>
            <p>
              Les phrases montrées (« On refait ça quand ? » et les autres) sont inventées pour la
              démonstration et marquées « exemple ». Sur un vrai site, la rubrique « la phrase du
              lundi » ne publierait que des phrases réellement entendues, avec l&apos;accord écrit de
              l&apos;entreprise cliente et de la personne si elle est reconnaissable : une phrase
              inventée serait un faux témoignage (Code de la consommation, art. L. 121-4, 28°), et
              les mots d&apos;une personne relèvent de sa vie privée (Code civil, art. 9). Aucun avis,
              aucune note n&apos;est affiché.
            </p>
            <p>
              La phrase écrite dans l&apos;outil « Construire la soirée » ne quitte pas le
              navigateur : la soirée est construite sur place, à partir de mots-clés.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Playful Idea » de la bibliothèque
              MotionSites, transposé à une agence d&apos;événements d&apos;entreprise ; la tasse et les
              bulles sont dessinées.
            </p>
          </>
        }
      />
    </div>
  );
}
