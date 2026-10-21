import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { MENTIONS_TOURISME, entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits · Un Seul Onglet — site de démonstration",
  description: "Un Seul Onglet est une agence de voyage fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/un-seul-onglet/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main className="[&_h1]:font-medium [&_h2]:font-medium">
      <MentionsDemonstration
        site="un-seul-onglet"
        entreprise="Un Seul Onglet"
        polices="Newsreader et Figtree"
        enPlus={
          <>
            <p>
              Les mentions que le Code du tourisme (art. R.211-2) demande sur le site d&apos;une
              agence de voyage sont affichées en pied de chaque page, avec des valeurs
              d&apos;exemple :
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {MENTIONS_TOURISME.map((m) => (
                <li key={m.libelle}>{m.libelle} : {m.valeur}</li>
              ))}
            </ul>
            <p>
              Les budgets sont des exemples, pour deux, TTC ; ils ne constituent pas une offre.
              Avant tout contrat de voyage ou de séjour, une agence remet le formulaire
              d&apos;information prévu par l&apos;art. L.211-8 du Code du tourisme. Le téléphone{" "}
              {entreprise.telephone} appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction ; l&apos;adresse est inventée.
            </p>
          </>
        }
      />
    </main>
  );
}
