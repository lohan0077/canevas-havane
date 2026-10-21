import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { CONTACT } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ombre Lente — site de démonstration",
  description: "Ombre Lente est une pépinière fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/ombre-lente/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="ombre-lente"
        entreprise="Ombre Lente"
        polices="Instrument Serif et Manrope"
        enPlus={
          <>
            <p>
              Ce que dirait une vraie pépinière qui vend à distance, ici avec des numéros d&apos;exemple : inscription
              au registre officiel des opérateurs professionnels (n° FR 00000 · exemple) et autorisation de délivrer le
              passeport phytosanitaire, au titre du règlement (UE) 2016/2031 (articles 65, 84 et 89) ; déclaration
              annuelle d&apos;activité auprès de la DRAAF. SIRET 000 000 000 00000 · exemple.
            </p>
            <p>
              Les hauteurs, les ombres et les années affichées sont des simulations d&apos;exemple, pas des promesses :
              la croissance d&apos;un arbre dépend de l&apos;essence, du sol, de l&apos;eau et de la taille. Les passeports
              montrés portent des valeurs d&apos;exemple. Le numéro {CONTACT.telephone} appartient à la tranche que
              l&apos;ARCEP réserve à la fiction ; l&apos;adresse est inventée.
            </p>
            <p>
              Premier écran inspiré du modèle « Evergreen Finance » de la bibliothèque MotionSites, transposé à une
              pépinière. Branches, arbres et étiquettes dessinés pour ce site.
            </p>
          </>
        }
      />
    </main>
  );
}
