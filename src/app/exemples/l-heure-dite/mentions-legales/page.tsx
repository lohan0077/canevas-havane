import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { FRANCE_RENOV, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — L'Heure Dite, site de démonstration",
  description:
    "L'Heure Dite est un installateur de pompes à chaleur et de panneaux solaires fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/l-heure-dite/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="pt-24">
      <MentionsDemonstration
        site="l-heure-dite"
        entreprise="L'Heure Dite"
        polices="Bodoni Moda et Work Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos du métier : « Créer une marque » (le nom, l&apos;heure de l&apos;appel
              choisie par le client, l&apos;affiche et son message France Rénov&apos;) et « Remplir l&apos;agenda » (le toit
              heure par heure et le conseil « lance la machine », le rappel seulement sur demande et sous cinq jours
              ouvrables, le lien France Rénov&apos; tout en haut). Il remplace le site « Midi Pile », qui montrait la
              seconde.
            </p>
            <p>
              Sur un vrai site, cette page nommerait l&apos;entreprise, son adresse et son numéro SIRET. Ici, tout est
              exemple : SIRET {entreprise.siret}, {entreprise.adresse}. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction. Qualification RGE n°&nbsp;
              {entreprise.rge} et assurance décennale n°&nbsp;{entreprise.decennale} : numéros d&apos;exemple.
            </p>
            <p>
              <strong>France Rénov&apos;.</strong> Un site qui propose des travaux de rénovation énergétique ou de
              production d&apos;énergie renouvelable comporte un lien vers le service public de la performance
              énergétique de l&apos;habitat (Code de la consommation, art. L122-26). Le message de l&apos;annexe I de
              l&apos;arrêté du 7 juillet 2026 est reproduit sans changement en tête de chaque page et renvoie vers{" "}
              {FRANCE_RENOV.lien} ; il figure aussi en bas de l&apos;affiche, comme sur toute publicité pour ces
              travaux depuis le 1er octobre 2026. Un vrai site y place la bannière officielle, selon la charte de
              l&apos;annexe III ; ce site de démonstration en donne une version texte.
            </p>
            <p>
              <strong>Démarchage.</strong> Pour ces travaux, la prospection d&apos;un particulier par téléphone, SMS,
              e-mail ou réseaux sociaux est interdite à tous les professionnels, sauf contrat en cours (art. L223-1
              et L223-8). Le site le dit comme une règle pour tous, jamais comme un avantage de l&apos;entreprise, ce
              qui serait trompeur (art. L121-4, 10°). Ce que la marque promet en plus — le jour et l&apos;heure choisis
              par le client — reste dans le cadre du rappel sur demande : dans les cinq jours ouvrables, au sujet de
              la demande seulement (art. R223-4), à une date et une heure précisément convenues (art. L223-1).
            </p>
            <p>
              <strong>Aides, économies et prix.</strong> Aucune aide n&apos;est chiffrée ni promise, aucune économie
              n&apos;est annoncée. La courbe « Ton toit, heure par heure » est une forme indicative (une cloche
              centrée sur le midi solaire, décalée selon l&apos;orientation), pas une mesure ni une promesse de
              production. Les prix affichés sont des exemples, TTC, pose comprise ; le prix ferme figure au devis
              écrit, après la visite.
            </p>
          </>
        }
      />
    </main>
  );
}
