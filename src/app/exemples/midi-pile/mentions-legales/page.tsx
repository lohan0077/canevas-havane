import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { FRANCE_RENOV, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Midi Pile — site de démonstration",
  description: "Midi Pile est une entreprise fictive : qui a réalisé ce site de démonstration, les règles du secteur qu'il applique, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/midi-pile/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <>
      <MentionsDemonstration
        site="midi-pile"
        entreprise="Midi Pile"
        polices="Outfit et DM Sans"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro
              SIRET. Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de l'Exemple,
              00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la
              tranche que l'ARCEP réserve aux œuvres de fiction. Qualification RGE n°&nbsp;{entreprise.rge}
              et assurance décennale n°&nbsp;{entreprise.decennale} : numéros d'exemple.
            </p>
            <p>
              <strong>France Rénov'.</strong> Un site qui propose des travaux de rénovation
              énergétique comporte un lien vers le service public de la performance énergétique
              de l'habitat (Code de la consommation, art. L122-26) ; l'arrêté du 7 juillet 2026
              l'étend aux travaux de production d'énergie renouvelable et en fixe la forme. Le
              message de son annexe I est reproduit sans changement en tête de chaque page, et
              renvoie vers {FRANCE_RENOV.lien}. Un vrai site y place la bannière officielle, selon
              la charte de l'annexe III ; ce site de démonstration en donne une version texte.
            </p>
            <p>
              <strong>Démarchage.</strong> Pour ces travaux, la prospection d'un particulier par
              téléphone, SMS, e-mail ou réseaux sociaux est interdite à tous les professionnels,
              sauf contrat en cours (art. L223-1 et L223-8). Le site le présente comme ce que c'est
              — une règle pour tous — et non comme un avantage propre à l'entreprise, ce qui
              serait trompeur (art. L121-4, 10°). Le rappel n'a lieu que sur demande, dans les cinq
              jours ouvrables, et seulement au sujet de la demande (art. R223-4).
            </p>
            <p>
              <strong>Aides et prix.</strong> Aucune aide n'est chiffrée ni promise. Les prix
              affichés sont des exemples, TTC, pose comprise ; le prix ferme figure au devis écrit.
              La courbe de « Ma journée » est une forme indicative, pas une mesure ni une promesse
              de production.
            </p>
            <p>
              Le premier écran s'inspire du modèle « Solar Energy Hero » de la bibliothèque
              MotionSites, transposé en plein jour.
            </p>
          </>
        }
      />
    </>
  );
}
