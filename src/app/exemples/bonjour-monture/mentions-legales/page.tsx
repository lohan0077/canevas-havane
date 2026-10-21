import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits · Bonjour Monture — site de démonstration",
  description: "Bonjour Monture est un opticien fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/bonjour-monture/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="bonjour-monture"
        entreprise="Bonjour Monture"
        polices="Instrument Serif et Manrope"
        enPlus={
          <>
            <p>
              Mentions propres au métier, telles qu&apos;elles figureraient sur le site d&apos;un vrai
              opticien : « Un devis détaillé vous est remis gratuitement avant tout achat de
              produit correcteur » (arrêté du 28 avril 2017, art. 2, affiché en vitrine et en
              boutique).
            </p>
            <p>
              Ce site ne parle ni de la détermination de la réfraction (Code de la santé
              publique, art. D.4362-19), ni de prise en charge (art. R.5213-1, 3°) : le rendez-vous proposé est un essayage
              de montures, en boutique. Les montures, leurs noms et leurs prix sont des
              exemples ; aucune n&apos;est d&apos;une marque existante.
            </p>
            <p>
              Le téléphone {entreprise.telephone} appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
