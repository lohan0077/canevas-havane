import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de réservations d'un
// loueur de matériel ». Mise en page inspirée du modèle « BuildShield » de MotionSites
// (aplat ocre cadré d'un filet noir, capitales serrées, navigation en pilule, bouton
// noir), transposée à un loueur de mini-pelles pour particuliers. Le `noindex` vient
// du layout de /exemples.
export default function SamediChantierLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Samedi Chantier"
      titres="archivo"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F1ECE1",
        encre: "#15130F",
        doux: "#4A463E",
        accent: "#F2B21B",
        surAccent: "#15130F",
        accentTexte: "#7A4E00",
        carte: "#FFFFFF",
        trait: "#CFC7B6",
        sombre: "#15130F",
        surSombre: "#F1ECE1",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
