import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise, videos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Neuf Étés, site de démonstration",
  description: "Neuf Étés est une marque de piscines fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/neuf-etes/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Mentions légales" titre="Une marque *fictive.*">
        {entreprise.nom} n&apos;existe pas : son nom, son équipe, ses prix, ses chantiers et ses
        dates sont inventés pour les vidéos de Canevas Havane.
      </EnTetePage>
      <MentionsDemonstration
        site="neuf-etes"
        entreprise="Neuf Étés"
        polices="Arvo et DM Sans"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des piscinistes : « Créer une marque » (le nom Neuf
              Étés, l&apos;âge des enfants et les étés qui restent, l&apos;affiche, le chantier filmé
              jusqu&apos;au premier plongeon) et « Remplir l&apos;agenda » (le jardin qui dit quelle
              coque rentre et son prix, une page par chantier, le compte à rebours du premier
              dimanche de juillet, les semaines de chantier qu&apos;on bloque soi-même).
            </p>
            <p>
              Les prix sont des exemples, affichés TTC et pose comprise. Les semaines « réservées »
              ou « libres » sont des dates d&apos;exemple. Aucun avis, aucune note : une entreprise
              inventée n&apos;a pas de clients. Le calcul des étés (un par an jusqu&apos;à 18 ans) est
              une façon de voir le temps, pas une statistique ; il se fait dans votre navigateur.
            </p>
            <p>
              Un constructeur de piscines doit indiquer sur ses devis et factures son numéro
              SIRET et son assurance de responsabilité décennale (assureur, contrat, zone
              couverte). Ceux de {entreprise.nom} sont des exemples : SIRET {entreprise.siret},
              {" "}{entreprise.assureur}.
            </p>
            <p>
              Le téléphone {entreprise.telephone} appartient à la tranche que l&apos;ARCEP réserve aux
              œuvres de fiction. L&apos;adresse est inventée ; les communes citées sont réelles, les
              chantiers non.
            </p>
            <p>
              Le premier écran est construit sur le modèle « Monolith Hero » de MotionSites,
              utilisé sous licence. Ses vidéos viennent de Pexels, sous la licence Pexels :{" "}
              {videos.map((v) => `${v.auteur} (${v.sujet})`).join(", ")}. Le jardin en 3D reprend
              les principes du configurateur de Kéo.
            </p>
          </>
        }
      />
    </main>
  );
}
