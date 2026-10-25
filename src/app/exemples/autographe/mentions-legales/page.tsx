import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Autographe, site de démonstration",
  description: "Autographe est une épicerie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/autographe/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="pt-24">
      <MentionsDemonstration
        site="autographe"
        entreprise="Autographe"
        polices="Bodoni Moda, Newsreader et Caveat"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des épiceries fines : « Créer une marque » (l&apos;épicerie
              qui vend des auteurs, la recherche par personne, la séance de dédicace) et « Remplir le
              carnet de commandes » (les trois questions, le coffret commandé le matin et prêt le soir,
              le mot pour les hôtes, la dégustation d&apos;huiles d&apos;olive).
            </p>
            <p>
              Mentions qu&apos;afficherait la vraie épicerie, ici avec des valeurs d&apos;exemple :
              Autographe, SIRET 000 000 000 00000 (exemple), {boutique.adresse}, {boutique.ville}{" "}
              (adresse fictive). Le téléphone {boutique.telephone} appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les auteurs (Hélène, Joseph, Lina, Anouk, Paul, Mathilde), leurs lieux, leurs pots et
              leurs signatures sont inventés. Une vraie épicerie qui reprend l&apos;idée publie le nom
              d&apos;un producteur avec son accord écrit, et n&apos;attribue à personne un produit
              qu&apos;il n&apos;a pas fait.
            </p>
            <p>
              Étiquetage : la collerette « Autographe » s&apos;ajoute à l&apos;étiquette du producteur
              sans la modifier (règlement (UE) n° 1169/2011, art. 8). Pour chaque pot mis de côté et
              chaque coffret commandé en ligne — une vente à distance —, la dénomination, le poids, les
              ingrédients et les allergènes sont affichés avant la commande, les allergènes en gras
              (même règlement, art. 9, 14, 21 et 44) ; l&apos;origine du miel et de l&apos;huile est
              indiquée (décret n° 2003-587), comme la quantité de fruits et de sucres des confitures
              (décret n° 85-872). Prix TTC d&apos;exemple ; rien n&apos;est payé en ligne.
            </p>
            <p>
              Aucune boisson alcoolique n&apos;est proposée, montrée ni citée (code de la santé
              publique, art. L3323-4). Les dates de dédicace et de dégustation sont de vrais
              samedis ; la séance complète est un exemple.
            </p>
          </>
        }
      />
    </main>
  );
}
