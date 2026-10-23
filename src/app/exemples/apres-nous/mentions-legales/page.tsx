import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Après Nous, site de démonstration",
  description: "Après Nous est un atelier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/apres-nous/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Après Nous · site de démonstration" titre="Ce qui est *inventé.*" titreEnParagraphe />
      <MentionsDemonstration
        site="apres-nous"
        entreprise="Après Nous"
        polices="Fraunces, Figtree et Caveat"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des artisans d&apos;art : « Créer une marque » (l&apos;atelier
              d&apos;ébénisterie, le numéro gravé sous chaque table, son registre et ses lignes vides, le premier repas)
              et « Remplir l&apos;agenda » (le céramiste : une page et vingt secondes de tournage par pièce,
              l&apos;ouverture du four une fois par mois, en direct, une seule de chaque).
            </p>
            <p>
              Comme le ferait un vrai atelier, ce site affiche une adresse ({atelier.adresse}), un numéro SIRET
              ({atelier.siret}) et un téléphone ({atelier.telephone}) : trois mentions d&apos;exemple. Le numéro
              appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les registres (meubles n° 31, 12 et 47), les familles, les heures, les pièces, leurs numéros, leurs ventes
              et les prix (TTC) sont des exemples. Sur un vrai site, chaque ligne d&apos;un registre doit correspondre à
              ce qui est arrivé à ce meuble-là, une « pièce unique » doit l&apos;être vraiment, et la vidéo d&apos;une
              pièce doit être celle de son tournage : autrement, ce serait une pratique commerciale trompeuse (code de
              la consommation, art. L121-2 et L121-4). Ici, une animation remplace la vidéo, et le site le dit.
              « Tes petits-enfants feront leurs devoirs dessus » est une image, pas une promesse de durée : seules
              les garanties légales de conformité (art. L217-3 et suivants) et des vices cachés (code civil, art. 1641)
              sont annoncées.
            </p>
            <p>
              Le site ne dit ni « artisan », ni « artisanal », ni « artisan d&apos;art », ni « maître artisan » : ces
              mots sont réservés à ceux qui en ont la qualité (code de l&apos;artisanat, art. L241-1 ; loi n° 96-603,
              art. 20 ; arrêté du 24 décembre 2015). Le premier repas n&apos;est filmé qu&apos;avec l&apos;accord écrit
              de la famille ; ici, c&apos;est un dessin. Un meuble fait sur mesure n&apos;ouvre pas de droit de
              rétractation (code de la consommation, art. L221-28, 3°) ; une pièce de céramique achetée en ligne, si :
              quatorze jours (art. L221-18).
            </p>
          </>
        }
      />
    </main>
  );
}
