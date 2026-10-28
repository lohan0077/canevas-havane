import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Rayon Frais, site de démonstration",
  description: "Rayon Frais est un cabinet de diététique fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/rayon-frais/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage ton="jaune" surtitre="Mentions légales" titre="Ce qui est vrai, *ce qui est inventé.*" titreBalise="p" />
      <MentionsDemonstration
        site="rayon-frais"
        entreprise="Rayon Frais"
        polices="Zilla Slab et Space Grotesk"
        enPlus={
          <>
            <p>
              La diététicienne, {cabinet.dieteticienne}, n&apos;existe pas. « Diététicien » est un
              titre protégé (code de la santé publique, art. L4371-2 ; usage sans droit puni, art.
              L4372-2) : il est affiché avec le diplôme et le numéro ADELI {cabinet.adeli}, qui
              sont des exemples.
            </p>
            <p>
              Aucun conseil nutritionnel, aucun kilo promis, aucun « avant / après », aucun
              témoignage. Le ticket de caisse est un exemple ; aucune enseigne de supermarché
              n&apos;est citée ni montrée. Les séances au rayon et l&apos;atelier supposent
              l&apos;accord du magasin ; l&apos;atelier porte une vraie date mais n&apos;aura pas lieu.
            </p>
            <p>
              Aucune donnée de santé n&apos;est demandée : ni poids, ni objectif, ni motif. La photo
              du frigo n&apos;est jamais envoyée : elle reste sur le téléphone, montrée en séance.
              Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction. L&apos;adresse est inventée.
            </p>
            <p>
              Ce site réunit les deux vidéos des diététiciens : « Créer une marque » (le nom, le
              ticket de caisse, les séances au rayon, l&apos;atelier du samedi matin) et « Remplir
              l&apos;agenda » (la question du frigo, la page diététicienne ou nutritionniste, les
              rendez-vous du soir).
            </p>
          </>
        }
      />
    </main>
  );
}
