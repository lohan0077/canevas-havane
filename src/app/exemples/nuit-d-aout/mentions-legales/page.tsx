import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Nuit d'Août — site de démonstration",
  description: "Nuit d'Août est un installateur de climatisation fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/nuit-d-aout/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="nuit-d-aout"
      entreprise="Nuit d'Août"
      polices="Sora et Inter"
      enPlus={
        <>
          <p>
            L&apos;attestation de capacité affichée (n° {entreprise.attestation}, valable jusqu&apos;au{" "}
            {entreprise.validite}) est un exemple. Un vrai installateur qui pose et met en service des
            climatiseurs split doit en être titulaire (code de l&apos;environnement, art. R543-78 et
            R543-99) ; rien ne l&apos;oblige à l&apos;afficher, mais elle se vérifie.
          </p>
          <p>
            Le délai de pose affiché en haut de chaque page et son historique sont des exemples ; un vrai
            site n&apos;afficherait que le délai réel, mis à jour, jamais gonflé. Les fourchettes sont des
            prix TTC d&apos;exemple, pose comprise ; le prix ferme vient au devis. Ce site parle de
            climatisation pour rafraîchir.
          </p>
          <p>
            L&apos;adresse, {entreprise.adresse}, est une adresse d&apos;exemple ; le numéro{" "}
            {entreprise.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            La mise en page s&apos;inspire du modèle « Mindful Companion » de la bibliothèque MotionSites,
            transposé à un installateur de climatisation.
          </p>
        </>
      }
    />
  );
}
