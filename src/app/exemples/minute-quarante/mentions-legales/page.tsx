import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Minute Quarante — site de démonstration",
  description: "Minute Quarante est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/minute-quarante/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="minute-quarante"
        entreprise="Minute Quarante"
        polices="Fraunces et Figtree"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la photographe, son adresse et son
              numéro SIRET. Ici, tout est exemple : entreprise individuelle, SIRET
              000 000 000 00000, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. TVA non
              applicable, art. 293 B du CGI (exemple). Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction.
            </p>
            <p>
              Droit à l&apos;image (Code civil, art. 9) : un vrai studio ne publie aucune photo
              d&apos;un client sans son accord écrit, et celui des deux parents pour un
              enfant. Les photos de ce site ne montrent aucun client : ce sont des photos
              libres, choisies sans visage reconnaissable, créditées ci-dessous.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Orla Fashion » de la bibliothèque
              MotionSites, transposé à une photographe de famille.
            </p>
          </>
        }
      />
    </main>
  );
}
