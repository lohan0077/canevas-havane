import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// Première Bougie : bleu nuit, jaune bougie, corail et crème, en Fraunces. Premier
// écran inspiré du modèle « Gold Standard » de MotionSites (le nom en lettres géantes
// sur toute la largeur, de petites colonnes de texte), transposé : une bougie entre
// les deux mots.
export default function PremiereBougieLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Première Bougie"
      titres="fraunces"
      texte="outfit"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#22223B",
        doux: "#5B5B70",
        accent: "#22223B",
        surAccent: "#FFF8EC",
        accentTexte: "#B3432B",
        carte: "#FFFFFF",
        trait: "#EADFCB",
        sombre: "#22223B",
        surSombre: "#FFF8EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDePage />
    </Cadre>
  );
}
