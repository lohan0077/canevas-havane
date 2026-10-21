import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// créatrice de bijoux » : chaque pièce a sa page et son numéro, sa page reste quand
// elle est partie, et la sortie du vendredi 18 h. Inspiration : le modèle « Fine
// Jewelry Shop » de MotionSites (numéro entre crochets, panneau coloré, fiche produit
// au bouton carré), transposé sur un velours bordeaux et du lin.
// Le `noindex` vient du layout de /exemples.
export default function JamaisDeuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Jamais Deux"
      titres="instrument"
      texte="archivo"
      couleurs={{
        fond: "#F3ECE3",
        encre: "#1F1416",
        doux: "#5E4D4F",
        accent: "#6E1E2E",
        surAccent: "#F8EFE6",
        accentTexte: "#8A2236",
        carte: "#FBF7F1",
        trait: "#D9CBBE",
        sombre: "#2A0E15",
        surSombre: "#F3E6DA",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
