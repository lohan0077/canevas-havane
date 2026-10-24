import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import Bougie from "../_composants/Bougie";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Première Bougie, site de démonstration",
  description: "Première Bougie est un cabinet de recrutement fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/premiere-bougie/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] pt-24 text-[var(--sur-sombre)]">
      <div className="relative">
        <MentionsDemonstration
          site="premiere-bougie"
          entreprise="Première Bougie"
          polices="DM Serif Display et Manrope"
          enPlus={
            <>
              <p>
                Ce site réunit les deux vidéos des cabinets de recrutement : « Créer une marque » (le nom,
                le premier anniversaire, un seul bilan — toujours là et parties —, le gâteau à une bougie)
                et « Remplir l&apos;agenda » (une seule question sur l&apos;accueil, les heures sur une chaise
                vide, vingt minutes pour définir le poste, les honoraires ligne par ligne).
              </p>
              <p>
                Sur un vrai site, cette page nommerait le cabinet, son adresse, son numéro SIRET et sa
                déclaration d&apos;activité de placement. Ici, tout est exemple : SIRET
                000&nbsp;000&nbsp;000&nbsp;00000, {cabinet.adresse}. Le téléphone affiché, {cabinet.telephone},
                appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
              </p>
              <p>
                Le bilan est un exemple : un vrai cabinet le calcule sur toutes ses recrues, départs compris,
                et ne publie jamais une ligne par personne. Aucune promesse de résultat : personne ne peut
                promettre qu&apos;une recrue restera. Les prix sont hors taxes parce que les clients sont des
                entreprises ; le placement est gratuit pour les candidats (code du travail, art. L.5321-3).
              </p>
            </>
          }
        />
      </div>
      <div aria-hidden="true" className="mx-auto flex max-w-3xl justify-end px-5 pb-12">
        <Bougie allumee className="h-40 w-16" />
      </div>
    </main>
  );
}
