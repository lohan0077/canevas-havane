import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Atelier Samedi, agence d'architecture fictive de la vidéo « Si je devais remplir
// l'agenda d'un architecte ». Papier calque, bleu de plan, points d'annotation jaunes :
// transposé du modèle « Veyra Electric » de MotionSites. Le `noindex` vient du layout
// de /exemples.
export default function AtelierSamediLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Atelier Samedi"
      titres="spaceGrotesk"
      texte="workSans"
      couleurs={{
        fond: "#ECEFF3",
        encre: "#16202C",
        doux: "#47546A",
        accent: "#E4F25B",
        surAccent: "#16202C",
        accentTexte: "#2A4B8D",
        carte: "#FFFFFF",
        trait: "#C7D0DC",
        sombre: "#1C2B44",
        surSombre: "#EEF2F7",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
