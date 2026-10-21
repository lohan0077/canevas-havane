import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { FRANCE_RENOV, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · L'Heure Dite — site de démonstration",
  description: "L'Heure Dite est une entreprise fictive : qui a réalisé ce site de démonstration, les règles du secteur qu'il applique, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/l-heure-dite/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="l-heure-dite"
      entreprise="L'Heure Dite"
      polices="Bodoni Moda et Work Sans"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page nommerait l'entreprise, son adresse et son numéro SIRET.
            Ici, tout est exemple&nbsp;: SIRET {entreprise.siret}, 12 rue de l'Exemple, 00000
            Exemple-Ville. Le téléphone affiché, {entreprise.telephone}, appartient à la tranche
            que l'ARCEP réserve aux œuvres de fiction. Qualification RGE n°&nbsp;{entreprise.rge} et
            assurance décennale n°&nbsp;{entreprise.decennale}&nbsp;: numéros d'exemple.
          </p>
          <p>
            <strong>France Rénov'.</strong> Un site qui propose des travaux de rénovation
            énergétique comporte un lien vers le service public de la performance énergétique de
            l'habitat (Code de la consommation, art. L122-26). Le message de l'annexe I de l'arrêté
            du 7 juillet 2026 est reproduit sans changement en tête de chaque page et renvoie vers{" "}
            {FRANCE_RENOV.lien}&nbsp;; il figure aussi en bas de l'affiche, comme sur toute publicité
            pour ces travaux depuis le 1er octobre 2026. Un vrai site y place la bannière officielle,
            selon la charte de l'annexe III&nbsp;; ce site de démonstration en donne une version texte.
          </p>
          <p>
            <strong>Démarchage.</strong> Pour ces travaux, la prospection d'un particulier par
            téléphone, SMS, e-mail ou réseaux sociaux est interdite à tous les professionnels, sauf
            contrat en cours (art. L223-1 et L223-8). Le site le dit comme une règle pour tous, jamais
            comme un avantage de l'entreprise, ce qui serait trompeur (art. L121-4, 10°). Ce que la
            marque promet en plus — le jour et l'heure choisis par le client — reste dans le cadre du
            rappel sur demande&nbsp;: dans les cinq jours ouvrables, au sujet de la demande seulement
            (art. R223-4), à une date et une heure précisément convenues (art. L223-1).
          </p>
          <p>
            <strong>Aides et prix.</strong> Aucune aide n'est chiffrée ni promise. Les prix affichés
            sont des exemples, TTC, pose comprise&nbsp;; le prix ferme figure au devis écrit, après
            la visite.
          </p>
          <p>
            Le premier écran s'inspire du modèle « Book Hero » de la bibliothèque MotionSites,
            transposé à une marque de pompes à chaleur.
          </p>
        </>
      }
    />
  );
}
