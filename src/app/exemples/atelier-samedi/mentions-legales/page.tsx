import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Atelier Samedi, site de démonstration",
  description: "Atelier Samedi est une agence d'architecture fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/atelier-samedi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="atelier-samedi"
        entreprise="Atelier Samedi"
        polices="Space Grotesk et Work Sans"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux architectes. Ici,
              elles sont des exemples : architecte inscrite au tableau régional de l&apos;Ordre des
              architectes, conseil régional d&apos;exemple, numéro national 000000 ; titre
              professionnel : architecte, diplôme délivré en France ; règles professionnelles :
              code de déontologie des architectes (annexe du décret n° 80-217 du 20 mars 1980,
              modifié) ; assurance de responsabilité professionnelle souscrite auprès d&apos;un
              assureur d&apos;exemple (loi n° 77-2 du 3 janvier 1977, art. 16).
            </p>
            <p>
              Le calcul « Architecte ou pas ? » applique le seuil de 150 m² de surface de plancher
              pour un particulier qui construit pour lui-même, et seulement quand un permis de
              construire est nécessaire (code de l&apos;urbanisme, art. R431-2 et R*421-14) : c&apos;est
              une première réponse, pas un avis sur un dossier. Les projets, leurs budgets et leurs
              plans sont des exemples. Le téléphone affiché appartient à la tranche que l&apos;ARCEP
              réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
