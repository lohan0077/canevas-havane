import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Sortie de Four : le papier couleur d'argile, la terre cuite pour
// l'accent, le noir du four pour les bandes sombres. Instrument Serif pour les
// titres (de grands italiques, à la façon d'un magazine), DM Sans pour le texte.
export default function SortieDeFourLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sortie de Four"
      titres="instrument"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EADF",
        encre: "#2A1B12",
        doux: "#5E4A3C",
        accent: "#B4532F",
        surAccent: "#FFF6EC",
        accentTexte: "#8F3D1E",
        carte: "#FBF5EE",
        trait: "#DCCBB8",
        sombre: "#1F1813",
        surSombre: "#F3EADF",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
