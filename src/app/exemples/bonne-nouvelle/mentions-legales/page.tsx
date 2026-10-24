import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { Nuit } from "../_composants/Blocs";
import { PHRASE_L313_3, PHRASE_L322_2, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Bonne Nouvelle, site de démonstration",
  description: "Bonne Nouvelle est un courtier en crédit immobilier fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="kit-grain relative isolate overflow-hidden bg-[#1B2A41] pt-24 text-[#FFF8EC] [&_a]:text-[#F2C14E]">
      <Nuit voile={55} />
      <div className="relative">
        <MentionsDemonstration
          site="bonne-nouvelle"
          entreprise="Bonne Nouvelle"
          polices="Fraunces et Manrope"
          enPlus={
            <>
              <p>
                Sur un vrai site, cette page porterait les mentions propres au courtage en crédit
                immobilier. Ici, elles sont des exemples : {entreprise.nom}, {entreprise.adresse} ·{" "}
                {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple), à vérifier sur le
                registre de l&apos;ORIAS · établissements pour le compte desquels le courtier exerce :{" "}
                {entreprise.banques.join(" ; ")} (exemples) · médiateur de la consommation : médiateur
                d&apos;exemple.
              </p>
              <p>« {PHRASE_L322_2} » (code de la consommation, art. L322-2). {PHRASE_L313_3} (art. L313-3).</p>
              <p>
                Aucun taux, aucune mensualité n&apos;est affiché ; aucune formule ne présume l&apos;accord
                d&apos;une banque. Les dossiers suivis, les situations et le barème d&apos;honoraires (TTC)
                sont des exemples. Le suivi, la liste des pièces et la réservation fonctionnent dans ton
                navigateur : rien n&apos;est envoyé. Le téléphone affiché appartient à la tranche que
                l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse est inventée.
              </p>
              <p>
                Ce site réunit les deux vidéos des courtiers : « Créer une marque » (le nom, le coup de fil
                qu&apos;on attend, le dossier suivi comme un colis, l&apos;affiche) et « Remplir
                l&apos;agenda » (la phrase de la loi en titre, la frise de ce qu&apos;on paie et quand, une
                page par situation, le créneau en bas de chaque page).
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
