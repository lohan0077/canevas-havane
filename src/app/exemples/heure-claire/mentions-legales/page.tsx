import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Heure Claire, site de démonstration",
  description: "Heure Claire est un cabinet d'expertise comptable fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/heure-claire/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="heure-claire"
        entreprise="Heure Claire"
        polices="Newsreader et Archivo"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres à l&apos;expertise
              comptable. Ici, elles sont des exemples : société d&apos;expertise comptable inscrite
              au tableau de l&apos;Ordre des experts-comptables, conseil régional d&apos;exemple,
              numéro d&apos;inscription 00 000 000 ; titre professionnel : expert-comptable,
              diplôme délivré en France ; règles professionnelles : code de déontologie des
              professionnels de l&apos;expertise comptable (décret n° 2012-432 du 30 mars 2012) ;
              assurance de responsabilité civile professionnelle souscrite auprès d&apos;un
              assureur d&apos;exemple.
            </p>
            <p>
              Le site ne se compare à aucun autre cabinet (décret n° 2012-432, art. 152). Le
              délai de réponse et les honoraires affichés sont des exemples ; sur un vrai site,
              ils doivent être exacts et justifiables, et les honoraires sont convenus par écrit
              avant toute mission. Le téléphone affiché appartient à la tranche que l&apos;ARCEP
              réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
