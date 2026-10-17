import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Dimanche Soir — site de démonstration",
  description: "Dimanche Soir est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/dimanche-soir/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="dimanche-soir"
        entreprise="Dimanche Soir"
        polices="Instrument Serif et Outfit"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait le coach, son adresse et son numéro SIRET.
              Ici, tout est exemple : SIRET 000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de
              l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Ce site ne promet aucun résultat : une pratique commerciale est trompeuse quand
              elle induit en erreur sur « les résultats attendus » d&apos;un service (Code de la
              consommation, art. L121-2). Aucun témoignage n&apos;est publié (art. L121-4). Le
              coaching présenté n&apos;est pas financé par le compte personnel de formation.
            </p>
            <p>
              La question écrite dans la case de l&apos;accueil reste dans votre navigateur. La
              mise en page s&apos;inspire du modèle « Camper Overnight » de la bibliothèque
              MotionSites, transposé à un cabinet de coaching.
            </p>
          </>
        }
      />
    </main>
  );
}
