import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Pavillon Bis, agence d'architecture imaginaire filmée dans les deux vidéos des
// architectes : uniquement les pavillons des années 70 (« Créer une marque »), et
// « architecte ou pas ? », une page par projet, trente minutes un samedi matin
// (« Remplir l'agenda », ancien site Atelier Samedi). Palette sapin, brique, ocre et
// crème ; Fraunces, la plus « années 70 » des serifs, et Outfit, cousine libre de la
// Futura de la marque. Toutes les pages s'ouvrent sur un écran sapin.
export default function PavillonBisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pavillon Bis"
      titres="fraunces"
      texte="outfit"
      couleurs={{
        fond: "#F4EFE6",
        encre: "#2F3B35",
        doux: "#57625B",
        accent: "#E3B04B",
        surAccent: "#26322C",
        accentTexte: "#A63F2A",
        carte: "#FBF7F0",
        trait: "#E0D6C4",
        sombre: "#26322C",
        surSombre: "#F4EFE6",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Réserver 30 min" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
