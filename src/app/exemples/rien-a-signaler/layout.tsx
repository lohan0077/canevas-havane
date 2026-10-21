import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Rien à Signaler : la palette de la marque — bleu nuit, crème, vert
// sauge, or —, Bricolage Grotesque pour les titres (le Futura de la vidéo, en plus
// chaleureux), DM Sans pour le texte. Mise en page inspirée du modèle « Northstar » de
// MotionSites — un grand paysage calme sous un titre court —, transposée à une marque
// d'alarmes qui ne vend pas la peur.
export default function RienASignalerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Rien à Signaler"
      titres="bricolage"
      texte="dmSans"
      couleurs={{
        fond: "#F3EBDD",
        encre: "#14213D",
        doux: "#4C5468",
        accent: "#7FB685",
        surAccent: "#14213D",
        accentTexte: "#2E6B45",
        carte: "#FBF7F0",
        trait: "#E2D7C4",
        sombre: "#14213D",
        surSombre: "#F3EBDD",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
