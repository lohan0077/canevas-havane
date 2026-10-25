import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — À la Prochaine, site de démonstration",
  description: "À la Prochaine est une marque de bijoux fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/a-la-prochaine/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage libelle="À la Prochaine · site de démonstration" titre="Ce qui est *inventé.*" titreEnParagraphe />
      <MentionsDemonstration
        site="a-la-prochaine"
        entreprise="À la Prochaine"
        polices="Instrument Serif et Manrope"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des créatrices de bijoux : « Créer une marque » (le nom, le numéro gravé, le
              registre et sa ligne vide, la question posée aux réseaux) et « Remplir l&apos;agenda » (une page par pièce,
              le film de sa fabrication, le tampon « Partie », la sortie du vendredi à 18 h).
            </p>
            <p>
              Ce qu&apos;un vrai site de créatrice afficherait ici, avec des valeurs d&apos;exemple : entreprise
              individuelle, SIRET 000 000 000 00000 (exemple) ; médiateur de la consommation : nom et adresse du
              médiateur choisi (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse est inventée.
            </p>
            <p>
              Le registre publie un prénom et une année : ce sont des données personnelles. Un vrai registre ne les
              publierait qu&apos;avec le consentement de chaque personne (RGPD, art. 6 et 7), retirable à tout moment,
              sans nom de famille ni ville. Les prénoms montrés ici sont inventés. La page d&apos;une pièce partie ne
              montre jamais le nom ni la ville de qui l&apos;a achetée.
            </p>
            <p>
              Pièces uniques : l&apos;idée du site ne tient que si chaque numéro n&apos;est vraiment fabriqué qu&apos;une
              fois — une fausse rareté serait une pratique commerciale trompeuse (code de la consommation, art. L121-2 et
              L121-4). Le numéro gravé n&apos;est pas un poinçon : les ouvrages en argent et en or portent les poinçons
              prévus par le code général des impôts (art. 521 et suivants). Vente à distance : quatorze jours pour se
              rétracter (art. L221-18). Prix affichés toutes taxes comprises, d&apos;exemple. La lettre du vendredi
              supposerait le consentement préalable de l&apos;abonnée (code des postes et des communications
              électroniques, art. L34-5) ; ici, rien n&apos;est envoyé. Le film de fabrication est remplacé par des
              photos : la marque est fictive.
            </p>
          </>
        }
      />
    </main>
  );
}
