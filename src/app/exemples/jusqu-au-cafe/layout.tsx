import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Jusqu'au Café : une cuisine le soir. Fond graphite, texte crème, bois
// de chêne pour l'accent ; les bandes « claires » sont en lin. Fraunces pour les
// titres, Manrope pour le texte. Mise en page inspirée du modèle « Interior Features »
// de MotionSites — salle sombre, cartes à annotations, plan à l'échelle —, transposée
// à un cuisiniste.
export default function JusquAuCafeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Jusqu'au Café"
      titres="fraunces"
      texte="manrope"
      couleurs={{
        fond: "#171512",
        encre: "#F2ECE2",
        doux: "#B8AE9F",
        accent: "#D9A35B",
        surAccent: "#171512",
        accentTexte: "#E3B474",
        carte: "#221F1B",
        trait: "#3B362F",
        sombre: "#EDE5D8",
        surSombre: "#171512",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
