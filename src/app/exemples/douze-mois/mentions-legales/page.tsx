import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Douze Mois — site de démonstration",
  description: "Douze Mois est une boutique de fleurs fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/douze-mois/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="douze-mois"
        entreprise="Douze Mois"
        polices="Bodoni Moda et Space Grotesk"
        enPlus={
          <>
            <p>
              Sur un vrai site, on lirait ici le nom de la boutique, son numéro SIRET (exemple :
              000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples.
            </p>
            <p>
              Le calendrier des fleurs est indicatif. Une boutique qui annonce « ce qui fleurit en
              France ce mois-ci » doit le tenir : une origine annoncée et fausse serait une pratique
              commerciale trompeuse. Ce site n&apos;affiche aucun label d&apos;origine, et ne nomme ni
              producteur ni concurrent.
            </p>
            <p>
              Le numéro affiché, 06 39 98 27 12, appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction : il ne sonne chez personne.
            </p>
          </>
        }
      />
    </div>
  );
}
