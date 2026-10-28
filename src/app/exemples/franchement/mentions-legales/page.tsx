import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Franchement — site de démonstration",
  description: "Franchement est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/franchement/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="franchement"
        entreprise="Franchement"
        polices="Bricolage Grotesque et Inter"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait le coach, son adresse et son numéro
              SIRET. Ici, tout est exemple : {entreprise.coach} n&apos;existe pas, SIRET
              000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le
              téléphone affiché, {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP
              réserve aux œuvres de fiction.
            </p>
            <p>
              Coach n&apos;est pas une profession réglementée, et ce site ne promet aucun
              résultat : une pratique commerciale est trompeuse quand elle induit en erreur sur
              « les résultats attendus » d&apos;un service (Code de la consommation, art. L121-2).
              Aucun témoignage n&apos;est publié (art. L121-4). Le coach ne se présente ni comme
              psychologue, ni comme médecin, et n&apos;établit aucun diagnostic.
            </p>
            <p>
              Le 3114 (numéro national de prévention du suicide), le 15 et le 112 sont de vrais
              numéros d&apos;urgence, cités pour ce qu&apos;ils sont. La mise en page s&apos;inspire du
              modèle « Mindora » de la bibliothèque MotionSites, transposé à un cabinet de
              coaching.
            </p>
          </>
        }
      />
    </main>
  );
}
