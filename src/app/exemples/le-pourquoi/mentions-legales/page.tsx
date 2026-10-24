import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Le Pourquoi, site de démonstration",
  description: "Le Pourquoi est un cabinet d'ostéopathie fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/le-pourquoi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      {/* Le haut sombre que l'en-tête attend ; le titre de la page est plus bas. */}
      <EnTetePage surtitre="Mentions légales" titre="Un cabinet *fictif.*" titreBalise="p">
        {cabinet.nom} n&apos;existe pas : la praticienne, l&apos;adresse, les prix et les créneaux
        sont inventés pour les vidéos de Canevas Havane.
      </EnTetePage>
      <MentionsDemonstration
      site="le-pourquoi"
      entreprise="Le Pourquoi"
      polices="Newsreader, Inter et Outfit"
      enPlus={
        <>
          <p>
            La praticienne, {cabinet.praticienne}, n&apos;existe pas. Son titre et son diplôme
            sont affichés comme un ostéopathe doit le faire, sur sa plaque et sur tout document
            (décret n° 2007-435 du 25 mars 2007, art. 14) : diplôme et numéro ADELI{" "}
            {cabinet.adeli} sont des exemples.
          </p>
          <p>
            Les pages des gestes sont des textes d&apos;exemple : elles décrivent une pratique,
            sans conseil médical ni promesse de résultat. Aucun témoignage, aucune note, aucune
            image de patient. Les dates des « questions de la semaine » sont un calendrier
            d&apos;exemple.
          </p>
          <p>
            Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
            œuvres de fiction. L&apos;adresse est inventée. La prise de rendez-vous ne demande
            aucun motif de consultation.
          </p>
          <p>
            Ce site réunit les deux vidéos des ostéopathes : « Créer une marque » (le nom, les
            gestes expliqués) et « Remplir l&apos;agenda » (ce que je ne fais pas, le prix affiché,
            les créneaux de 7 h et de 20 h).
          </p>
        </>
      }
    />
    </main>
  );
}
