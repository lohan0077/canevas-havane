import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un prof particulier ».
// Mise en page inspirée du modèle « Playful Idea » de MotionSites (le nom au centre de
// la barre, une ligne à gauche, un objet central qu'on manipule), transposée à une page
// de cahier à grands carreaux. Le `noindex` vient du layout de /exemples.
export default function LeBonChapitreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Bon Chapitre"
      titres="youngSerif"
      texte="archivo"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF8F1",
        encre: "#1F2A24",
        doux: "#55605A",
        accent: "#C2412D",
        surAccent: "#FFFFFF",
        accentTexte: "#B23A27",
        carte: "#FFFFFF",
        trait: "#D9DEE8",
        sombre: "#2F4A3A",
        surSombre: "#FBF8F1",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
