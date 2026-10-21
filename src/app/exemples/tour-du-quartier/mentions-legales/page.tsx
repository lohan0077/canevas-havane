import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Tour du Quartier — site de démonstration",
  description: "Tour du Quartier est un magasin de vélos fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="tour-du-quartier"
        entreprise="Tour du Quartier"
        polices="Bricolage Grotesque et Figtree"
        enPlus={
          <>
            <p>
              Ce qu&apos;un vrai site de magasin de vélos afficherait ici, avec des valeurs
              d&apos;exemple : SAS au capital de 5 000 € (exemple), RCS 000 000 000 (exemple),
              TVA intracommunautaire FR 00 000000000 (exemple) ; médiateur de la consommation
              (exemple). Le téléphone affiché, {entreprise.telephone}, appartient à la tranche que
              l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les vélos vendus par un commerçant, neufs ou d&apos;occasion, sont marqués et inscrits
              au fichier national des cycles identifiés (code des transports, art. L1271-2). Le
              casque est obligatoire à vélo pour les moins de douze ans ; il est prêté à tous.
              L&apos;assistance d&apos;un vélo électrique s&apos;interrompt à 25 km/h.
            </p>
            <p>
              La course de lenteur se tient sur le parking du magasin, hors de la voie publique,
              et ne promet aucun lot : ce n&apos;est pas un jeu-concours. Un vrai magasin
              vérifierait que son assurance couvre l&apos;événement et les essais. La première
              heure est offerte sans obligation d&apos;achat ; prix et dates sont des exemples.
            </p>
            <p>
              Le premier écran s&apos;inspire du modèle « Playful Idea » de MotionSites (mise en
              page transposée, aucun texte ni image repris) ; le plan du quartier est dessiné pour
              ce site.
            </p>
          </>
        }
      />
    </div>
  );
}
