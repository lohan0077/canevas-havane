import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Belle Portée : la palette de la marque dans la vidéo (encre #1E2A38,
// brique, jaune #F2B134, plâtre #F3EEE4), Outfit en capitales pour les titres (le
// Futura de la vidéo), DM Sans pour le texte. Mise en page transposée du modèle
// « BuildShield » de MotionSites : un aplat ocre, des filets fins qui encadrent tout,
// le titre en capitales à gauche, la photo de chantier dans son cadre à droite.
export default function BellePorteeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Belle Portée"
      titres="outfit"
      texte="dmSans"
      couleurs={{
        fond: "#F3EEE4",
        encre: "#1E2A38",
        doux: "#4D5866",
        accent: "#F2B134",
        surAccent: "#1E2A38",
        accentTexte: "#A63F2A",
        carte: "#FBF8F2",
        trait: "#D9D0BF",
        sombre: "#1E2A38",
        surSombre: "#F3EEE4",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
