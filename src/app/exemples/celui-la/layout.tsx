import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site Celui-Là : Young Serif pour les titres, Work Sans pour le texte.
// Papier blanc cassé, encre vert sombre, jaune de pâte pressée — et des fromages
// dessinés au trait. Le `noindex` vient du layout de /exemples.
export default function CeluiLaLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Celui-Là"
      titres="youngSerif"
      texte="workSans"
      couleurs={{
        fond: "#FFFBF2",
        encre: "#1F2A24",
        doux: "#5B6660",
        accent: "#E3B23C",
        surAccent: "#1F2A24",
        accentTexte: "#7A5B0E",
        carte: "#FFFFFF",
        trait: "#E8E0CC",
        sombre: "#234236",
        surSombre: "#FFFBF2",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
