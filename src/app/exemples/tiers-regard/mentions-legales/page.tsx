import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Tiers Regard, site de démonstration",
  description: "Tiers Regard est un diagnostiqueur immobilier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/tiers-regard/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="tiers-regard"
      entreprise="Tiers Regard"
      polices="Outfit et Space Grotesk"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions propres aux diagnostiqueurs. Ici, elles
            sont des exemples : diagnostiqueuse certifiée par un organisme accrédité, domaine par
            domaine (DPE, amiante, électricité, gaz, plomb, termites), certificat n° 0000 ; assurance
            de responsabilité civile professionnelle auprès d&apos;un assureur d&apos;exemple (code de la
            construction et de l&apos;habitation, art. L271-6 et R271-1). Comme tout diagnostiqueur,
            Tiers Regard n&apos;a aucun lien avec le propriétaire, son mandataire ou une entreprise de
            travaux (art. L271-6), et n&apos;accorde aucun avantage à quiconque pour être recommandé
            (art. R271-3). Aucune entreprise de travaux n&apos;est recommandée sur ce site.
          </p>
          <p>
            Le rapport « en une page » est un exemple : aucun logement réel, aucune anomalie réelle.
            Sur un vrai site, il traduirait le rapport sans le remplacer ; le rapport complet reste
            joint et fait foi. Les points posés sur la photo du salon montrent ce qu&apos;un diagnostic
            examine, pas des défauts de ce logement. Prix, créneaux et numéros sont des exemples ; le
            téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Inspiration : le modèle « Alethia » de MotionSites (fond nuit, objet annoté de petites
            étiquettes, grand titre), transposé sans texte ni code repris.
          </p>
        </>
      }
    />
  );
}
