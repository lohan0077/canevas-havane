import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un studio photo ».
// Mise en page inspirée du modèle « Neo Museum » de MotionSites (grand titre, cartels
// numérotés, annotations fines autour de l'objet), transposée à un studio qui vend des
// tirages plutôt que des fichiers. Le `noindex` vient du layout de /exemples.
export default function PourPlusTardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pour Plus Tard"
      titres="newsreader"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F3EBDD",
        encre: "#3B2F2A",
        doux: "#6B5A4E",
        accent: "#8C3B2E",
        surAccent: "#F3EBDD",
        accentTexte: "#8C3B2E",
        carte: "#FAF5EC",
        trait: "#D8C8AE",
        sombre: "#3B2F2A",
        surSombre: "#F3EBDD",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
