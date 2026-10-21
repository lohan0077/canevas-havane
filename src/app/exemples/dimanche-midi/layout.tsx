import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Dimanche Midi, cabinet de gestion de patrimoine fictif de la vidéo « Si je devais créer un
// cabinet de gestion de patrimoine de zéro ». Les couleurs de la marque (vert, terre cuite,
// moutarde, crème) ; l'esprit transposé du modèle « Heritage Grove » de MotionSites (fond
// crème, grande gravure monochrome façon toile de Jouy, logo à emblème rond, encre d'une
// seule couleur), sans texte ni code repris : ici, la gravure est une table de famille, et
// l'emblème un cadran qui marque midi. Caveat sert à l'écriture du carnet. Le `noindex`
// vient du layout de /exemples.
export default function DimancheMidiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Dimanche Midi"
      titres="lora"
      texte="outfit"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF5EA",
        encre: "#22382C",
        doux: "#55604F",
        accent: "#2F4A3A",
        surAccent: "#FBF5EA",
        accentTexte: "#A3442E",
        carte: "#FFFDF8",
        trait: "#E6DCC6",
        sombre: "#2F4A3A",
        surSombre: "#FBF5EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
