import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Voix Basse, site de démonstration",
  description: "Voix Basse est un cabinet vétérinaire fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/voix-basse/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="voix-basse"
        entreprise="Voix Basse"
        polices="Instrument Serif, Manrope et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux vétérinaires. Ici,
              elles sont des exemples : vétérinaires inscrits au tableau de l&apos;Ordre des
              vétérinaires, conseil régional d&apos;exemple, numéros ordinaux 00000 et 00000 ;
              titre professionnel : docteur vétérinaire, diplôme délivré en France ; règles
              professionnelles : code de déontologie vétérinaire (Code rural et de la pêche
              maritime, articles R242-32 et suivants) ; assurance de responsabilité civile
              professionnelle souscrite auprès d&apos;un assureur d&apos;exemple.
            </p>
            <p>
              Le site dit « cabinet vétérinaire » : l&apos;appellation « clinique vétérinaire » est
              réservée aux établissements qui en remplissent les conditions (Code rural,
              art. R242-54). Il ne publie ni avis ni comparaison avec un autre cabinet
              (art. R242-35) : « Ici, on parle bas » décrit ce cabinet, et rien d&apos;autre. Le
              téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
