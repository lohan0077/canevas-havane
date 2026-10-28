import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { PHRASE_L612_14, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Veilleuse, site de démonstration",
  description: "Veilleuse est une société de sécurité privée fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/veilleuse/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="À savoir" titre="Une veilleuse *qui n'existe pas.*" />
      <MentionsDemonstration
        site="veilleuse"
        entreprise="Veilleuse"
        polices="DM Serif Display et Manrope"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos de la sécurité privée : « Créer une marque » (la
              veilleuse plutôt que le bouclier, l&apos;espace client qui dit qui vient ce soir avec
              les références de sa carte, l&apos;affiche de lancement) et « Remplir l&apos;agenda » (le
              rapport de la nuit à 7 h, le devis en trois questions, une page par besoin, les
              mentions obligatoires en évidence).
            </p>
            <p>
              Comme tout document d&apos;une entreprise de sécurité privée, chaque page de ce site, le
              devis, le rapport, l&apos;espace client et l&apos;affiche reproduisent l&apos;identification de
              l&apos;autorisation d&apos;exercer et la phrase de l&apos;article L612-14 du Code de la sécurité
              intérieure (art. L612-15, al. 1) : autorisation délivrée par le CNAPS
              n° {entreprise.autorisation}, un numéro d&apos;exemple, et « {PHRASE_L612_14} »
            </p>
            <p>
              Le nom est toujours suivi de « Sécurité privée » (art. L612-3). Le logo — une petite
              lumière dans un croissant de nuit — et les couleurs ne reprennent rien d&apos;un service
              de police (art. R631-12). Aucun agent n&apos;est présenté par un ancien métier
              (art. L612-15, al. 2). Les prénoms des agents et les références de carte
              professionnelle de l&apos;espace client sont des exemples ; dans la réalité, elles ne
              s&apos;affichent qu&apos;au client concerné. Les photos du rapport montrent le site, jamais
              une personne.
            </p>
            <p>
              Les prix sont des exemples, TTC pour les particuliers et HT pour les professionnels.
              L&apos;adresse est fictive ; le numéro {entreprise.telephone} appartient à une tranche
              que l&apos;ARCEP réserve aux œuvres de fiction. Le devis, le rapport et l&apos;espace client
              fonctionnent dans le navigateur : rien n&apos;est envoyé.
            </p>
          </>
        }
      />
    </main>
  );
}
