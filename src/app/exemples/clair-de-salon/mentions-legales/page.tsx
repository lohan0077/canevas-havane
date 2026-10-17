import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { entreprise } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Clair de Salon — site de démonstration",
  description: "Clair de Salon est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses photos.",
  ...adressesDeLaPage("/exemples/clair-de-salon/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="clair-de-salon"
        entreprise="Clair de Salon"
        polices="Bodoni Moda et Manrope"
        enPlus={
          <>
            <p>
              Sur un vrai site, cette page nommerait la professeure, son adresse et son numéro
              SIRET. Ici, tout est exemple : {entreprise.prof} n&apos;existe pas, SIRET
              000&nbsp;000&nbsp;000&nbsp;00000, 12 rue de l&apos;Exemple, 00000 Exemple-Ville,
              déclaration de services à la personne n°&nbsp;{entreprise.sap}. Le téléphone
              affiché, {entreprise.telephone}, appartient à la tranche que l&apos;ARCEP réserve
              aux œuvres de fiction.
            </p>
            <p>
              Les prix suivent l&apos;arrêté du 17 mars 2015 relatif à l&apos;information préalable
              du consommateur sur les prestations de services à la personne : à l&apos;heure, hors
              taxes et toutes taxes comprises, frais annexes, mode d&apos;intervention, devis, et
              l&apos;avantage fiscal détaché du prix, en caractères plus petits. Le crédit
              d&apos;impôt (CGI, art. 199 sexdecies) suppose un cours chez l&apos;élève, individuel,
              par une activité déclarée.
            </p>
            <p>
              Les morceaux cités (Satie, Debussy, Beethoven, Pachelbel) sont du domaine public :
              aucune partition ni aucun enregistrement n&apos;est reproduit. Le concert de salon
              est une invitation entre particuliers, entrée libre. La mise en page s&apos;inspire
              du modèle « Luxury Hero » de la bibliothèque MotionSites, transposé à des cours
              de piano.
            </p>
          </>
        }
      />
    </main>
  );
}
