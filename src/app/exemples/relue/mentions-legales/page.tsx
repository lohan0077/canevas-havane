import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Relue, site de démonstration",
  description: "Relue est une papeterie et boutique de jeux fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/relue/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Site de démonstration" titre="Ce qui est *inventé.*" balise="p" />
      <MentionsDemonstration
        site="relue"
        entreprise="Relue"
        polices="Bodoni Moda et DM Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des loisirs créatifs : « Créer une marque » (la marque de
              papeterie Relue, la lettre qu&apos;on se poste dans un an, la lettre de la semaine lue à voix
              haute, l&apos;affiche « Personne n&apos;encadre un texto ») et « Remplir l&apos;agenda » (les trois
              questions qui sortent trois jeux, la soirée découverte d&apos;un jeudi par mois, la page des
              jeux pour deux).
            </p>
            <p>
              La lettre de la semaine (« Ma Jeanne… », signée Robert, Brest, 12 mai 1984) est inventée
              pour l&apos;exemple. Une vraie lettre ne serait lue qu&apos;avec l&apos;accord de son auteur ou
              de ses héritiers : celui qui l&apos;a reçue possède le papier, pas le texte (code de la
              propriété intellectuelle, art. L121-2). Le lecteur de ce site ne joue aucun son.
            </p>
            <p>
              « Postée dans un an, jour pour jour » désigne la date de dépôt de la lettre, pas sa date
              de distribution. Sur un vrai site, l&apos;adresse donnée ne servirait qu&apos;à poster la
              lettre et serait effacée ensuite ; ici, rien n&apos;est demandé ni enregistré.
            </p>
            <p>
              Aucun jeu réel n&apos;est montré : chaque jeu est décrit par son genre, ses boîtes sont des
              aplats dessinés. L&apos;âge conseillé et les avertissements sont affichés avant le bouton
              qui met un jeu de côté, précédés du mot « Attention » (directive 2009/48/CE, art. 11). Les
              places déjà prises à la soirée découverte sont un exemple ; la soirée est gratuite et sans
              obligation d&apos;achat. La vendeuse, Léa, est inventée.
            </p>
            <p>
              Les prix sont des prix TTC d&apos;exemple. L&apos;adresse, {maison.adresse}, est une adresse
              d&apos;exemple ; le numéro {maison.telephone} appartient à une tranche que l&apos;ARCEP
              réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
