import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { brulerie } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Pas Quinze, site de démonstration",
  description: "Pas Quinze est un torréfacteur fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/pas-quinze/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="pas-quinze"
        entreprise="Pas Quinze"
        polices="Unbounded et Manrope"
        enPlus={
          <>
            <p>
              Mentions qu&apos;afficherait la vraie brûlerie, ici avec des valeurs
              d&apos;exemple : Pas Quinze, SIRET 000 000 000 00000 (exemple),{" "}
              {brulerie.adresse} (adresse fictive). Le téléphone {brulerie.telephone}{" "}
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les cafés, leurs descriptions, les moutures conseillées, les prix (TTC) et les
              rythmes d&apos;abonnement sont des exemples. Le site ne parle que de café et ne
              prête au café aucun effet : il décrit un goût, jamais un bienfait. Le calcul
              de l&apos;abonnement (7 g par tasse) est un repère, pas une recommandation de
              consommation. Une vraie brûlerie qui ouvre un abonnement en ligne doit
              permettre de le résilier en ligne.
            </p>
          </>
        }
      />
    </div>
  );
}
