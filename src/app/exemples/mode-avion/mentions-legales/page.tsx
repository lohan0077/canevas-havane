import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { salle } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Mode Avion — site de démonstration",
  description: "Mode Avion est une salle de sport fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/mode-avion/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="mode-avion"
        entreprise="Mode Avion"
        polices="Sora et DM Sans"
        enPlus={
          <>
            <p>
              Ce site ne promet aucun résultat physique, de santé ni de silhouette, et ne
              montre aucune photo de corps « avant / après ». Le nombre de séances affiché est
              un calcul sur le temps d'écran que tu saisis toi-même (une heure d'écran, une
              séance d'une heure) : ni une statistique, ni une promesse. Rien n'est envoyé.
            </p>
            <p>
              Les prix sont des prix TTC d'exemple, sans réduction à durée limitée ; aucun
              abonnement ni engagement n'est proposé sur ce site. La règle du casier figure,
              dans l'idée, au règlement intérieur accepté à l'inscription, avec un numéro
              d'accueil joignable en urgence ({salle.accueil}, tranche que l'ARCEP réserve aux
              œuvres de fiction). « Mode avion » désigne aussi une fonction des téléphones ;
              la marque est fictive. La mise en page s'inspire du modèle « Sky Estate » de la
              bibliothèque MotionSites, transposé à une salle de sport.
            </p>
          </>
        }
      />
    </main>
  );
}
