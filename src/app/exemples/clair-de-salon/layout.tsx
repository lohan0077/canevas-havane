import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de cours
// de piano ». Mise en page inspirée du modèle « Luxury Hero » de MotionSites (une image
// pleine page, un monogramme au centre, la phrase en grand en bas), transposée en
// programme de concert sur papier ivoire. Le `noindex` vient du layout de /exemples.
export default function ClairDeSalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Clair de Salon"
      titres="bodoni"
      texte="manrope"
      couleurs={{
        fond: "#F6F0E1",
        encre: "#1E2A44",
        doux: "#5B6275",
        accent: "#8C3B3B",
        surAccent: "#FFFFFF",
        accentTexte: "#8C3B3B",
        carte: "#FFFCF5",
        trait: "#E3D8BF",
        sombre: "#1E2A44",
        surSombre: "#F6F0E1",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
