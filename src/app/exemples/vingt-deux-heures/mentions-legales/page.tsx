import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Vingt-Deux Heures — site de démonstration",
  description: "Vingt-Deux Heures est une boutique de jeux fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/vingt-deux-heures/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="vingt-deux-heures"
        entreprise="Vingt-Deux Heures"
        polices="Archivo et Figtree"
        enPlus={
          <>
            <p>
              Les jeux présentés sont décrits par leur genre, sans titre ni éditeur : aucun ne
              reproduit un jeu existant, et leurs boîtes sont des aplats dessinés. Léa, la
              vendeuse, est un prénom d&apos;exemple.
            </p>
            <p>
              Comme le demande la réglementation des jouets (directive 2009/48/CE, art. 11 § 2),
              l&apos;âge et les avertissements de chaque jeu, précédés du mot « Attention », sont
              visibles avant le bouton qui le met de côté. Ici, ce sont des exemples : un vrai
              site reprend ceux de la boîte, mot pour mot.
            </p>
            <p>
              Les prix sont des prix TTC d&apos;exemple. Rien n&apos;est vendu ni payé en ligne : les
              jeux sont mis de côté et réglés en boutique. La soirée découverte est gratuite
              sans condition ; les places déjà prises sur le plan de la salle sont un exemple,
              comme le dit la page — sur un vrai site, ce seraient de vraies réservations.
            </p>
            <p>
              L&apos;adresse, {boutique.adresse}, est une adresse d&apos;exemple. Le numéro{" "}
              {boutique.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de
              fiction. La mise en page s&apos;inspire du modèle « Atrium MTL » de la bibliothèque
              MotionSites, transposé à une boutique de jeux.
            </p>
          </>
        }
      />
    </div>
  );
}
