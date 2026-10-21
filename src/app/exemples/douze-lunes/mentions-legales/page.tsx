import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Douze Lunes, site de démonstration",
  description: "Douze Lunes est un cabinet vétérinaire fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/douze-lunes/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="douze-lunes"
        entreprise="Douze Lunes"
        polices="DM Serif Display et Figtree"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page porterait les mentions propres aux vétérinaires.
              Ici, elles sont des exemples : vétérinaires inscrits au tableau de l&apos;Ordre des
              vétérinaires, conseil régional d&apos;exemple, numéros ordinaux 00000 et 00000 ;
              titre professionnel : docteur vétérinaire, diplôme délivré en France ; règles
              professionnelles : code de déontologie vétérinaire (Code rural et de la pêche
              maritime, articles R242-32 et suivants) ; assurance de responsabilité civile
              professionnelle souscrite auprès d&apos;un assureur d&apos;exemple.
            </p>
            <p>
              Le site dit « cabinet vétérinaire » : l&apos;appellation « clinique vétérinaire » est
              réservée aux établissements qui en remplissent les conditions (Code rural,
              art. R242-54). Il ne publie ni avis ni comparaison (art. R242-35). La garde de nuit
              est assurée, sur un vrai site, par une convention entre vétérinaires (art. R242-48) ;
              le service de garde montré ici est fictif, comme ses numéros, qui appartiennent à la
              tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
