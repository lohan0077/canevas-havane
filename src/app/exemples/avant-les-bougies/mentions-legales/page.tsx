import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Avant les Bougies — site de démonstration",
  description: "Avant les Bougies est une pâtisserie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/avant-les-bougies/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="avant-les-bougies"
      entreprise="Avant les Bougies"
      polices="Bricolage Grotesque et Figtree"
      enPlus={
        <>
          <p>
            Sur un vrai site, on lirait ici le nom de la pâtisserie, son numéro SIRET (exemple :
            000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples.
          </p>
          <p>
            Les allergènes : pour une denrée vendue à distance, les mentions obligatoires — dont
            les quatorze allergènes du règlement (UE) n° 1169/2011 — doivent être disponibles
            avant la conclusion de l&apos;achat. Ce site les affiche sur chaque fiche et les
            rappelle juste avant le bouton de commande. Ceux qui sont indiqués ici sont des
            exemples, établis pour des recettes classiques.
          </p>
          <p>
            Le plafond de douze gâteaux le samedi est présenté comme la vraie capacité du labo :
            sur un vrai site, il doit l&apos;être, et le compteur suivre les vraies commandes. Le
            rappel de l&apos;an prochain n&apos;est envoyé qu&apos;avec l&apos;accord du client, donné par une
            case jamais cochée d&apos;avance.
          </p>
          <p>
            Le numéro affiché, 01 99 00 74 26, appartient à la tranche que l&apos;ARCEP réserve aux
            œuvres de fiction : il ne sonne chez personne.
          </p>
        </>
      }
    />
  );
}
