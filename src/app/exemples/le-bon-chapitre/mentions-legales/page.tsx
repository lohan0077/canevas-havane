import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Le Bon Chapitre — site de démonstration",
  description: "Le Bon Chapitre est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/le-bon-chapitre/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="le-bon-chapitre"
        entreprise="Le Bon Chapitre"
        polices="Young Serif, Archivo et Caveat"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la professeure, son adresse et son numéro
              SIRET. Ici, tout est exemple : {entreprise.prof} n&apos;existe pas, SIRET
              000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de l&apos;Exemple, 00000 Exemple-Ville,
              déclaration de services à la personne n°&nbsp;{entreprise.sap}. Le téléphone affiché,{" "}
              {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve aux œuvres
              de fiction.
            </p>
            <p>
              Les cours à domicile sont une activité de services à la personne (Code du travail,
              art. D7231-1). Le prix est affiché comme l&apos;arrêté du 17 mars 2015 le demande :
              à l&apos;heure, hors taxes et toutes taxes comprises, frais annexes compris, avec le
              mode d&apos;intervention et les conditions du devis ; l&apos;avantage fiscal est
              détaché du prix, en caractères plus petits. Le crédit d&apos;impôt (CGI, art. 199
              sexdecies) suppose un cours chez l&apos;élève, individuel, par une activité déclarée.
              Aucun résultat scolaire n&apos;est promis.
            </p>
            <p>
              La mise en page s&apos;inspire du modèle « Playful Idea » de la bibliothèque
              MotionSites, transposé à une professeure de maths ; la page de cahier est dessinée.
            </p>
          </>
        }
      />
    </main>
  );
}
