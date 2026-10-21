import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { ecole } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Premier Trajet — site de démonstration",
  description: "Premier Trajet est une auto-école fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/premier-trajet/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="premier-trajet"
        entreprise="Premier Trajet"
        polices="Archivo et Inter"
        enPlus={
          <>
            <p>
              Comme toute publicité d'auto-école, ce site affiche le nom, l'adresse et le
              numéro d'agrément de l'établissement (arrêté du 19 juin 1987, art. 3) : ici,{" "}
              {ecole.nom}, {ecole.adresse}, agrément n° {ecole.agrement}. Ces trois mentions
              sont des exemples, l'agrément n'existe pas. Le forfait affiché donne la
              répartition des heures, les frais inclus, les heures en plus du minimum et les
              frais restant à la charge de l'élève, en prix TTC d'exemple.
            </p>
            <p>
              Aucun taux de réussite n'est affiché : une école fictive n'en a pas. Celui des
              vraies auto-écoles est publié par l'État, sur la carte des auto-écoles de la
              Sécurité routière.
            </p>
            <p>
              Le numéro {ecole.telephone} appartient à la tranche que l'ARCEP réserve aux
              œuvres de fiction. La mise en page s'inspire du modèle « Axle Journey » de la
              bibliothèque MotionSites, transposé à une auto-école.
            </p>
          </>
        }
      />
    </main>
  );
}
