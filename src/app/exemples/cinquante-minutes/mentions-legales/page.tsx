import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Cinquante Minutes, site de démonstration",
  description: "Cinquante Minutes est un cabinet de psychologue fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      {/* Le haut sombre que l'en-tête attend ; le titre de la page est plus bas. */}
      <EnTetePage surtitre="Mentions légales" titre="Ce qui est vrai, *ce qui est inventé.*" titreBalise="p" />
      <MentionsDemonstration
        site="cinquante-minutes"
        entreprise="Cinquante Minutes"
        polices="Bodoni Moda et Work Sans"
        enPlus={
          <>
            <p>
              La psychologue, {cabinet.psychologue}, n&apos;existe pas. Le titre de psychologue est
              protégé (loi n° 85-772 du 25 juillet 1985, art. 44) : il est affiché, plus gros que
              le nom de la marque, avec le diplôme et le numéro ADELI {cabinet.adeli}, qui sont
              des exemples. Le partenariat Mon soutien psy est lui aussi un exemple ; le
              dispositif est décrit sur ameli.fr, sans chiffre qui pourrait changer.
            </p>
            <p>
              L&apos;horloge décrit un déroulé de séance, pas un résultat. Aucun témoignage, aucune
              note, aucune promesse thérapeutique. La prise de rendez-vous ne demande aucun motif
              de consultation : c&apos;est une donnée de santé (RGPD, art. 4 (15) et 9), et le site
              n&apos;en recueille aucune. La soirée porte ouverte porte une vraie date mais
              n&apos;aura pas lieu : le cabinet est fictif.
            </p>
            <p>
              Le téléphone {cabinet.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction. L&apos;adresse est inventée. Les numéros d&apos;urgence affichés sont
              réels : le 15 (SAMU) et le 3114 (numéro national de prévention du suicide).
            </p>
            <p>
              Ce site réunit les deux vidéos des psychologues : « Créer une marque » (le nom, le
              titre plus gros que tout, l&apos;horloge de la première séance, la porte ouverte) et
              « Remplir l&apos;agenda » (le rendez-vous en trois clics sans motif, Mon soutien psy
              dès l&apos;accueil, la carte bancaire acceptée).
            </p>
          </>
        }
      />
    </main>
  );
}
