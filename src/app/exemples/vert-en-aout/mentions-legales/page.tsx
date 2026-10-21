import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { CONTACT } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Vert en Août — site de démonstration",
  description: "Vert en Août est un paysagiste fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/vert-en-aout/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="vert-en-aout"
        entreprise="Vert en Août"
        polices="Unbounded et DM Sans"
        enPlus={
          <>
            <p>
              Ce que dirait un vrai paysagiste, ici avec des numéros d&apos;exemple : SIRET 000 000 000 00000 · exemple ;
              assurance décennale pour les travaux qui en relèvent (assureur et numéro de contrat · exemple). Le devis
              montré, ses postes, ses quantités, son taux de TVA et ses prix sont des exemples.
            </p>
            <p>
              Aucun jardin n&apos;est promis « sans arrosage » : la première année, il faut arroser. Le climat de
              l&apos;outil « Ta commune » est un exemple (un vrai site citerait les normales climatiques officielles de la
              commune). Les restrictions d&apos;eau sont présentées d&apos;après service-public.gouv.fr (« Êtes-vous
              concerné par des restrictions d&apos;eau ? », 7 juillet 2026). La création de jardin n&apos;ouvre pas droit
              au crédit d&apos;impôt des services à la personne. Les photos sont des illustrations, pas des jardins de
              l&apos;entreprise. Le numéro {CONTACT.telephone} appartient à la tranche que l&apos;ARCEP réserve à la
              fiction ; l&apos;adresse est inventée.
            </p>
            <p>
              Premier écran inspiré du modèle « Layered Depth » de la bibliothèque MotionSites, transposé à un paysagiste.
            </p>
          </>
        }
      />
    </main>
  );
}
