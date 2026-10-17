import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un photographe ».
// Mise en page inspirée du modèle « Orla Fashion » de MotionSites (grand nom en deux
// voix, beaucoup d'air, une seule grande image) et transposée à une photographe de
// famille. Le `noindex` vient du layout de /exemples.
export default function MinuteQuaranteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Minute Quarante"
      titres="fraunces"
      texte="figtree"
      couleurs={{
        fond: "#F4EEE6",
        encre: "#1F1A17",
        doux: "#5E544C",
        accent: "#B4471F",
        surAccent: "#FFFFFF",
        accentTexte: "#A8401D",
        carte: "#FBF8F3",
        trait: "#DCD2C4",
        sombre: "#1F1A17",
        surSombre: "#F4EEE6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
