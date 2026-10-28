import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Pour Plus Tard, studio photo de famille imaginaire filmé dans les deux vidéos des
// photographes : pas des fichiers, une boîte de vingt tirages (« Créer une marque ») ;
// pas de portfolio, la minute 1 et la minute 40, comment s'habiller, le prix affiché
// (« Remplir l'agenda », ancien site Minute Quarante). Une chambre noire et du papier :
// brun, brique, kraft ; Playfair Display, cousine libre du Baskerville de la marque,
// DM Sans pour lire, et Caveat pour ce qu'on écrit au dos des tirages. Toutes les pages
// s'ouvrent sur un écran brun.
export default function PourPlusTardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pour Plus Tard"
      titres="playfair"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EBDD",
        encre: "#3B2F2A",
        doux: "#6B5A4E",
        accent: "#8C3B2E",
        surAccent: "#F3EBDD",
        accentTexte: "#8C3B2E",
        carte: "#FAF5EC",
        trait: "#D8C8AE",
        sombre: "#2A211D",
        surSombre: "#F3EBDD",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/reserver`, libelle: "Réserver" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
