import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de L'Addition : le blanc d'un ticket de caisse, l'encre presque noire,
// l'indigo de la toile brute pour l'accent. Archivo (grotesque lourde, un nom qu'on lit
// de loin) pour les titres, Space Grotesk (chiffres nets, alignés) pour le texte.
export default function LAdditionLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="L'Addition"
      titres="archivo"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F7F6F2",
        encre: "#14161C",
        doux: "#4B4F5A",
        accent: "#23395B",
        surAccent: "#FFFFFF",
        accentTexte: "#23395B",
        carte: "#FFFFFF",
        trait: "#DADBD6",
        sombre: "#172338",
        surSombre: "#F7F6F2",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
