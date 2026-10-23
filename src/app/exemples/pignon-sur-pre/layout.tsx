import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Pignon sur Pré, loueur imaginaire de tentes de réception et d'engins de
// jardin, filmé dans les deux vidéos des loueurs. Le pré au couchant, le vert de l'herbe,
// la terre cuite et le blé ; Fraunces (son italique douce, cousine libre du Baskerville de
// la marque) et Figtree pour lire. Le `noindex` vient du layout de /exemples.
export default function PignonSurPreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pignon sur Pré"
      titres="fraunces"
      texte="figtree"
      couleurs={{
        fond: "#FBF7EE",
        encre: "#22311B",
        doux: "#4F5A45",
        accent: "#B04E2F",
        surAccent: "#FFFFFF",
        accentTexte: "#A4442A",
        carte: "#FFFFFF",
        trait: "#DCD6C4",
        sombre: "#1E3015",
        surSombre: "#FBF7EE",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/disponibilites`, libelle: "Réserver" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
