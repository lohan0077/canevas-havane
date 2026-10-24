import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Tour du Quartier, magasin de vélos imaginaire filmé dans les deux vidéos
// du métier. Les couleurs de la marque — le vert du parc, le jaune d'un mur au soleil,
// le rouge d'une boîte aux lettres — sur un crème doux ; Unbounded pour les titres,
// large et rassurante, Figtree pour lire. Chaque page s'ouvre sur un écran vert sombre :
// l'en-tête flottant est réglé pour lui.
export default function TourDuQuartierLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tour du Quartier"
      titres="unbounded"
      texte="figtree"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#1F3A2C",
        doux: "#4C5B52",
        accent: "#F2C14E",
        surAccent: "#1F3A2C",
        accentTexte: "#B23A22",
        carte: "#FFFFFF",
        trait: "#EADFC8",
        sombre: "#1F4A36",
        surSombre: "#FFF8EC",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION.slice(1)}
        action={{ href: `${DOSSIER}/premiere-heure`, libelle: "Ma première heure" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
