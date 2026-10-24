import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Relue, papeterie et boutique de jeux imaginaire filmée dans les deux
// vidéos des loisirs créatifs. Bodoni Moda pour les titres (le Didot de la marque, en
// romain et en italique), DM Sans pour lire. Papier crème, encre bleu nuit, rouge
// cachet, et le vert d'un tapis de jeu. Les pages s'ouvrent sur le papier clair :
// l'en-tête flottant reste en version claire.
export default function RelueLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Relue"
      titres="bodoni"
      texte="dmSans"
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1E2B4A",
        doux: "#585F70",
        accent: "#B5452F",
        surAccent: "#FFFFFF",
        accentTexte: "#A13D29",
        carte: "#FFFDF8",
        trait: "#E6DCC8",
        sombre: "#1E2B4A",
        surSombre: "#FBF6EC",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/dans-un-an`, libelle: "Écrire ma lettre" }}
      />
      {children}
      <Pied />
    </Cadre>
  );
}
