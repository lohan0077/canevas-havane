import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Sans Histoire : un papier clair d'aube, l'encre d'un registre de
// nuit, l'orange du jour qui se lève. Newsreader pour les titres, Space Grotesk
// pour le texte et les heures. Le pied de chaque page porte, en évidence, les
// mentions du Code de la sécurité intérieure (art. L612-14 et L612-15).
export default function SansHistoireLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sans Histoire"
      titres="newsreader"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F4F1EA",
        encre: "#1E2326",
        doux: "#545B60",
        accent: "#E8794B",
        surAccent: "#1E2326",
        accentTexte: "#A3431C",
        carte: "#FFFFFF",
        trait: "#DCD6CA",
        sombre: "#1F2826",
        surSombre: "#EDE7DB",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
