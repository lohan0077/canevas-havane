import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { PHRASE_L612_14, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Veilleuse — site de démonstration",
  description: "Veilleuse est une marque de sécurité privée fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/veilleuse/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="veilleuse"
      entreprise="Veilleuse"
      polices="DM Serif Display et Manrope"
      enPlus={
        <>
          <p>
            Comme tout document d&apos;une entreprise de sécurité privée, chaque page de ce site,
            l&apos;espace client et l&apos;affiche reproduisent l&apos;identification de
            l&apos;autorisation d&apos;exercer et la phrase de l&apos;article L612-14 du Code de la
            sécurité intérieure (art. L612-15, al. 1) : autorisation délivrée par le CNAPS
            n° {entreprise.autorisation}, un numéro d&apos;exemple, et « {PHRASE_L612_14} »
          </p>
          <p>
            Le nom est toujours suivi de « Sécurité privée » (art. L612-3). Le logo — une
            petite lumière dans un croissant de nuit — et les couleurs ne reprennent rien
            d&apos;un service de police (art. R631-12). Aucun agent n&apos;est présenté par un
            ancien métier (art. L612-15, al. 2). Les références de carte professionnelle de
            l&apos;espace client sont des numéros d&apos;exemple ; dans la réalité, elles ne
            s&apos;affichent qu&apos;au client concerné.
          </p>
          <p>
            Les prix sont des exemples, TTC pour les particuliers et HT pour les
            professionnels. L&apos;adresse est fictive ; le numéro {entreprise.telephone}
            appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction. La page
            d&apos;accueil s&apos;inspire du modèle « Camper Overnight » de la bibliothèque
            MotionSites, transposé à une société de veille de nuit.
          </p>
        </>
      }
    />
  );
}
