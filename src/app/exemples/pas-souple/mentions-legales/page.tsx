import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { studio } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Pas Souple — site de démonstration",
  description: "Pas Souple est un studio de pilates fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/pas-souple/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="pas-souple"
        entreprise="Pas Souple"
        polices="Fraunces et Manrope"
        enPlus={
          <>
            <p>
              Ce site ne promet aucun résultat physique, de santé ni de silhouette : il décrit
              les cours, pas ce qu'ils « apportent ». Aucune photo de corps « avant / après »,
              aucun visage : les photos montrent le studio, le matériel, des pieds sur un
              parquet. En cas de douleur ou de problème de santé, l'avis d'un médecin passe
              avant tout cours.
            </p>
            <p>
              Les prix sont des prix TTC d'exemple ; le planning et les prénoms des profs sont
              inventés, et aucune place restante n'est affichée. Le numéro {studio.telephone}{" "}
              appartient à une tranche que l'ARCEP réserve aux œuvres de fiction. La mise en
              page s'inspire du modèle « Wellness Hero » de la bibliothèque MotionSites,
              transposé à un studio de pilates.
            </p>
          </>
        }
      />
    </main>
  );
}
