import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Deux Heures — site de démonstration",
  description: "Deux Heures est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/deux-heures/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="deux-heures"
        entreprise="Deux Heures"
        polices="Unbounded et Manrope"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait l&apos;entreprise du DJ, son adresse et son
              numéro SIRET. Ici, tout est exemple : SIRET {entreprise.siret}, 12 rue de
              l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les prix sont toutes taxes comprises, pour des particuliers, et sont des exemples.
              L&apos;heure de fin de la musique est toujours « selon la salle » : le règlement de la
              salle et les règles locales sur le bruit la fixent, pas le DJ.
            </p>
            <p>
              Les samedis « libres » et « pris » sont des exemples ; la grille ne change que
              lorsqu&apos;une date est réservée, jamais pour presser le visiteur (Code de la
              consommation, art. L. 121-4, 7°). Aucun avis, aucune note, aucun témoignage
              n&apos;est affiché (même article, 27° et 28°). Aucune photo, aucune vidéo d&apos;un
              mariage n&apos;est publiée sans l&apos;accord écrit des personnes reconnaissables
              (Code civil, art. 9).
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « DJ ZakDerdan » de la bibliothèque
              MotionSites, transposé à un DJ de mariage.
            </p>
          </>
        }
      />
    </div>
  );
}
