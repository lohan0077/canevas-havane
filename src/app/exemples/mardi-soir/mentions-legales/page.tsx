import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Mardi Soir, site de démonstration",
  description: "Mardi Soir est un cabinet de diététique fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/mardi-soir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="mardi-soir"
      entreprise="Mardi Soir"
      polices="Young Serif et DM Sans"
      enPlus={
        <>
          <p>
            La diététicienne, {cabinet.dieteticienne}, n&apos;existe pas. « Diététicien » est un
            titre protégé (code de la santé publique, art. L4371-2 ; usage sans droit puni, art.
            L4372-2) : il est affiché avec le diplôme et le numéro ADELI {cabinet.adeli}, qui sont
            des exemples.
          </p>
          <p>
            Aucune donnée de santé n&apos;est demandée : ni poids, ni objectif, ni motif. La photo
            du frigo n&apos;est jamais envoyée au site — le visiteur la montre en séance, sur son
            téléphone. Aucun conseil nutritionnel, aucun kilo promis, aucun « avant / après »,
            aucun témoignage.
          </p>
          <p>
            Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
            œuvres de fiction. L&apos;adresse est inventée.
          </p>
          <p>
            La mise en page du premier écran s&apos;inspire du modèle « Evergreen Finance » de la
            bibliothèque MotionSites, transposé à un cabinet de diététique.
          </p>
        </>
      }
    />
  );
}
