import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { PHOTOS, boutique } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Douze Mois, site de démonstration",
  description: "Douze Mois est une boutique de fleurs fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/douze-mois/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Douze Mois" titre="Mentions *légales.*" photo={PHOTOS.hellebore} origine="50% 40%" />
      <div className="[&_h1]:hidden [&_h2]:font-normal">
        <MentionsDemonstration
          site="douze-mois"
          entreprise="Douze Mois"
          polices="Bodoni Moda, Manrope et Caveat"
          enPlus={
            <>
              <p>
                Sur un vrai site, on lirait ici le nom de la boutique, son numéro SIRET (exemple :
                000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples,
                comme les tarifs de livraison.
              </p>
              <p>
                Le calendrier des fleurs est indicatif. Une boutique qui annonce « ce qui fleurit en
                France ce mois-ci » doit le tenir : une origine annoncée et fausse serait une pratique
                commerciale trompeuse. Ce site n&apos;affiche aucun label d&apos;origine, et ne nomme ni
                producteur ni concurrent.
              </p>
              <p>
                « Commandé avant 14 h, livré aujourd&apos;hui » est un exemple d&apos;heure limite. Sur un
                vrai site, c&apos;est une promesse qui doit être tenue : une livraison annoncée et non
                assurée serait elle aussi une pratique commerciale trompeuse. Les livraisons sont faites
                par la boutique elle-même ; aucun réseau de livraison n&apos;est cité ni comparé.
              </p>
              <p>
                Le numéro affiché, {boutique.telephone}, appartient à la tranche que l&apos;ARCEP réserve
                aux œuvres de fiction : il ne sonne chez personne. L&apos;adresse est inventée.
              </p>
              <p>
                Ce site réunit les deux vidéos des fleuristes : « Créer une marque » (le nom Douze Mois,
                le calendrier des fleurs, le mimosa du 14 février, la vidéo du premier du mois) et
                « Remplir l&apos;agenda » (« c&apos;est pour dire quoi ? », le bouquet et la phrase écrite à
                la main, l&apos;heure limite écrite en gros).
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
