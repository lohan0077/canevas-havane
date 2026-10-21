import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Après Vous — site de démonstration",
  description: "Après Vous est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/apres-vous/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="apres-vous"
      entreprise="Après Vous"
      polices="Instrument Serif et Manrope"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro SIRET.
            Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de l'Exemple, 00000
            Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
            l'ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            <strong>Les agents.</strong> Aucune donnée nominative : ni nom, ni prénom, ni visage —
            « {entreprise.equipe} ». Les silhouettes sont dessinées. Publier le prénom ou la photo d'un
            salarié demanderait son accord écrit, libre et retirable (Code civil, art. 9 ; RGPD).
          </p>
          <p>
            <strong>Prix.</strong> Le site s'adresse à des professionnels : les prix sont affichés hors
            taxes, et le site le dit. Ce sont des exemples ; le prix ferme vient au devis, après visite.
            « Vous ne nous verrez jamais » décrit l'horaire de passage de tous les contrats de
            l'entreprise imaginée : le soir, après le départ du client.
          </p>
          <p>
            La mise en page s'inspire du modèle « Luxury Botanical » de la bibliothèque MotionSites,
            transposé à des bureaux la nuit.
          </p>
        </>
      }
    />
  );
}
