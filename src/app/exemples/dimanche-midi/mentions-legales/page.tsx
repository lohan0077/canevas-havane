import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { STATUT, cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Dimanche Midi, site de démonstration",
  description:
    "Dimanche Midi est un cabinet de gestion de patrimoine fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/dimanche-midi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="dimanche-midi"
      entreprise="Dimanche Midi"
      polices="Lora, Outfit et Caveat"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions d&apos;un conseiller en investissements financiers et
            courtier en assurance. Ici, ce sont des exemples : {cabinet.nom}, {cabinet.adresse} ; {STATUT} ; adhérent de
            l&apos;{cabinet.association} ; assurance de responsabilité civile professionnelle auprès d&apos;un assureur
            d&apos;exemple ; médiateur de la consommation : {cabinet.mediateur}.
          </p>
          <p>
            Ce que les textes font écrire ici : jamais « agréé AMF », ni le logo de l&apos;AMF (position-recommandation AMF
            DOC-2006-23, question 4.6) ; la rémunération dite au client et un conseil « non indépendant » dès qu&apos;il garde
            des rémunérations de tiers (code monétaire et financier, art. L541-8-1) ; aucun démarchage : ni appel non
            sollicité (code de la consommation, art. L223-1), ni rendez-vous à domicile (code monétaire et financier,
            art. L341-1), ni message envoyé à des proches qui n&apos;ont rien demandé (code des postes et des communications
            électroniques, art. L34-5). Aucun placement, aucun rendement, aucune réduction d&apos;impôt n&apos;est promis.
          </p>
          <p>
            Le carnet de famille s&apos;écrit dans la page et n&apos;en sort que si tu le télécharges : rien n&apos;est
            transmis, rien n&apos;est conservé, ni par le cabinet, ni par Canevas Havane. Les honoraires, les dates et les
            exemples du carnet sont fictifs. Le numéro de téléphone affiché appartient à la tranche que l&apos;ARCEP
            réserve aux œuvres de fiction.
          </p>
        </>
      }
    />
  );
}
