import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { atelier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Après Nous — site de démonstration",
  description: "Après Nous est un atelier d'ébénisterie fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/apres-nous/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="apres-nous"
      entreprise="Après Nous"
      polices="Bodoni Moda, Figtree et Caveat"
      enPlus={
        <>
          <p>
            Comme le ferait un vrai atelier, ce site affiche une adresse ({atelier.adresse}), un numéro
            SIRET ({atelier.siret}) et un téléphone ({atelier.telephone}) : trois mentions d&apos;exemple.
            Le numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Les registres (meubles n° 31, 12 et 47), les familles, les heures et les prix (TTC) sont des
            exemples. Sur un vrai site, chaque ligne d&apos;un registre doit correspondre à ce qui est
            arrivé à ce meuble-là : un registre inventé serait une pratique commerciale trompeuse
            (code de la consommation, art. L121-2). « Tes petits-enfants feront leurs devoirs
            dessus » est une image, pas une promesse de durée : le site n&apos;annonce aucune garantie
            commerciale, seulement les garanties légales de conformité (art. L217-3 et suivants) et
            des vices cachés (code civil, art. 1641).
          </p>
          <p>
            Le site ne dit ni « artisan d&apos;art » ni « maître artisan » : ces titres sont réservés aux
            personnes qui y ont droit (loi n° 96-603 du 5 juillet 1996, art. 20 ; décret n° 98-247 ;
            arrêté du 24 décembre 2015 fixant la liste des métiers d&apos;art). « Ébéniste » et
            « atelier » ne sont pas des titres réservés. Le premier repas n&apos;est filmé qu&apos;avec
            l&apos;accord écrit de la famille ; ici, c&apos;est un dessin.
          </p>
          <p>
            Un meuble fait sur mesure n&apos;ouvre pas de droit de rétractation (code de la
            consommation, art. L221-28, 3°). La mise en page s&apos;inspire du modèle « Heritage
            Grove » de la bibliothèque MotionSites, transposé à un atelier d&apos;ébénisterie.
          </p>
        </>
      }
    />
  );
}
