import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Sans Soupir, site de démonstration",
  description: "Sans Soupir est une entreprise fictive d'informatique à domicile : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/sans-soupir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="À savoir" titre="Un informaticien *qui n'existe pas.*" teinte="#DCEBF3" />
      <MentionsDemonstration
        site="sans-soupir"
        entreprise="Sans Soupir"
        polices="Sora et Figtree"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos du dépannage informatique : « Créer une marque » (on
              répète, sans soupirer ; les fiches du frigo, gratuites, à imprimer ; le goûter
              numérique) et « Remplir l&apos;agenda » (les deux portes de l&apos;accueil, le dépannage à
              prix clair, la vraie réponse sur le crédit d&apos;impôt, les cours qui donnent envie).
            </p>
            <p>
              Le crédit d&apos;impôt n&apos;est présenté que pour ce qui peut y ouvrir droit :
              l&apos;installation, la maintenance des logiciels et les cours, à domicile, par une
              entreprise déclarée services à la personne dont c&apos;est l&apos;activité principale (Code du
              travail, art. D7231-1, L7232-1-2 et D7233-5 ; CGI, art. 199 sexdecies). Le dépannage, la
              réparation, la vente et l&apos;aide à distance en sont exclus, et le site le dit sur
              chaque page qui en parle. L&apos;avantage fiscal n&apos;est jamais accolé à un prix.
            </p>
            <p>
              Les prix sont des exemples, affichés hors taxes et toutes taxes comprises (arrêté du 17
              mars 2015, art. 4). La déclaration n° {entreprise.declarationSap} est un numéro
              d&apos;exemple. « On répète, sans soupirer » décrit une manière de faire : aucune
              exclusivité n&apos;est revendiquée. Le goûter numérique, sa date et son lieu sont des
              exemples ; la fiche « Appeler Léa en vidéo » ne nomme aucune application.
            </p>
            <p>
              L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une tranche que
              l&apos;ARCEP réserve aux œuvres de fiction. Les fiches, les calculs et l&apos;inscription au
              goûter fonctionnent dans le navigateur : rien n&apos;est envoyé.
            </p>
          </>
        }
      />
    </main>
  );
}
