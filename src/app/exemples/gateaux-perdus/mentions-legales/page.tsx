import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Gâteaux Perdus — site de démonstration",
  description: "Gâteaux Perdus est une pâtisserie fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="gateaux-perdus"
        entreprise="Gâteaux Perdus"
        polices="DM Serif Display, Lora et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, on lirait ici le nom de la pâtisserie, son numéro SIRET (exemple :
              000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples.
            </p>
            <p>
              Un gâteau refait d&apos;après une recette de famille reste une denrée vendue : ses
              allergènes (règlement (UE) n° 1169/2011) sont établis avec le client et écrits sur sa
              fiche avant la commande. Les fiches de recettes montrées sont dessinées et inventées ;
              une vraie fiche, qui porte un prénom et une écriture, n&apos;est exposée ou filmée
              qu&apos;avec l&apos;accord écrit de la famille. La photo choisie dans le formulaire reste
              sur votre appareil : rien n&apos;est téléversé.
            </p>
            <p>
              Le numéro affiché, 06 39 98 61 04, appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction : il ne sonne chez personne.
            </p>
          </>
        }
      />
    </div>
  );
}
