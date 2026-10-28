import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tu Vas Voir — site de démonstration",
  description: "Tu Vas Voir est une librairie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/tu-vas-voir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="tu-vas-voir"
        entreprise="Tu Vas Voir"
        polices="Fraunces, DM Sans et Caveat"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de librairie afficherait ici, avec des valeurs d&apos;exemple :
              SARL au capital de 5 000 € (exemple), RCS 000 000 000 (exemple), TVA
              intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation
              (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Prix unique du livre : le prix d&apos;un livre neuf est fixé par l&apos;éditeur ou
              l&apos;importateur, et le détaillant vend entre 95 % et 100 % de ce prix (loi n° 81-766
              du 10 août 1981, art. 1). Le site n&apos;affiche aucune remise. Tout détaillant doit
              offrir le service gratuit de commande à l&apos;unité (même article, al. 3) : c&apos;est
              la page « Commander ».
            </p>
            <p>
              Port : la livraison d&apos;un livre neuf ne peut pas être gratuite, sauf retrait en
              commerce de détail de livres (même article, al. 4) ; 3 € TTC au moins sous 35 € de
              livres neufs, plus que 0 € au-delà (arrêté du 4 avril 2023, art. 1). Les tarifs
              affichés (3,50 € et 1 €) sont des exemples. Le marque-page écrit à la main est un mot
              du libraire, pas une prime : il ne change rien au prix (art. 6 de la même loi).
            </p>
            <p>
              Les livres cités sont des classiques du domaine public ; leurs prix sont des exemples.
              Le premier écran s&apos;inspire du modèle « Editorial Eyewear » de MotionSites (mise
              en page transposée, aucun texte ni image repris).
            </p>
          </>
        }
      />
    </div>
  );
}
