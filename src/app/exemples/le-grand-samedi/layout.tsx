import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du Grand Samedi : ivoire, bordeaux, une touche d'or. Instrument Serif
// pour les titres (et ses italiques), Work Sans pour le texte.
export default function LeGrandSamediLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Grand Samedi"
      titres="instrument"
      texte="workSans"
      couleurs={{
        fond: "#FAF5EF",
        encre: "#2A1A1F",
        doux: "#5E4A50",
        accent: "#7A2E3B",
        surAccent: "#FAF5EF",
        accentTexte: "#7A2E3B",
        carte: "#FFFFFF",
        trait: "#E8DCD3",
        sombre: "#2A1A1F",
        surSombre: "#F3E7DD",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
