import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de La Bonne Limite : le vert du site de la vidéo (#4F7A43, assombri pour
// le texte), le blanc cassé d'un plan, l'orange des bornes en touche. Space Grotesk
// pour les titres (le trait d'un instrument de mesure), Inter pour le texte. Mise en
// page transposée du modèle « TerraVision » de MotionSites : titre centré sur fond
// clair, puis une photo pleine largeur et des cartes de verre posées dessus.
// Un ton modéré, sans superlatif : la publicité d'un géomètre-expert doit rester une
// information sur son activité (décret n° 96-478, art. 53).
export default function LaBonneLimiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="La Bonne Limite"
      titres="spaceGrotesk"
      texte="inter"
      couleurs={{
        fond: "#F7F6F1",
        encre: "#1F2A1C",
        doux: "#55604F",
        accent: "#3F6B35",
        surAccent: "#FFFFFF",
        accentTexte: "#3A6331",
        carte: "#FFFFFF",
        trait: "#DDE2D3",
        sombre: "#1F3A1A",
        surSombre: "#F7F6F1",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
