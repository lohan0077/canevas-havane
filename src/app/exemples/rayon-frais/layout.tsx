import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Rayon Frais, cabinet de diététique imaginaire filmé dans les deux
// vidéos des diététiciens. Zilla Slab pour la machine à écrire de la marque (chiffres
// alignés sur les prix), Space Grotesk pour lire ; vert, tomate, jaune et crème, comme
// un étiquetage de marché. Le premier écran est clair : en-tête de verre clair.
export default function RayonFraisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Rayon Frais"
      titres="zilla"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#FFF7E6",
        encre: "#1F3B24",
        doux: "#55604F",
        accent: "#C2402A",
        surAccent: "#FFFFFF",
        accentTexte: "#A8321E",
        carte: "#FFFFFF",
        trait: "#EADFC8",
        sombre: "#234F2B",
        surSombre: "#FFF7E6",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/reserver`, libelle: "Réserver" }}
      />
      {children}
      <Pied />
    </Cadre>
  );
}
