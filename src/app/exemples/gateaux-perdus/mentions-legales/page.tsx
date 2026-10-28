import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { PHOTOS, boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Gâteaux Perdus, site de démonstration",
  description: "Gâteaux Perdus est une pâtisserie fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Gâteaux Perdus" titre="Mentions *légales.*" photo={PHOTOS.tranche} />
      <div className="[&_h1]:hidden [&_h2]:font-normal">
        <MentionsDemonstration
          site="gateaux-perdus"
          entreprise="Gâteaux Perdus"
          polices="DM Serif Display, DM Sans et Caveat"
          enPlus={
            <>
              <p>
                Sur un vrai site, on lirait ici le nom de la pâtisserie, son numéro SIRET (exemple :
                000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples,
                comme le compteur du samedi et les dates.
              </p>
              <p>
                Chaque gâteau affiche ses allergènes avant la commande (règlement (UE) n° 1169/2011).
                Un gâteau refait d&apos;après une recette de famille reste une denrée vendue : ses
                allergènes sont établis avec le client et écrits sur sa fiche avant la commande. Les
                fiches de recettes montrées sont dessinées et inventées ; une vraie fiche, qui porte un
                prénom et une écriture, n&apos;est exposée ou filmée qu&apos;avec l&apos;accord écrit de la famille.
                La photo choisie dans le formulaire reste sur votre appareil : rien n&apos;est téléversé.
              </p>
              <p>
                Le rappel de l&apos;an prochain n&apos;est envoyé qu&apos;à qui l&apos;a demandé : la case n&apos;est
                jamais cochée d&apos;avance, un seul message par an, un lien pour ne plus rien recevoir.
                Ici, rien n&apos;est envoyé ni enregistré.
              </p>
              <p>
                Le numéro affiché, {boutique.telephone}, appartient à la tranche que l&apos;ARCEP réserve
                aux œuvres de fiction : il ne sonne chez personne. L&apos;adresse est inventée.
              </p>
              <p>
                Ce site réunit les deux vidéos des pâtisseries : « Créer une marque » (le nom Gâteaux
                Perdus, la photo de la recette de ta grand-mère, la vitrine des fiches) et « Remplir
                l&apos;agenda » (« vous serez combien ? », les douze gâteaux du samedi, le rappel de l&apos;an
                prochain).
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
