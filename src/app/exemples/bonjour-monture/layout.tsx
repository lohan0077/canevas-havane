import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// Bonjour Monture : un opticien de quartier, en papier crème et encre bleu pétrole.
// Mise en page inspirée du modèle « Editorial Eyewear » de MotionSites (titres en
// phrase, mot clé en italique, petites capitales en colonnes), transposée.
export default function BonjourMontureLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Bonjour Monture"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#F6F1EA",
        encre: "#1C2A30",
        doux: "#55636A",
        accent: "#2E5A6B",
        surAccent: "#FFFFFF",
        accentTexte: "#2E5A6B",
        carte: "#FFFFFF",
        trait: "#DDD3C6",
        sombre: "#1C2A30",
        surSombre: "#F6F1EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDePage />
    </Cadre>
  );
}
