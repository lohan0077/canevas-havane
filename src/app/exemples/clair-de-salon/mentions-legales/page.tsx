import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { EnTetePage } from "../_composants/Blocs";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales et crédits — Clair de Salon, site de démonstration",
  description: "Clair de Salon est une entreprise fictive de cours à domicile : qui a réalisé ce site de démonstration, ce qu'il ne collecte pas, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/clair-de-salon/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <EnTetePage surtitre="Démonstration" titre="Mentions *légales.*" />
      <MentionsDemonstration
        site="clair-de-salon"
        entreprise="Clair de Salon"
        polices="Bodoni Moda, Manrope et Caveat"
        enPlus={
          <>
            <p>
              Ce site réunit les deux vidéos des cours particuliers de Canevas Havane : « Créer
              une marque » (le nom, le piano qui dort, le morceau dont on rêve, le chemin, le
              concert de salon) et « Remplir l&apos;agenda » (pas de CV, le chapitre qui bloque, la
              première séance minute par minute, une page par classe, le prix en grand, le
              mercredi réservable en ligne).
            </p>
            <p>
              Sur un vrai site, cette page nommerait l&apos;entreprise, son adresse et son numéro
              SIRET. Ici, tout est exemple : {entreprise.pianiste} et {entreprise.mathematicienne}
              n&apos;existent pas, SIRET {entreprise.siret}, {entreprise.adresse}, déclaration de
              services à la personne n°&nbsp;{entreprise.sap}. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres de
              fiction.
            </p>
            <p>
              Les prix suivent l&apos;arrêté du 17 mars 2015 relatif à l&apos;information préalable du
              consommateur sur les prestations de services à la personne : à l&apos;heure, hors
              taxes et toutes taxes comprises, frais annexes, mode d&apos;intervention, devis, et
              l&apos;avantage fiscal détaché du prix, en caractères plus petits. Le crédit
              d&apos;impôt (CGI, art. 199 sexdecies) suppose un cours chez l&apos;élève, individuel,
              par une activité déclarée. Aucune note ni aucune durée n&apos;est promise.
            </p>
            <p>
              Les morceaux cités (Satie, Debussy, Beethoven, Pachelbel) sont du domaine public :
              aucune partition ni aucun enregistrement n&apos;est reproduit. Le concert de salon est
              une invitation entre particuliers, entrée libre. Aucun avis, aucune note, aucune
              photo d&apos;élève.
            </p>
          </>
        }
      />
    </main>
  );
}
