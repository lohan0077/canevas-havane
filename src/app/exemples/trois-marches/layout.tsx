import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Trois Marches, agence immobilière fictive de la vidéo « Si je devais créer une agence
// immobilière de zéro ». Papier crème, gravure au trait, Bodoni et petites capitales :
// transposé du modèle « Heritage Grove » de MotionSites, sans texte ni code repris.
// Le `noindex` vient du layout de /exemples.
export default function TroisMarchesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Trois Marches"
      titres="bodoni"
      texte="manrope"
      autres={["caveat"]}
      couleurs={{
        fond: "#F7F2E8",
        encre: "#3E3A36",
        doux: "#665D55",
        accent: "#B4532C",
        surAccent: "#FFFFFF",
        accentTexte: "#A04A26",
        carte: "#FFFDF8",
        trait: "#E2D8C6",
        sombre: "#3E3A36",
        surSombre: "#F7F2E8",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
