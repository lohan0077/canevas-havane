import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Cinquante Minutes, site de démonstration",
  description: "Cinquante Minutes est un cabinet de psychologue fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="cinquante-minutes"
      entreprise="Cinquante Minutes"
      polices="Bodoni Moda et Work Sans"
      enPlus={
        <>
          <p>
            La psychologue, {cabinet.psychologue}, n&apos;existe pas. Le titre de psychologue est
            protégé (loi n° 85-772 du 25 juillet 1985, art. 44) : il est affiché, plus gros que
            le nom de la marque, avec le diplôme et le numéro ADELI {cabinet.adeli}, qui sont
            des exemples.
          </p>
          <p>
            L&apos;horloge décrit un déroulé de séance, pas un résultat. Aucun témoignage, aucune
            note, aucune promesse thérapeutique ; la prise de rendez-vous ne demande aucun motif
            de consultation. La soirée porte ouverte porte une vraie date mais n&apos;aura pas
            lieu : le cabinet est fictif.
          </p>
          <p>
            Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
            œuvres de fiction. Les numéros d&apos;urgence affichés sont réels : le 15 (SAMU) et le
            3114 (numéro national de prévention du suicide).
          </p>
          <p>
            La mise en page du premier écran s&apos;inspire du modèle « Rare Gallery » de la
            bibliothèque MotionSites, transposé à un cabinet de psychologue.
          </p>
        </>
      }
    />
  );
}
