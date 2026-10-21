import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Deux Mots — site de démonstration",
  description: "Deux Mots est un fleuriste fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/deux-mots/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="deux-mots"
        entreprise="Deux Mots"
        polices="Playfair Display, DM Sans et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, on lirait ici le nom de la boutique, son numéro SIRET (exemple :
              000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont des exemples,
              comme les tarifs de livraison.
            </p>
            <p>
              « Commandé avant 14 h, livré aujourd&apos;hui » est un exemple d&apos;heure limite. Sur un
              vrai site, c&apos;est une promesse qui doit être tenue : une livraison annoncée et non
              assurée serait une pratique commerciale trompeuse. Les livraisons sont faites par la
              boutique elle-même ; aucun réseau de livraison n&apos;est cité ni comparé.
            </p>
            <p>
              Le numéro affiché, 01 99 00 63 45, appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction : il ne sonne chez personne.
            </p>
          </>
        }
      />
    </div>
  );
}
