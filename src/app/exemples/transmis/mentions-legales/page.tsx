import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Transmis, site de démonstration",
  description: "Transmis est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/transmis/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="Ce qui est inventé, *ce qui est vrai.*" niveau="p" />
      <MentionsDemonstration
        site="transmis"
        entreprise="Transmis"
        polices="Playfair Display, Inter et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société du traiteur, son adresse et son numéro SIRET. Ici, tout est
              exemple : SIRET {entreprise.siret}, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction. Mamie Jo, Léa
              et les autres prénoms sont inventés.
            </p>
            <p>
              Les prix sont affichés par personne, toutes taxes comprises, et sont des exemples. Les allergènes sont
              indiqués plat par plat, parmi les quatorze de l&apos;annexe II du règlement (UE) n° 1169/2011 ; pour des repas
              non préemballés, cette information est donnée par écrit, sans que le client ait à la demander (décret
              n° 2015-447). Les allergies et les régimes sont demandés avant toute commande. Aucune boisson alcoolisée
              n&apos;est proposée, ni utilisée dans une recette.
            </p>
            <p>
              La photo d&apos;une page de cahier choisie sur ce site s&apos;affiche dans le navigateur et n&apos;en sort pas. La
              carte de table ne dit que l&apos;histoire vraie de la famille ; les vidéos de la recette du mois ne montrent
              que des personnes qui ont donné leur accord écrit (Code civil, art. 9). Les mariages présentés sont des
              exemples : aucun nom, aucune photo d&apos;invités. Les créneaux de dégustation « complets » sont un exemple ;
              aucun avis, aucune note n&apos;est affiché.
            </p>
            <p>
              Ce site réunit les deux vidéos des traiteurs : « Créer une marque » (le nom Transmis, la page du cahier
              envoyée en photo, les essais validés par la grand-mère, la carte de table) et « Remplir l&apos;agenda »
              (combien d&apos;invités et le prix par personne, un menu complet en exemple, une page par mariage, la
              dégustation réservée en ligne, les dix secondes de silence). Les deux sites de démonstration d&apos;origine
              n&apos;en font plus qu&apos;un. Les fiches, la page de cahier et la carte de table sont dessinées.
            </p>
          </>
        }
      />
    </main>
  );
}
