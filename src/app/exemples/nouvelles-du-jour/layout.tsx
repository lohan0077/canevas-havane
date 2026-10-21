import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Nouvelles du Jour : la sauge de la vidéo (assombrie pour porter du
// texte blanc), une crème de linge propre, Fraunces pour les titres, Figtree pour le
// texte. Mise en page transposée du modèle « Mindful Companion » de MotionSites :
// un ciel doux, un titre centré, et le téléphone au milieu de l'écran — ici, celui qui
// reçoit le texto de 18 h.
export default function NouvellesDuJourLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Nouvelles du Jour"
      titres="fraunces"
      texte="figtree"
      couleurs={{
        fond: "#F4F1EA",
        encre: "#1F2D27",
        doux: "#52615A",
        accent: "#4A6E5A",
        surAccent: "#FFFFFF",
        accentTexte: "#3F6150",
        carte: "#FFFFFF",
        trait: "#DCE3DA",
        sombre: "#24362D",
        surSombre: "#F4F1EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
