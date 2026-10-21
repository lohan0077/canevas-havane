import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { maison } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Rien à Signaler — site de démonstration",
  description: "Rien à Signaler est une marque d'alarmes fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="rien-a-signaler"
      entreprise="Rien à Signaler"
      polices="Bricolage Grotesque et DM Sans"
      enPlus={
        <>
          <p>
            Rien à Signaler, telle qu&apos;imaginée ici, installe des alarmes pilotées par une application,
            <strong> sans télésurveillance</strong> : le message du dimanche est un rapport automatique de
            l&apos;alarme, et aucune personne ne reçoit les alertes à la place du client. Une entreprise qui
            ajouterait une télésurveillance exercerait une activité de sécurité privée (code de la sécurité
            intérieure, art. L611-1) : il lui faudrait une autorisation du CNAPS, et son numéro devrait
            figurer sur tout document informatif ou publicitaire, avec la mention de l&apos;art. L612-14
            (art. L612-15).
          </p>
          <p>
            Les détecteurs dits « animaux » ont des limites ; le site dit ce que l&apos;installateur fait
            (choisir, placer, régler), pas un résultat. Aucun chiffre de cambriolage n&apos;est avancé. Les
            prix sont des prix TTC d&apos;exemple, pose comprise.
          </p>
          <p>
            L&apos;adresse, {maison.adresse}, est une adresse d&apos;exemple ; le numéro {maison.telephone}{" "}
            appartient à une tranche que l&apos;ARCEP réserve aux œuvres de fiction. La mise en page
            s&apos;inspire du modèle « Northstar » de la bibliothèque MotionSites, transposé à une marque
            d&apos;alarmes.
          </p>
        </>
      }
    />
  );
}
