import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// De A à G, cabinet de diagnostic immobilier fictif de la vidéo « Si je devais remplir
// l'agenda d'un diagnostiqueur immobilier ». Des tuiles claires aux coins ronds, des
// teintes pastel, les sept couleurs de l'étiquette en fil rouge : transposé du modèle
// « Task Engine » de MotionSites, sans texte ni code repris. Le `noindex` vient du
// layout de /exemples.
export default function DeAaGLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="De A à G"
      titres="bricolage"
      texte="figtree"
      couleurs={{
        fond: "#F3F5F1",
        encre: "#14231C",
        doux: "#4A5A52",
        accent: "#0E7C3A",
        surAccent: "#FFFFFF",
        accentTexte: "#0B6B32",
        carte: "#FFFFFF",
        trait: "#DCE3DD",
        sombre: "#10241B",
        surSombre: "#EEF5EF",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
