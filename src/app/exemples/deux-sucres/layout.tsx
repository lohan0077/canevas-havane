import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Deux Sucres : la palette de la marque dans la vidéo (café #5A3E2B,
// rose terre, sauge, lait #F6EDE0), Lora pour les titres (au lieu du Cochin de la
// vidéo), Manrope pour le texte. Mise en page transposée du modèle « Mindora » de
// MotionSites : un grand panneau clair, un portrait rond au-dessus d'un titre centré,
// trois petites cartes en dessous.
export default function DeuxSucresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Deux Sucres"
      titres="lora"
      texte="manrope"
      couleurs={{
        fond: "#F6EDE0",
        encre: "#3B2A1E",
        doux: "#6A5446",
        accent: "#5A3E2B",
        surAccent: "#F6EDE0",
        accentTexte: "#954A31",
        carte: "#FFFBF4",
        trait: "#E6D7C3",
        sombre: "#3B2A1E",
        surSombre: "#F6EDE0",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
