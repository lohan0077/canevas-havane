import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales — Ciel Variable — site de démonstration",
  description: "Ciel Variable est une ferme fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/ciel-variable/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div className="[&_h1]:font-light [&_h1]:uppercase [&_h2]:font-normal [&_h2]:uppercase [&_h2]:text-xl [&_h2]:tracking-[0.06em]">
      <MentionsDemonstration
        site="ciel-variable"
        entreprise="Ciel Variable"
        polices="Sora et Newsreader"
        enPlus={
          <>
            <p>
              Sur un vrai site, on lirait ici le nom de l&apos;exploitation, son numéro SIRET
              (exemple : 000 000 000 00000) et son adresse. Les prix sont affichés TTC ; ce sont
              des exemples.
            </p>
            <p>
              Les relevés météo de ce site sont des exemples. Sur un vrai site, ce sont ceux de
              la ferme : une météo arrangée pour justifier le contenu d&apos;un panier serait une
              pratique commerciale trompeuse. Le site ne parle ni d&apos;agriculture biologique
              ni de produits « fermiers » : ces mentions sont réglementées, et rien ici ne les
              établit. Les paniers se retirent à la ferme : rien n&apos;est livré.
            </p>
            <p>
              Le numéro affiché, 01 99 00 52 18, appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction : il ne sonne chez personne.
            </p>
          </>
        }
      />
    </div>
  );
}
