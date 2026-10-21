import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits · Chaise Pleine — site de démonstration",
  description: "Chaise Pleine est un cabinet de recrutement fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/chaise-pleine/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="[&_h1]:font-extrabold [&_h2]:font-extrabold">
      <MentionsDemonstration
        site="chaise-pleine"
        entreprise="Chaise Pleine"
        polices="Archivo et Inter"
        enPlus={
          <>
            <p>
              Placement gratuit pour les candidats : aucune rétribution, directe ou indirecte, ne
              peut être exigée des personnes à la recherche d&apos;un emploi en contrepartie de services
              de placement (Code du travail, art. L.5321-3).
            </p>
            <p>
              Les honoraires affichés sont des exemples, hors taxes : les clients d&apos;un cabinet sont
              des entreprises. Le calcul des heures repose sur la durée légale du travail à temps
              complet, 35 heures par semaine (Code du travail, art. L.3121-27) ; ce n&apos;est pas une
              estimation du coût d&apos;un poste vacant. Aucun délai de recrutement n&apos;est promis.
              Ce site ne contient aucune donnée de candidat, aucun nom de personne recrutée ni
              d&apos;entreprise cliente. Le téléphone {entreprise.telephone} appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
