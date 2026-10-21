import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Pas Souple : un vert sauge en camaïeu, comme un tapis de pilates ;
// Fraunces pour les titres, Manrope pour le texte. Le `noindex` vient de /exemples.
export default function PasSoupleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pas Souple"
      titres="fraunces"
      texte="manrope"
      couleurs={{
        fond: "#E7ECE3",
        encre: "#1E2B22",
        doux: "#4A5A4E",
        accent: "#2F4A36",
        surAccent: "#F4F1E8",
        accentTexte: "#3E6247",
        carte: "#F6F7F2",
        trait: "#C9D3C4",
        sombre: "#2F4A36",
        surSombre: "#F4F1E8",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
