import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une entreprise de location de
// tentes de zéro ». Mise en page inspirée du modèle « Camper Overnight » de MotionSites
// (un paysage en plein écran, un grand titre à empattements, un bouton chaud), transposée
// à un pré au soleil couchant et à un loueur de tentes. Le `noindex` vient du layout de
// /exemples.
export default function PignonSurPreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pignon sur Pré"
      titres="newsreader"
      texte="dmSans"
      couleurs={{
        fond: "#FBF7EE",
        encre: "#22311B",
        doux: "#4F5A45",
        accent: "#B04E2F",
        surAccent: "#FFFFFF",
        accentTexte: "#A4442A",
        carte: "#FFFFFF",
        trait: "#DCD6C4",
        sombre: "#2F4A22",
        surSombre: "#FBF7EE",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
