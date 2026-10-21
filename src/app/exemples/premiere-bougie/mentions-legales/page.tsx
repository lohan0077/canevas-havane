import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits · Première Bougie — site de démonstration",
  description: "Première Bougie est un cabinet de recrutement fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/premiere-bougie/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="premiere-bougie"
        entreprise="Première Bougie"
        polices="Fraunces et Outfit"
        enPlus={
          <>
            <p>
              Placement gratuit pour les candidats : aucune rétribution, directe ou indirecte, ne
              peut être exigée des personnes à la recherche d&apos;un emploi en contrepartie de services
              de placement (Code du travail, art. L.5321-3).
            </p>
            <p>
              Le bilan (18 recrues, 15 toujours là, 3 parties) est un exemple ; il est présenté en
              chiffres d&apos;ensemble, jamais par personne, et compte les départs (Code de la
              consommation, art. L.121-3). Aucune promesse de durée n&apos;est faite. Les honoraires
              sont des exemples, hors taxes. Ce site ne contient aucune donnée de candidat, aucun nom
              de personne recrutée ni d&apos;entreprise cliente ; une photo de recrue ne serait publiée
              qu&apos;avec son accord et celui de l&apos;entreprise (Code civil, art. 9). Le téléphone{" "}
              {entreprise.telephone} appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
