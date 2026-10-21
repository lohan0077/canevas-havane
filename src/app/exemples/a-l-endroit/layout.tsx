import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// À l'Endroit : marine, ivoire et corail, en Bodoni. Premier écran inspiré du modèle
// « Orla Fashion » de MotionSites (le nom en très grand, un court texte, les liens en
// petit), transposé : ici, le nom a son reflet.
export default function ALEndroitLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="À l'Endroit"
      titres="bodoni"
      texte="dmSans"
      couleurs={{
        fond: "#FAF7F2",
        encre: "#1D2B3A",
        doux: "#5A6573",
        accent: "#1D2B3A",
        surAccent: "#FAF7F2",
        accentTexte: "#B5442B",
        carte: "#FFFFFF",
        trait: "#DCD8D0",
        sombre: "#1D2B3A",
        surSombre: "#FAF7F2",
      }}
    >
      <EnTete />
      {children}
      <PiedDePage />
    </Cadre>
  );
}
