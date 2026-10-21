import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de bijoux » :
// chaque bijou est gravé d'un numéro, ce numéro a sa page, le premier nom est le tien,
// et en dessous une ligne vide. Inspiration : le modèle « Ancient Oath » de MotionSites
// (un titre immense à fort contraste, coupé par un objet d'or), transposé sur le vert
// de l'écrin et l'ivoire.
// Le `noindex` vient du layout de /exemples.
export default function ALaProchaineLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="À la Prochaine"
      titres="bodoni"
      texte="manrope"
      couleurs={{
        fond: "#F3EDE2",
        encre: "#1E3A33",
        doux: "#4F5F58",
        accent: "#1E3A33",
        surAccent: "#F3EDE2",
        accentTexte: "#7A5A1E",
        carte: "#FAF6EE",
        trait: "#D8CCB5",
        sombre: "#152B26",
        surSombre: "#F3EDE2",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
