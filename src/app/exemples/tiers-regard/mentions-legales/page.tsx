import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Tiers Regard, site de démonstration",
  description: "Tiers Regard est un diagnostiqueur immobilier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/tiers-regard/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage etiquette="Démonstration" titre="Mentions *légales.*" />
      <MentionsDemonstration
        site="tiers-regard"
        entreprise="Tiers Regard"
        polices="Sora et Space Grotesk"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des diagnostiqueurs immobiliers de Canevas Havane :
              « Créer une marque » (le nom, « Je dis ce que je vois », celui qui n&apos;a aucun
              intérêt dans la vente, le rapport traduit en une page, l&apos;affiche) et « Remplir
              l&apos;agenda » (le propriétaire comme client, trois questions et la liste des
              diagnostics avec le prix, une page par lettre du DPE, le rendez-vous en ligne avec la
              certification en vue).
            </p>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux diagnostiqueurs. Ici, elles
              sont des exemples : {cabinet.diagnostiqueuse}, diagnostiqueuse certifiée par un organisme
              accrédité, domaine par domaine (DPE, amiante, électricité, gaz, plomb, termites),
              certificat n° 0000 ; assurance de responsabilité civile professionnelle auprès d&apos;un
              assureur d&apos;exemple (code de la construction et de l&apos;habitation, art. L271-6 et
              R271-1). Comme tout diagnostiqueur, Tiers Regard n&apos;a aucun lien avec le propriétaire,
              son mandataire ou une entreprise de travaux (art. L271-6), et n&apos;accorde aucun avantage
              à quiconque pour être recommandé (art. R271-3). Aucune entreprise de travaux n&apos;est
              recommandée sur ce site.
            </p>
            <p>
              La liste des diagnostics suit les fiches Service-Public F10798 (vente) et F33463
              (location) ; les pages des lettres, les fiches F16096, F2042 et F37110. Le rapport « en
              une page » est un exemple : aucun logement réel, aucune anomalie réelle. Les points posés
              sur la photo du salon montrent ce qu&apos;un diagnostic examine, pas des défauts de ce
              logement. Prix, créneaux et numéros sont des exemples ; le téléphone affiché,{" "}
              {cabinet.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction. Aucun avis, aucune note.
            </p>
          </>
        }
      />
    </main>
  );
}
