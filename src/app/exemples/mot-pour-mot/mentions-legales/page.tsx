import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { PHRASE_L313_3, PHRASE_L322_2, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Mot pour Mot, site de démonstration",
  description:
    "Mot pour Mot est un courtier en crédit immobilier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/mot-pour-mot/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="mot-pour-mot"
      entreprise="Mot pour Mot"
      polices="Archivo et Space Grotesk"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions d&apos;un intermédiaire en opérations de
            banque. Ici, ce sont des exemples : {entreprise.nom}, {entreprise.adresse} ; catégorie :{" "}
            {entreprise.categorie.toLowerCase()} ; immatriculation à l&apos;ORIAS n° {entreprise.orias}{" "}
            (exemple), vérifiable sur le registre de l&apos;ORIAS ; établissements pour le compte desquels
            l&apos;intermédiaire exerce : {entreprise.banques.join(" ; ")} (exemples) ; assurance de
            responsabilité civile professionnelle et garantie financière auprès d&apos;un assureur
            d&apos;exemple ; médiateur de la consommation d&apos;exemple, ses coordonnées et l&apos;adresse
            de son site.
          </p>
          <p>« {PHRASE_L322_2} » (code de la consommation, art. L322-2.)</p>
          <p>{PHRASE_L313_3} (code de la consommation, art. L313-3.)</p>
          <p>
            Les autres textes qui fondent ces mentions : code monétaire et financier, art. L519-6 (rien
            ne peut être perçu avant le versement des fonds) et R519-24 (nom, adresse, ORIAS et catégorie
            sur toute publicité) ; code de la consommation, art. L223-1 (démarchage téléphonique),
            L313-5 (aucune formulation qui ferait naître de fausses attentes sur la disponibilité d&apos;un
            crédit) et R616-1 (médiateur). Aucun taux n&apos;est affiché. Les honoraires, les dossiers et
            les créneaux sont des exemples. Le numéro de téléphone affiché appartient à la tranche que
            l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
        </>
      }
    />
  );
}
