import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Samedi Chantier — site de démonstration",
  description: "Samedi Chantier est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/samedi-chantier/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <div>
      <MentionsDemonstration
        site="samedi-chantier"
        entreprise="Samedi Chantier"
        polices="Archivo et Space Grotesk"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la société qui loue les machines, son adresse,
              son numéro SIRET et son assureur. Ici, tout est exemple : SIRET {entreprise.siret},
              12 rue de l&apos;Exemple, 00000 Exemple-Ville. Le téléphone affiché, {entreprise.telephone},
              appartient à la tranche que l&apos;ARCEP réserve aux œuvres de fiction.
            </p>
            <p>
              Les prix sont affichés toutes taxes comprises, pour des particuliers, et sont des
              exemples. Les caractéristiques des machines (profondeur de fouille, largeur, charge
              utile…) sont présentées comme celles du fabricant, en exemple : un vrai loueur les
              reprend de la notice de chaque modèle. Les durées de chantier sont des estimations
              d&apos;exemple, jamais une promesse.
            </p>
            <p>
              Creuser près de réseaux enterrés suppose une déclaration préalable aux exploitants
              (DT-DICT), particuliers compris : le site le dit avant chaque réservation. Les
              conditions de conduite des engins (âge, formation, assurance) ne sont pas détaillées
              ici : un vrai loueur les écrit dans son contrat et sur la fiche de chaque machine.
              Les disponibilités « prises » sont un exemple ; aucun avis, aucune note n&apos;est affiché.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « BuildShield » de la bibliothèque MotionSites,
              transposé à un loueur de mini-pelles ; les pictogrammes et le logo sont dessinés.
            </p>
          </>
        }
      />
    </div>
  );
}
