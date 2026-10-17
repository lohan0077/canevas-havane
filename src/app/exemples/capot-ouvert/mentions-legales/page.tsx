import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { garage } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Capot Ouvert — site de démonstration",
  description: "Capot Ouvert est un garage fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/capot-ouvert/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="capot-ouvert"
        entreprise="Capot Ouvert"
        polices="Zilla Slab et Work Sans"
        enPlus={
          <>
            <p>
              Les prix sont des prix TTC d'exemple, pièces et main-d'œuvre comprises. Aucune
              marque automobile n'est citée ni montrée : la voiture de la page de réparation
              est « une citadine », et les photos ne laissent voir ni plaque ni logo. La
              réparation présentée, son numéro et sa facture sont inventés.
            </p>
            <p>
              Les dates de l'atelier du samedi sont de vrais samedis ; l'atelier, lui, est
              fictif. Le numéro {garage.telephone} appartient à la tranche que l'ARCEP réserve
              aux œuvres de fiction. La mise en page s'inspire du modèle « Menuchi » de la
              bibliothèque MotionSites, transposé à un garage.
            </p>
          </>
        }
      />
    </main>
  );
}
