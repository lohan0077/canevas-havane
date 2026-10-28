import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import MentionsDemonstration from "../../_kit/MentionsDemonstration";
import { garage } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Mentions légales · Mains Libres — site de démonstration",
  description: "Mains Libres est un garage fictif : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/mains-libres/mentions-legales"),
};

export default function MentionsLegales() {
  return (
    <main>
      <MentionsDemonstration
        site="mains-libres"
        entreprise="Mains Libres"
        polices="Space Grotesk et Figtree"
        enPlus={
          <>
            <p>
              Les prix affichés sont des prix TTC d'exemple, pièces et main-d'œuvre comprises.
              Aucune marque automobile n'est citée : les voitures reconnues sont des types
              (citadine, compacte, SUV). La plaque « AB-123-CD » suit le format d'exemple des
              immatriculations ; sur ce site, la plaque saisie ne quitte pas le navigateur et
              aucun fichier n'est interrogé. Un vrai site passerait par un service de données
              d'immatriculation, à déclarer dans sa politique de confidentialité.
            </p>
            <p>
              Le numéro {garage.telephone} appartient à la tranche que l'ARCEP réserve aux
              œuvres de fiction. La photo des plaquettes est un dessin. La mise en page
              s'inspire du modèle « Cordex » de la bibliothèque MotionSites, transposé à un
              garage.
            </p>
          </>
        }
      />
    </main>
  );
}
