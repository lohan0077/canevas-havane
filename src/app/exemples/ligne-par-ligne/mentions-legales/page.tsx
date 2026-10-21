import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { STATUT, cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Ligne par Ligne, site de démonstration",
  description:
    "Ligne par Ligne est un cabinet de gestion de patrimoine fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/ligne-par-ligne/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="ligne-par-ligne"
      entreprise="Ligne par Ligne"
      polices="Newsreader et Figtree"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions d&apos;un conseiller en investissements financiers. Ici,
            ce sont des exemples : {cabinet.nom}, {cabinet.adresse} ; {STATUT.charAt(0).toLowerCase() + STATUT.slice(1)} (
            {cabinet.association.toLowerCase()}) ; courtier en assurance ; immatriculation à l&apos;ORIAS n° {cabinet.orias}{" "}
            (exemple), vérifiable sur le registre de l&apos;ORIAS ; assurance de responsabilité civile professionnelle auprès
            d&apos;un assureur d&apos;exemple ; médiateur de la consommation : {cabinet.mediateur.toLowerCase()}.
          </p>
          <p>
            Ce que la loi et l&apos;AMF font écrire ici : jamais « agréé AMF », ni le logo de l&apos;AMF (position-recommandation
            AMF DOC-2006-23, question 4.6) ; la rémunération du conseiller dite au client, et un conseil « non indépendant »
            dès qu&apos;il garde des rémunérations de tiers (code monétaire et financier, art. L541-8-1, 5° et 7°) ; des
            communications exactes, claires et non trompeuses (même article, 8°) : les rétrocessions sont dites prises sur
            les frais payés par le client. Aucun rendement n&apos;est promis. Aucun démarchage : pas d&apos;appel non sollicité
            (code de la consommation, art. L223-1), pas de rendez-vous à domicile ou au travail (code monétaire et
            financier, art. L341-1).
          </p>
          <p>
            Les honoraires, les taux de rétrocession, les créneaux et les situations décrites sont des exemples. Le numéro de
            téléphone affiché appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
        </>
      }
    />
  );
}
