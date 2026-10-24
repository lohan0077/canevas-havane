import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Le Pourquoi, cabinet d'ostéopathie imaginaire filmé dans les deux
// vidéos des ostéopathes. Version « carrée » (24/10/2026) : Newsreader en graisse
// normale pour les titres (son italique fait la mise en relief), Inter pour lire, et
// Outfit — la cousine libre de la Futura de la marque — pour le seul nom du cabinet.
// L'orange ne sert qu'au bouton principal et à de petits détails. Chaque page s'ouvre
// sur un écran sombre : l'en-tête flottant y est clair.
export default function LePourquoiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Pourquoi"
      titres="newsreader"
      texte="inter"
      autres={["outfit"]}
      couleurs={{
        fond: "#F3EBDD",
        encre: "#17322C",
        doux: "#475B54",
        accent: "#E07A4B",
        surAccent: "#14261F",
        accentTexte: "#9C4420",
        carte: "#FBF6EE",
        trait: "#DCCFBC",
        sombre: "#132A24",
        surSombre: "#F3EBDD",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
        surSombre
      />
      <div className="overflow-x-clip">{children}</div>
      <Pied />
    </Cadre>
  );
}
