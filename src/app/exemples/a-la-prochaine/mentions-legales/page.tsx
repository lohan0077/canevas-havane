import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "À la Prochaine — site de démonstration",
  description: "À la Prochaine est une marque de bijoux fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="a-la-prochaine"
        entreprise="À la Prochaine"
        polices="Bodoni Moda et Manrope"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de marque de bijoux afficherait ici, avec des valeurs
              d&apos;exemple : SAS au capital de 1 000 € (exemple), RCS 000 000 000 (exemple),
              TVA intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation
              (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Le registre publie un prénom et une année : ce sont des données personnelles. Un vrai
              registre ne les publierait qu&apos;avec le consentement de chaque personne (RGPD,
              art. 6 et 7), retirable à tout moment, sans nom de famille ni ville. Les prénoms
              montrés ici sont inventés.
            </p>
            <p>
              Le numéro gravé n&apos;est pas un poinçon : les ouvrages en or portent les poinçons
              prévus par le code général des impôts (art. 521 et suivants). Vente à distance :
              quatorze jours pour se rétracter (code de la consommation, art. L221-18). Une photo
              d&apos;abonné n&apos;est repartagée qu&apos;avec son accord (droit à l&apos;image et
              droit d&apos;auteur). Aucune fausse rareté, aucune « édition limitée ».
            </p>
            <p>
              Le premier écran s&apos;inspire du modèle « Ancient Oath » de MotionSites (mise en
              page transposée, aucun texte ni image repris).
            </p>
          </>
        }
      />
    </div>
  );
}
