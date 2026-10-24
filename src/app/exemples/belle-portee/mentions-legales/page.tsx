import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { bureau, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Belle Portée, site de démonstration",
  description: "Belle Portée est un cabinet fictif, bureau d'études et géomètre-expert : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/belle-portee/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Démonstration" titre="Mentions *légales.*" photo={photos.charpente} />
      <MentionsDemonstration
        site="belle-portee"
        entreprise="Belle Portée"
        polices="Archivo et DM Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos du métier « bureaux d&apos;études » de Canevas Havane :
              « Créer une marque » (le nom, le mur qui disparaît, ton mur en photo, jamais de oui à
              distance, la visite, l&apos;affiche, le mur de la semaine) et « Remplir l&apos;agenda »,
              consacrée aux géomètres (une seule question, « qu&apos;est-ce qui t&apos;arrive ? », le prix au
              nombre de bornes, le bornage étape par étape). Le cabinet imaginé réunit donc un bureau
              d&apos;études structure et un géomètre-expert.
            </p>
            <p>
              Le bornage est réservé aux géomètres-experts inscrits à l&apos;Ordre (loi n° 46-942 du 7 mai
              1946, art. 1er et 2) : inscription n° {bureau.inscription}, exemple. Tout le site suit la
              règle de publicité de leur profession (décret n° 96-478, art. 53) : de l&apos;information sur
              l&apos;activité, avec modération, ni avis, ni note, ni chiffre de clientèle, ni comparaison ;
              sur un vrai site, il serait communiqué au conseil régional de l&apos;Ordre.
            </p>
            <p>
              Le site ne dit jamais qu&apos;un mur porteur peut être ouvert : il dit ce que la visite
              vérifiera et propose une date. L&apos;outil « Ton mur, en photo » fonctionne dans le
              navigateur : la photo est lue sur l&apos;appareil et n&apos;est jamais envoyée. Les prix sont des
              exemples TTC pour un particulier ; les créneaux de visite et ceux marqués « Pris » sont
              inventés. Les vidéos « le mur de la semaine » supposent l&apos;accord écrit des clients, et
              l&apos;affiche en magasin celui du magasin. Le numéro {bureau.telephone} appartient à une
              tranche que l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse, le SIRET ({bureau.siret})
              et l&apos;assurance sont des exemples.
            </p>
          </>
        }
      />
    </main>
  );
}
