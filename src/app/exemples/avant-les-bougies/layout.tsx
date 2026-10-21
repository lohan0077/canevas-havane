import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site de la pâtisserie imaginée dans la vidéo « Si je devais remplir le carnet de
// commandes d'un pâtissier » : « vous serez combien ? », le samedi plafonné, le rappel
// de l'an prochain. Ambiance transposée du modèle « Sky Cookie » de MotionSites : un
// ciel, un titre énorme et gras, le gâteau qui flotte, une barre en pilule.
export default function AvantLesBougiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Avant les Bougies"
      titres="bricolage"
      texte="figtree"
      couleurs={{
        fond: "#FFF4EE",
        encre: "#3B1A12",
        doux: "#7A4A3C",
        accent: "#C42D47",
        surAccent: "#FFFFFF",
        accentTexte: "#B0263E",
        carte: "#FFFFFF",
        trait: "#F2D6CC",
        sombre: "#3B1A12",
        surSombre: "#FFF4EE",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
