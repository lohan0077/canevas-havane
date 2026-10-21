import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une entreprise de déménagement ».
// Premier écran inspiré du modèle « Camper Overnight » de MotionSites (une nuit bleue, une
// lune, un grand titre à empattements et un bouton orange), transposé à un immeuble où
// l'on dort pour la première fois. Le `noindex` vient du layout de /exemples.
export default function PremierSoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Premier Soir"
      titres="dmSerif"
      texte="figtree"
      couleurs={{
        fond: "#F6EBD9",
        encre: "#1D2B4F",
        doux: "#4F5873",
        accent: "#F28C28",
        surAccent: "#1D2B4F",
        accentTexte: "#A84F0A",
        carte: "#FFF8EE",
        trait: "#E2CFB0",
        sombre: "#1D2B4F",
        surSombre: "#F6EBD9",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
