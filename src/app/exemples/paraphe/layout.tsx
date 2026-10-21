import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site de la librairie imaginée dans la vidéo « Si je devais créer une librairie de
// zéro » : pas de rayons, des envies ; pour chaque envie, un livre lu et paraphé, avec
// le mot de celui qui l'a lu. Inspiration : le modèle « Heritage Grove » de MotionSites
// (papier crème, dessin à l'encre, nom en serif, pied de page en colonnes), transposé
// sur l'encre brune, la rouille et le bleu d'une plume.
// Le `noindex` vient du layout de /exemples.
export default function ParapheLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Paraphe"
      titres="newsreader"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#EFE4CC",
        encre: "#2C1E16",
        doux: "#5E4B3E",
        accent: "#B04A15",
        surAccent: "#FFFFFF",
        accentTexte: "#9A3F12",
        carte: "#F7F0E0",
        trait: "#D5C6A6",
        sombre: "#23412F",
        surSombre: "#EFE4CC",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
