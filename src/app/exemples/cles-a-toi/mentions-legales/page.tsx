import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { ecole } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Clés à Toi — site de démonstration",
  description: "Clés à Toi est une auto-école fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/cles-a-toi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="cles-a-toi"
        entreprise="Clés à Toi"
        polices="Outfit et Newsreader"
        enPlus={
          <>
            <p>
              Comme toute publicité d'auto-école, ce site affiche le nom, l'adresse et le
              numéro d'agrément de l'établissement (arrêté du 19 juin 1987, art. 3) : ici,{" "}
              {ecole.nom}, {ecole.adresse}, agrément n° {ecole.agrement}, trois mentions
              d'exemple. La formule donne la répartition des heures, les frais inclus, les
              heures en plus du minimum et les frais à la charge de l'élève, en prix TTC
              d'exemple.
            </p>
            <p>
              Aucun objet n'est offert à l'inscription : le permis B peut être financé par le
              compte personnel de formation, et le Code du travail interdit alors toute offre
              en échange d'une inscription (art. L6323-8-1). Le trousseau n'existe que sur le
              site. Aucun taux de réussite n'est affiché.
            </p>
            <p>
              Le numéro {ecole.telephone} appartient à une tranche que l'ARCEP réserve aux
              œuvres de fiction. La mise en page s'inspire du modèle « Evergreen Finance » de
              la bibliothèque MotionSites, transposé à une auto-école.
            </p>
          </>
        }
      />
    </main>
  );
}
