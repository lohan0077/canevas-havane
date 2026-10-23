import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Transmis, maison de traiteur imaginaire, filmé dans les deux vidéos des
// traiteurs. Le papier du cahier de recettes, l'encre bleue des notes (Caveat), le vert
// de la marque, la sauce tomate et la moutarde ; Playfair Display pour les titres (la
// cousine libre du Big Caslon de la marque), Work Sans pour lire. Le `noindex` vient du
// layout de /exemples.
export default function TransmisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Transmis"
      titres="playfair"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1F3B2D",
        doux: "#4E5F54",
        accent: "#B23B26",
        surAccent: "#FFFFFF",
        accentTexte: "#B23B26",
        carte: "#FFFFFF",
        trait: "#E3D9C6",
        sombre: "#1F3B2D",
        surSombre: "#FBF6EC",
      }}
    >
      {/* Playfair a des chiffres « bas de casse » : partout ici, on les veut alignés. */}
      <div className="[font-variant-numeric:lining-nums]">
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/degustation`, libelle: "Dégustation" }}
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
