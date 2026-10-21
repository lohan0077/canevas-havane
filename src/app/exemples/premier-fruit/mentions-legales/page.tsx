import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { CONTACT } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Premier Fruit — site de démonstration",
  description: "Premier Fruit est une pépinière fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/premier-fruit/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="premier-fruit"
        entreprise="Premier Fruit"
        polices="DM Serif Display et Figtree"
        enPlus={
          <>
            <p>
              Ce que dirait une vraie pépinière qui vend à distance, ici avec des numéros d&apos;exemple : inscription
              au registre officiel des opérateurs professionnels (n° FR 00000 · exemple) et autorisation de délivrer le
              passeport phytosanitaire, au titre du règlement (UE) 2016/2031 (articles 65, 84 et 89) ; déclaration
              annuelle d&apos;activité auprès de la DRAAF. SIRET 000 000 000 00000 · exemple.
            </p>
            <p>
              Les passeports montrés sur le site portent des valeurs d&apos;exemple. Les années de première récolte sont
              des estimations d&apos;exemple : elles dépendent de la variété, du porte-greffe, de l&apos;âge du plant et du
              sol. Le numéro {CONTACT.telephone} appartient à la tranche que l&apos;ARCEP réserve à la fiction ;
              l&apos;adresse est inventée.
            </p>
            <p>
              Premier écran inspiré du modèle « Cinematic Landing Page » de la bibliothèque MotionSites, transposé à une
              pépinière. Fruits, arbres et étiquettes dessinés pour ce site.
            </p>
          </>
        }
      />
    </main>
  );
}
