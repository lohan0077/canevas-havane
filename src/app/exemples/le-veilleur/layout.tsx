import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le Veilleur, conciergerie fictive de la vidéo « Si je devais remplir le carnet de
// logements d'une conciergerie ». Un lin clair, le bleu de la nuit et le laiton des clés ;
// mise en page transposée du modèle « Mostar Guide » de MotionSites (un grand cadre
// photo arrondi, un mot immense en capitales à empattements, des pastilles dessous),
// sans texte ni code repris. La carte professionnelle passe avant les photos.
// Le `noindex` vient du layout de /exemples.
export default function LeVeilleurLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Veilleur"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#F1ECE2",
        encre: "#162132",
        doux: "#4F5A6B",
        accent: "#C99A4A",
        surAccent: "#162132",
        accentTexte: "#875A17",
        carte: "#FBF8F2",
        trait: "#D8CFBF",
        sombre: "#162132",
        surSombre: "#F1ECE2",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
