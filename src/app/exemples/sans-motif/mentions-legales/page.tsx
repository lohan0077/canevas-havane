import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Sans Motif, site de démonstration",
  description: "Sans Motif est un cabinet de psychologue fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/sans-motif/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="sans-motif"
      entreprise="Sans Motif"
      polices="Sora et Inter"
      enPlus={
        <>
          <p>
            La psychologue, {cabinet.psychologue}, n&apos;existe pas. Le titre de psychologue est
            protégé (loi n° 85-772 du 25 juillet 1985, art. 44) : il est affiché avec le diplôme
            et le numéro ADELI, ici {cabinet.adeli}, qui sont des exemples. Le partenariat
            « Mon soutien psy » est donné en exemple : sur un vrai site, il ne s&apos;écrit que
            si la psychologue a signé la convention avec l&apos;Assurance Maladie.
          </p>
          <p>
            Aucune donnée de santé n&apos;est demandée : la prise de rendez-vous ne pose aucune
            question sur ce qui vous amène. Aucun témoignage, aucune note, aucune promesse de
            résultat. Les numéros d&apos;urgence affichés sont réels : le 15 (SAMU) et le 3114
            (numéro national de prévention du suicide).
          </p>
          <p>
            Le téléphone du cabinet, {cabinet.telephone}, appartient à la tranche que l&apos;ARCEP
            réserve aux œuvres de fiction. L&apos;adresse est inventée.
          </p>
          <p>
            La mise en page du premier écran s&apos;inspire du modèle « Mindora » de la
            bibliothèque MotionSites, transposé à un cabinet de psychologue.
          </p>
        </>
      }
    />
  );
}
