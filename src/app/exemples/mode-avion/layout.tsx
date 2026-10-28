import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Mode Avion : le bleu nuit, le rouge et le blanc cassé de la marque ;
// Sora pour les titres (l'Avenir Next de la vidéo), DM Sans pour le texte.
export default function ModeAvionLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Mode Avion"
      titres="sora"
      texte="dmSans"
      couleurs={{
        fond: "#14213D",
        encre: "#F5F5F2",
        doux: "#B4C3CC",
        accent: "#D62F3C",
        surAccent: "#FFFFFF",
        accentTexte: "#FF8A8F",
        carte: "#1C2C4F",
        trait: "#2F4166",
        sombre: "#F5F5F2",
        surSombre: "#14213D",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
