import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Pavillon Bis, site de démonstration",
  description: "Pavillon Bis est une agence d'architecture fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/pavillon-bis/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="pavillon-bis"
        entreprise="Pavillon Bis"
        polices="Outfit et Lora"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux architectes. Ici,
              elles sont des exemples : architecte inscrit au tableau régional de l&apos;Ordre des
              architectes, conseil régional d&apos;exemple, numéro national 000000 ; titre
              professionnel : architecte, diplôme délivré en France ; règles professionnelles :
              code de déontologie des architectes (annexe du décret n° 80-217 du 20 mars 1980,
              modifié) ; assurance de responsabilité professionnelle souscrite auprès d&apos;un
              assureur d&apos;exemple (loi n° 77-2 du 3 janvier 1977, art. 16).
            </p>
            <p>
              Les maisons, le lotissement des Tilleuls, les avant / après et la visite du n° 14 sont
              des exemples dessinés : aucune vraie maison, aucune adresse. Sur un vrai site, ils ne
              sont publiés qu&apos;avec l&apos;accord écrit des propriétaires (code civil, art. 9). Le
              téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
