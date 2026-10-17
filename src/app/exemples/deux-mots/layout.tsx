import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site du fleuriste imaginé dans la vidéo « Si je devais remplir le carnet de
// commandes d'un fleuriste » : une question, le bouquet et la phrase sur la carte,
// l'heure limite écrite en gros. Ambiance transposée du modèle « Luxury Botanical »
// de MotionSites : lumière chaude, romain et italique mêlés, boutons en pilule.
export default function DeuxMotsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Deux Mots"
      titres="playfair"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF1EA",
        encre: "#3A0E1C",
        doux: "#73404C",
        accent: "#7A1E3A",
        surAccent: "#FFF7F2",
        accentTexte: "#7A1E3A",
        carte: "#FFFFFF",
        trait: "#EBD3CB",
        sombre: "#3A0E1C",
        surSombre: "#FBEFEA",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
