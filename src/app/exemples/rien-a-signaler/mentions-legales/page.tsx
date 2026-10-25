import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Rien à Signaler, site de démonstration",
  description:
    "Rien à Signaler est un installateur d'alarmes et de climatisation fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="pt-24">
      <MentionsDemonstration
        site="rien-a-signaler"
        entreprise="Rien à Signaler"
        polices="Sora, Manrope et Instrument Serif"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos du métier : « Créer une marque » (le nom, l&apos;alarme qui ne vend pas
              la peur, la première question « t&apos;as un chat ? », le message du dimanche) et « Remplir
              l&apos;agenda » (la clim qui vend la première nuit où l&apos;on dort en août, le plan de la maison et sa
              fourchette pose comprise, le vrai délai de pose en haut du site, la date de pose réservée en ligne).
              Il remplace le site « Nuit d&apos;Août », qui montrait la seconde.
            </p>
            <p>
              Rien à Signaler, telle qu&apos;imaginée ici, installe des alarmes pilotées par une application,
              <strong> sans télésurveillance</strong> : le message du dimanche est un rapport automatique de
              l&apos;alarme, et aucune personne ne reçoit les alertes à la place du client. Une entreprise qui
              ajouterait une télésurveillance exercerait une activité de sécurité privée (code de la sécurité
              intérieure, art. L611-1) : il lui faudrait une autorisation du CNAPS, et son numéro devrait figurer sur
              tout document informatif ou publicitaire, avec la mention de l&apos;art. L612-14 (art. L612-15).
            </p>
            <p>
              Les détecteurs dits « animaux » ont des limites ; le site dit ce que l&apos;installateur fait
              (choisir, placer, régler), pas un résultat. Aucun chiffre de cambriolage n&apos;est avancé.
            </p>
            <p>
              La climatisation est présentée pour rafraîchir, jamais pour chauffer. Le délai de pose affiché est un
              exemple : sur un vrai site, ce serait le délai réel, mis à jour chaque lundi, jamais gonflé.
              L&apos;attestation de capacité (fluides frigorigènes, C. env., art. R543-78 et R543-99) porte un
              numéro, un organisme et une date d&apos;exemple : n° {maison.attestation}, valable jusqu&apos;au{" "}
              {maison.validite}. Les prix sont des prix TTC d&apos;exemple, pose comprise ; le prix ferme vient au
              devis. Les jours de pose « pris » le sont pour l&apos;exemple.
            </p>
            <p>
              L&apos;adresse, {maison.adresse}, {maison.ville}, est une adresse d&apos;exemple ; le numéro{" "}
              {maison.telephone} appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
          </>
        }
      />
    </main>
  );
}
