import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Veilleuse : le vert nuit, le jaune d'une lampe, la crème des draps.
// DM Serif Display pour les titres (la douceur de l'Optima de la vidéo), Manrope pour
// le texte. Le pied de chaque page porte les mentions du CNAPS (CSI, art. L612-15).
export default function VeilleuseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Veilleuse"
      titres="dmSerif"
      texte="manrope"
      couleurs={{
        fond: "#F6EFE3",
        encre: "#1F2B25",
        doux: "#4E5B53",
        accent: "#F4C95D",
        surAccent: "#23382F",
        accentTexte: "#8A4A33",
        carte: "#FFFBF4",
        trait: "#E4D9C6",
        sombre: "#23382F",
        surSombre: "#F6EFE3",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
