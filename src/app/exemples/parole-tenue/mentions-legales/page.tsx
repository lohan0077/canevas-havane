import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { MENTIONS_TOURISME, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits · Parole Tenue — site de démonstration",
  description: "Parole Tenue est une agence de voyage fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/parole-tenue/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="[&_h1]:font-normal [&_h2]:font-normal">
      <MentionsDemonstration
        site="parole-tenue"
        entreprise="Parole Tenue"
        polices="Playfair Display, Work Sans et Caveat"
        enPlus={
          <>
            <p>Les mentions que le Code du tourisme (art. R.211-2) demande sur le site d&apos;une agence de voyage figurent en pied de chaque page, avec des valeurs d&apos;exemple :</p>
            <ul className="list-disc space-y-1 pl-5">
              {MENTIONS_TOURISME.map((m) => (<li key={m.libelle}>{m.libelle} : {m.valeur}</li>))}
            </ul>
            <p>
              Les budgets sont des exemples, pour deux, TTC ; ils ne constituent pas une offre (Code
              du tourisme, art. L.211-8). Le montant « à mettre de côté » est un simple calcul
              affiché : l&apos;agence fictive n&apos;encaisse rien d&apos;avance et ne propose aucun produit
              d&apos;épargne. Les billets du mur sont des exemples ; celui qu&apos;on écrit reste sur
              l&apos;écran. Le téléphone {entreprise.telephone} appartient à la tranche que l&apos;ARCEP
              réserve aux œuvres de fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
