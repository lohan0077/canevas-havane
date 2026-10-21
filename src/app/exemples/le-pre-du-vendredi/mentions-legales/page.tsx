import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Le Pré du Vendredi — site de démonstration",
  description: "Le Pré du Vendredi est une ferme fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/le-pre-du-vendredi/mentions-legales"),
};

export default function MentionsLegales() {
  // Instrument Serif n'a qu'une graisse : les titres du kit, en semi-gras, seraient
  // épaissis à la main par le navigateur. On les garde dans leur dessin.
  return (
    <div className="[&_h1]:font-normal [&_h2]:font-normal">
    <MentionsDemonstration
      site="le-pre-du-vendredi"
      entreprise="Le Pré du Vendredi"
      polices="Instrument Serif et Archivo"
      enPlus={
        <>
          <p>
            Sur un vrai site, on lirait ici le nom de l&apos;exploitation, son numéro SIRET
            (exemple : 000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont
            des exemples, comme le compteur des colis. Un vrai compteur ne compte que des
            réservations réelles : un nombre gonflé pour presser le client serait une
            pratique commerciale trompeuse.
          </p>
          <p>
            Ce site ne parle ni d&apos;agriculture biologique ni de produits « fermiers » : ces
            mentions sont réglementées, et rien ici ne les établit. Il ne décrit pas non plus
            les règles d&apos;abattage, de découpe ou de transport de la viande, qui relèvent de
            la réglementation sanitaire : les colis se retirent à la ferme, rien n&apos;est livré.
          </p>
          <p>
            Le numéro affiché, 01 99 00 41 27, appartient à la tranche que l&apos;ARCEP réserve
            aux œuvres de fiction : il ne sonne chez personne.
          </p>
        </>
      }
    />
    </div>
  );
}
