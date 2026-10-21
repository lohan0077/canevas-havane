import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// Chaise Pleine : ardoise, papier et orange, titres en Archivo très gras. Premier
// écran inspiré du modèle « Data Signal » de MotionSites (fond sombre, gros titre,
// un seul chiffre qui compte), transposé au dirigeant : sa chaise vide, en heures.
export default function ChaisePleineLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Chaise Pleine"
      titres="archivo"
      texte="inter"
      couleurs={{
        fond: "#F4F1EA",
        encre: "#1E2A33",
        doux: "#56636D",
        accent: "#C2451E",
        surAccent: "#FFFFFF",
        accentTexte: "#B23F1A",
        carte: "#FFFFFF",
        trait: "#DAD4C8",
        sombre: "#2A343D",
        surSombre: "#F4F1EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDePage />
    </Cadre>
  );
}
