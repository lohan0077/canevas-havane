import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site du magasin imaginé dans la vidéo « Si je devais créer un magasin de vélos de
// zéro » : pas de catalogue, une seule question (« t'as pas pédalé depuis combien de
// temps ? ») et une première heure sur le parking. Inspiration : le modèle « Playful
// Idea » de MotionSites (formes douces, petits textes dans les coins, nom au centre,
// illustration ronde), transposé sur les couleurs de la marque.
// Le `noindex` vient du layout de /exemples.
export default function TourDuQuartierLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tour du Quartier"
      titres="bricolage"
      texte="figtree"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#1F3A2C",
        doux: "#4C5B52",
        accent: "#2E6B4F",
        surAccent: "#FFF8EC",
        accentTexte: "#B23A22",
        carte: "#FFFFFF",
        trait: "#EADFC8",
        sombre: "#24573F",
        surSombre: "#FFF8EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
