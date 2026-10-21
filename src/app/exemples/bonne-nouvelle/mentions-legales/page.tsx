import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { PHRASE_L313_3, PHRASE_L322_2, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Bonne Nouvelle, site de démonstration",
  description:
    "Bonne Nouvelle est un cabinet de courtage fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <MentionsDemonstration
      site="bonne-nouvelle"
      entreprise="Bonne Nouvelle"
      polices="Fraunces et DM Sans"
      enPlus={
        <>
          <p>
            Sur un vrai site, cette page porterait les mentions d&apos;un intermédiaire en opérations de
            banque. Ici, ce sont des exemples : {entreprise.nom}, {entreprise.adresse} ; catégorie :{" "}
            {entreprise.categorie.toLowerCase()} ; ORIAS n° {entreprise.orias} (exemple) ; établissements pour le
            compte desquels l&apos;intermédiaire exerce : {entreprise.banques.join(" ; ")} (exemples) ; assurance
            de responsabilité civile professionnelle auprès d&apos;un assureur d&apos;exemple ; médiateur de la
            consommation d&apos;exemple, ses coordonnées et l&apos;adresse de son site.
          </p>
          <p>« {PHRASE_L322_2} » (code de la consommation, art. L322-2.)</p>
          <p>{PHRASE_L313_3} (code de la consommation, art. L313-3.)</p>
          <p>
            Les autres textes : code monétaire et financier, art. L519-6 et R519-24 ; code de la
            consommation, art. L223-1 (démarchage téléphonique : seuls les clients sont appelés, pour leur
            dossier), L313-5 (aucune formule ne présuppose l&apos;accord d&apos;une banque : un dossier refusé
            est montré à côté d&apos;un dossier accordé) et R616-1. Aucun taux n&apos;est affiché. Les dossiers,
            les dates, les honoraires et les créneaux sont des exemples. Le numéro de téléphone affiché
            appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
          </p>
        </>
      }
    />
  );
}
