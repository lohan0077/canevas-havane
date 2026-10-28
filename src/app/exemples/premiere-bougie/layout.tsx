import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Première Bougie, cabinet de recrutement imaginaire filmé dans les deux vidéos des
// cabinets de recrutement : il compte les premiers anniversaires (« Créer une marque ») ;
// il demande d'abord depuis combien de semaines le poste est vide, et montre ses
// honoraires ligne par ligne (« Remplir l'agenda », ancien site Chaise Pleine). La nuit,
// une flamme : bleu nuit, jaune bougie, corail ; DM Serif Display, cousine libre du
// Cochin de la marque, et Manrope pour lire. Toutes les pages s'ouvrent sur la nuit.
export default function PremiereBougieLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Première Bougie"
      titres="dmSerif"
      texte="manrope"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#22223B",
        doux: "#5B5B70",
        accent: "#F2C14E",
        surAccent: "#22223B",
        accentTexte: "#B3432B",
        carte: "#FFFFFF",
        trait: "#EADFCB",
        sombre: "#1B1B30",
        surSombre: "#FFF8EC",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#vingt-minutes`, libelle: "20 minutes" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
