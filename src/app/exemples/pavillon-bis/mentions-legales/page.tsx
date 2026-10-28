import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { agence } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Pavillon Bis, site de démonstration",
  description: "Pavillon Bis est une agence d'architecture fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pavillon-bis/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="bg-[var(--sombre)] pt-24 text-[var(--sur-sombre)] [&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="pavillon-bis"
        entreprise="Pavillon Bis"
        polices="Fraunces et Outfit"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des architectes : « Créer une marque » (le nom, les pavillons
              des années 70, tu choisis ta maison et tu vois ce qu&apos;on a fait de la même, le lotissement et
              le n° 14) et « Remplir l&apos;agenda » (architecte ou pas : le calcul sur l&apos;accueil, une page
              par projet avec son budget, trente minutes un samedi matin).
            </p>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux architectes. Ici, elles sont des
              exemples : architecte inscrit au tableau régional de l&apos;Ordre des architectes, conseil
              régional d&apos;exemple, numéro national 000000 ; titre professionnel : architecte, diplôme délivré
              en France ; règles professionnelles : code de déontologie des architectes (annexe du décret
              n° 80-217 du 20 mars 1980, modifié) ; assurance de responsabilité professionnelle souscrite
              auprès d&apos;un assureur d&apos;exemple (loi n° 77-2 du 3 janvier 1977, art. 16).
            </p>
            <p>
              Le calcul « Architecte ou pas ? » applique le seuil de 150 m² de surface de plancher pour un
              particulier qui construit pour lui-même, et seulement quand un permis de construire est
              nécessaire (code de l&apos;urbanisme, art. R431-2 et R*421-14) : c&apos;est une première réponse,
              pas un avis sur un dossier.
            </p>
            <p>
              Les maisons, le lotissement des Tilleuls, les projets, leurs budgets, les avant / après et la
              visite du n° 14 sont des exemples dessinés : aucune vraie maison, aucune adresse. Sur un vrai
              site, ils ne sont publiés qu&apos;avec l&apos;accord écrit des propriétaires (code civil, art. 9). Le
              téléphone {agence.telephone} appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
