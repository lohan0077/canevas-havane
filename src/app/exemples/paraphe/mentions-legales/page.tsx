import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Paraphe — site de démonstration",
  description: "Paraphe est une librairie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/paraphe/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="paraphe"
        entreprise="Paraphe"
        polices="Newsreader, Work Sans et Caveat"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de librairie afficherait ici, avec des valeurs d&apos;exemple :
              SAS au capital de 2 000 € (exemple), RCS 000 000 000 (exemple), TVA
              intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation
              (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Prix unique du livre : le prix d&apos;un livre neuf est fixé par l&apos;éditeur, et le
              détaillant vend entre 95 % et 100 % de ce prix (loi n° 81-766 du 10 août 1981,
              art. 1). Le site affiche le prix de l&apos;éditeur, sans aucune remise. Il propose la
              commande à l&apos;unité, gratuite pour tout détaillant (même article, al. 3) : c&apos;est
              pour cela que la règle de la maison vise le <em>rayon</em> (« tout ce qui est en rayon
              a été lu »), pas tout ce qui se vend.
            </p>
            <p>
              Port : jamais gratuit pour un livre neuf expédié, sauf retrait en librairie (même
              article, al. 4) ; 3 € TTC au moins sous 35 € de livres neufs (arrêté du 4 avril
              2023, art. 1). Paraphe ne fait que réserver et faire retirer en boutique. Le club des
              livres pas finis est une soirée gratuite, sans vente ni livre offert.
            </p>
            <p>
              Les livres cités sont des classiques du domaine public ; leurs prix sont des
              exemples. Le premier écran s&apos;inspire du modèle « Heritage Grove » de MotionSites
              (mise en page transposée, aucun texte ni image repris) ; l&apos;étagère et les
              paraphes sont dessinés pour ce site.
            </p>
          </>
        }
      />
    </div>
  );
}
