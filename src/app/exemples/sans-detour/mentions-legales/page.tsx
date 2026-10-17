import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Sans Détour, site de démonstration",
  description: "Sans Détour est un cabinet d'ostéopathie fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/sans-detour/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="sans-detour"
      entreprise="Sans Détour"
      polices="Manrope et Instrument Serif"
      enPlus={
        <>
          <p>
            Le praticien, {cabinet.praticien}, n&apos;existe pas. Son titre et son diplôme sont
            affichés comme un ostéopathe doit le faire, sur sa plaque et sur tout document
            (décret n° 2007-435 du 25 mars 2007, art. 14) : « {cabinet.titre} », diplôme et
            numéro ADELI {cabinet.adeli} sont des exemples.
          </p>
          <p>
            Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
            œuvres de fiction. L&apos;adresse est inventée.
          </p>
          <p>
            Aucune donnée de santé n&apos;est demandée : l&apos;agenda ne demande ni motif de
            consultation, ni antécédent. Aucun témoignage ni aucune note de patient n&apos;est
            affiché, et le site ne promet aucun résultat.
          </p>
          <p>
            La mise en page du premier écran s&apos;inspire du modèle « KnowSugar » de la
            bibliothèque MotionSites, transposé à un cabinet d&apos;ostéopathie.
          </p>
        </>
      }
    />
  );
}
