import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Après Nous, l'atelier des deux vidéos des artisans d'art : la marque de « Créer une
// marque » (une ébénisterie : le numéro gravé sous chaque table, son registre, le
// premier repas), qui a absorbé les idées de « Remplir l'agenda » (un céramiste : une
// page et vingt secondes de tournage par pièce, l'ouverture du four en direct, une
// seule de chaque). Fraunces, un caractère au dessin chaud, presque taillé, pour les
// titres ; Figtree pour lire ; Caveat pour les lignes qu'on écrit soi-même. Le lin,
// le noyer, le chêne. Chaque page s'ouvre sur un écran sombre : en-tête `surSombre`.
export default function ApresNousLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Après Nous"
      titres="fraunces"
      texte="figtree"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EDE2",
        encre: "#3B2416",
        doux: "#5F4C3B",
        accent: "#C8955A",
        surAccent: "#2A190E",
        accentTexte: "#7A5226",
        carte: "#FAF6EE",
        trait: "#D8CCB9",
        sombre: "#2A190E",
        surSombre: "#F3EDE2",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/registre`, libelle: "Mon numéro" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
