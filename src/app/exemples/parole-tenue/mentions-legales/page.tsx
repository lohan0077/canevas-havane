import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import Billet from "../_composants/Billet";
import { MENTIONS_TOURISME, agence } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Parole Tenue, site de démonstration",
  description: "Parole Tenue est une agence de voyage fictive : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/parole-tenue/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] pt-24 text-[var(--sur-sombre)] [&_h1]:font-normal [&_h2]:font-normal">
      <div className="relative">
        <MentionsDemonstration
          site="parole-tenue"
          entreprise="Parole Tenue"
          polices="Instrument Serif, Work Sans et Caveat"
          enPlus={
            <>
              <p>
                Ce site réunit les deux vidéos des agences de voyage : « Créer une marque » (le nom, les voyages
                promis, la promesse qu&apos;on écrit, sa date et ce qu&apos;il faut mettre de côté, le mur des
                billets) et « Remplir l&apos;agenda » (un seul bouton pour fermer ses onglets, trois questions,
                trente minutes avec un conseiller, la vidéo du dimanche 21 h, les budgets ligne par ligne).
              </p>
              <p>Les mentions que le Code du tourisme (art. R.211-2) demande sur le site d&apos;une agence de voyage figurent en pied de chaque page, avec des valeurs d&apos;exemple :</p>
              <ul className="list-disc space-y-1 pl-5">
                {MENTIONS_TOURISME.map((m) => (<li key={m.libelle}>{m.libelle} : {m.valeur}</li>))}
              </ul>
              <p>
                Les budgets sont des exemples, pour deux, TTC ; ils ne constituent pas une offre (Code du
                tourisme, art. L.211-8). Le montant « à mettre de côté » est un simple calcul affiché :
                l&apos;agence fictive n&apos;encaisse rien d&apos;avance et ne propose aucun produit d&apos;épargne. Les
                billets du mur sont des exemples ; celui qu&apos;on écrit reste sur l&apos;écran. Les conseillers
                portent des prénoms d&apos;exemple. Le téléphone {agence.telephone} appartient à la tranche que
                l&apos;ARCEP réserve aux œuvres de fiction ; l&apos;adresse est inventée.
              </p>
            </>
          }
        />
      </div>
      <div aria-hidden="true" className="mx-auto flex max-w-3xl justify-end px-5 pb-16">
        <div className="w-[260px]"><Billet ou="Ton voyage" pour="un jour, c'est quand ?" angle={-3} /></div>
      </div>
    </main>
  );
}
