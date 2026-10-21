import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { marque } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · L'Addition — site de démonstration",
  description: "L'Addition est une marque de vêtements fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/l-addition/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="l-addition"
      entreprise="L'Addition"
      polices="Archivo et Space Grotesk"
      enPlus={
        <>
          <p>
            Comme le ferait une vraie boutique en ligne, ce site affiche une adresse ({marque.adresse}), un
            numéro SIRET ({marque.siret}) et un téléphone ({marque.telephone}) : trois mentions
            d&apos;exemple. Le numéro appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
          <p>
            Les prix sont affichés toutes taxes comprises, comme pour tout prix proposé à un particulier
            (arrêté du 3 décembre 1987, art. 1) ; l&apos;addition de chaque vêtement tombe juste (hors taxe +
            TVA à 20 % = TTC), avec des montants d&apos;exemple. Le site n&apos;affiche ni promotion, ni compte
            à rebours, ni « dernières pièces » : déclarer faussement qu&apos;un produit ne sera disponible
            que très peu de temps est une pratique commerciale trompeuse (code de la consommation,
            art. L121-4, 7°). Le stock affiché est présenté comme le vrai stock ; ici, c&apos;est un exemple.
          </p>
          <p>
            La date de livraison est écrite avant la commande (code de la consommation, art. L111-1, 3°) :
            le jeudi, calculé à partir du jour de la visite. La composition est visible avant
            l&apos;achat, et « 100 % » n&apos;est employé que pour une fibre unique (règlement (UE)
            n° 1007/2011, art. 7 et 16). Aucune origine n&apos;est revendiquée. L&apos;acheteur dispose de
            quatorze jours pour se rétracter (art. L221-18).
          </p>
          <p>
            L&apos;ouverture de la page d&apos;accueil s&apos;inspire du modèle « Orla Fashion » de la
            bibliothèque MotionSites, transposé à une marque de jeans, sans mannequin.
          </p>
        </>
      }
    />
  );
}
