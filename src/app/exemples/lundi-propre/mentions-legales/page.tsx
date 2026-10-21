import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Lundi Propre — site de démonstration",
  description: "Lundi Propre est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/lundi-propre/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="lundi-propre"
      entreprise="Lundi Propre"
      polices="Unbounded et Inter"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro SIRET.
            Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de l'Exemple, 00000
            Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
            l'ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            <strong>Prix.</strong> Le site s'adresse à des professionnels : les prix sont affichés
            hors taxes, et le site le dit. Ce sont des exemples ; le prix ferme vient au devis, après
            visite.
          </p>
          <p>
            <strong>Le rapport de passage.</strong> Il contient des informations sur le travail des
            agents (heures d'arrivée et de départ) : chaque salarié en est informé avant sa mise en
            place (Code du travail, art. L1222-4), et le comité social et économique est consulté
            quand l'entreprise en a un (art. L2312-38). Le rapport ne nomme aucun agent : « {entreprise.equipe} ».
            Les rapports affichés sont des exemples.
          </p>
          <p>
            Le premier écran s'inspire du modèle « Go On, White » de la bibliothèque MotionSites,
            transposé à une entreprise de nettoyage de bureaux.
          </p>
        </>
      }
    />
  );
}
