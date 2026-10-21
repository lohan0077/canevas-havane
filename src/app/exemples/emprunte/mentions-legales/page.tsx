import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { marque } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Emprunté — site de démonstration",
  description: "Emprunté est une marque de pulls fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/emprunte/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="emprunte"
      entreprise="Emprunté"
      polices="Sora, Manrope et Caveat"
      enPlus={
        <>
          <p>
            Comme le ferait une vraie boutique en ligne, ce site affiche une adresse ({marque.adresse}), un
            numéro SIRET ({marque.siret}) et un téléphone ({marque.telephone}) : trois mentions d&apos;exemple.
            Le numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            La composition, « 100 % laine », est visible avant l&apos;achat et n&apos;est employée que pour une
            fibre unique (règlement (UE) n° 1007/2011, art. 7 et 16) ; l&apos;étiquette « À rendre à »
            s&apos;ajoute à l&apos;étiquette de composition, elle ne la remplace pas. « Ajouter sa taille » est
            une option : un pull se commande seul, le second coûte le même prix, sans quantité imposée
            (code de la consommation, art. L121-11) et sans rien d&apos;« offert ». Prix TTC d&apos;exemple.
          </p>
          <p>
            Le mur des voleurs ne montrerait que de vraies photos de vrais clients, chacune publiée avec
            l&apos;accord écrit de la personne photographiée, sans aucun mineur (code civil, art. 9 et
            372-1) ; ici, ce sont des dessins. Un pull brodé à un prénom est personnalisé : il est exclu du
            droit de rétractation (code de la consommation, art. L221-28, 3°), ce que la fiche dit avant
            la commande ; sans prénom, l&apos;acheteur a quatorze jours (art. L221-18). Aucune origine
            n&apos;est revendiquée.
          </p>
          <p>
            L&apos;ouverture de la page d&apos;accueil s&apos;inspire du modèle « Playful Idea » de la
            bibliothèque MotionSites, transposé à une marque de pulls.
          </p>
        </>
      }
    />
  );
}
