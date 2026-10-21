import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — De A à G, site de démonstration",
  description: "De A à G est un cabinet de diagnostic immobilier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/de-a-a-g/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="de-a-a-g"
      entreprise="De A à G"
      polices="Bricolage Grotesque et Figtree"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions propres aux diagnostiqueurs. Ici, elles
            sont des exemples : diagnostiqueur certifié par un organisme accrédité, domaine par
            domaine (DPE, amiante, électricité, gaz, plomb, termites), certificat n° 0000 ; assurance
            de responsabilité civile professionnelle auprès d&apos;un assureur d&apos;exemple (code de la
            construction et de l&apos;habitation, art. L271-6 et R271-1). Comme tout diagnostiqueur, le
            cabinet n&apos;a aucun lien avec le propriétaire, son mandataire ou une entreprise de travaux
            (art. L271-6) ; il n&apos;accorde aucun avantage à une agence (art. R271-3) ; aucune
            entreprise de travaux n&apos;est recommandée sur ce site.
          </p>
          <p>
            La liste des diagnostics suit les fiches Service-Public « Quels sont les diagnostics
            immobiliers à fournir en cas de vente d&apos;un logement ? » (F10798, vérifiée le 07/03/2025)
            et « Quels sont les diagnostics immobiliers qu&apos;un bailleur doit fournir au locataire ? »
            (F33463, vérifiée le 20/02/2026) ; les pages des lettres, les fiches F16096, F2042 et
            F37110. C&apos;est une première réponse, pas un rapport : seule la visite tranche. Prix,
            créneaux et numéros sont des exemples ; le téléphone affiché appartient à la tranche que
            l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Inspiration : le modèle « Task Engine » de MotionSites (des tuiles claires aux coins ronds,
            des teintes pastel, un graphique en barres), transposé sans texte ni code repris.
          </p>
        </>
      }
    />
  );
}
