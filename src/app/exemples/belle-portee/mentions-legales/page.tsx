import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { bureau } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Belle Portée — site de démonstration",
  description: "Belle Portée est un bureau d'études fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/belle-portee/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="belle-portee"
      entreprise="Belle Portée"
      polices="Outfit et DM Sans"
      enPlus={
        <>
          <p>
            Le site ne dit jamais qu&apos;un mur porteur peut être ouvert : il dit ce que la visite
            vérifiera et propose une date. Promettre en ligne qu&apos;un mur « peut partir » serait
            dangereux et trompeur. Les prix sont des exemples TTC pour un particulier ; les
            créneaux de visite et ceux marqués « Pris » sont inventés.
          </p>
          <p>
            L&apos;outil « Ton mur, en photo » fonctionne dans le navigateur : la photo est lue sur
            l&apos;appareil et n&apos;est jamais envoyée. Les vidéos « le mur de la semaine » supposent
            l&apos;accord écrit des clients, et l&apos;affiche en magasin celui du magasin. Le numéro{" "}
            {bureau.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de
            fiction ; l&apos;adresse, le SIRET ({bureau.siret}) et l&apos;assurance sont des exemples.
            La mise en page s&apos;inspire du modèle « BuildShield » de la bibliothèque MotionSites,
            transposé à un bureau d&apos;études.
          </p>
        </>
      }
    />
  );
}
