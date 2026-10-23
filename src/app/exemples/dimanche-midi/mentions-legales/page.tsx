import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import Gravure from "../_composants/Gravure";
import { STATUT_COMPLET, cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Dimanche Midi, site de démonstration",
  description: "Dimanche Midi est un cabinet de gestion de patrimoine fictif : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/dimanche-midi/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="bg-[#F3E7CF] pt-24">
      <div className="mx-auto max-w-5xl overflow-hidden px-2">
        <Gravure className="-ml-[30%] h-auto w-[160%] max-w-none sm:ml-0 sm:w-full" />
      </div>
      <div className="mx-4 mb-4 rounded-[2.5rem] bg-[var(--fond)] sm:mx-auto sm:max-w-4xl">
        <MentionsDemonstration
          site="dimanche-midi"
          entreprise="Dimanche Midi"
          polices="Instrument Serif, Figtree et Caveat"
          enPlus={
            <>
              <p>
                Sur un vrai site, cette page porterait les mentions propres au conseil en
                investissements financiers et au courtage en assurance. Ici, elles sont des
                exemples : {cabinet.nom}, {cabinet.adresse} · {STATUT_COMPLET}, à vérifier sur le
                registre de l&apos;ORIAS · adhérent de l&apos;{cabinet.association} · conseil non
                indépendant · médiateur de la consommation : {cabinet.mediateur}. Jamais « agréé
                AMF » : un conseiller en investissements financiers est adhérent d&apos;une
                association agréée par l&apos;AMF (position AMF DOC-2006-23, question 4.6).
              </p>
              <p>
                Aucun placement, aucun rendement, aucune réduction d&apos;impôt n&apos;est promis sur ce
                site ; placer son épargne comporte un risque de perte en capital. Les honoraires (TTC)
                et les taux de rétrocession sont des exemples. Le carnet de famille fonctionne dans
                ton navigateur : rien n&apos;est envoyé ni conservé, et le cabinet n&apos;écrit à
                personne. Aucun rendez-vous n&apos;a lieu au domicile ou sur le lieu de travail (code
                monétaire et financier, art. L341-1). Le téléphone affiché appartient à la tranche que
                l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse est inventée.
              </p>
              <p>
                Ce site réunit les deux vidéos des conseillers en gestion de patrimoine : « Créer une
                marque » (le nom, le carnet de famille, l&apos;affiche, le dimanche par mois) et
                « Remplir l&apos;agenda » (le ticket de ce que je gagne, les moments de vie, le statut
                écrit juste en haut de chaque page, le rendez-vous au cabinet ou en visio).
              </p>
            </>
          }
        />
      </div>
    </main>
  );
}
