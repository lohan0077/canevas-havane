import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le Soir Même, agence immobilière fictive de la vidéo « Si je devais remplir l'agenda
// d'un agent immobilier ». Une maison au crépuscule, une barre en pilule de verre sombre
// et un très grand titre : transposé du modèle « Sky Estate » de MotionSites, sans texte
// ni code repris. Le `noindex` vient du layout de /exemples.
export default function LeSoirMemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Soir Même"
      titres="instrument"
      texte="dmSans"
      couleurs={{
        fond: "#F5F1EA",
        encre: "#1C1F33",
        doux: "#4F5470",
        accent: "#E9A23B",
        surAccent: "#1C1F33",
        accentTexte: "#8A4B0B",
        carte: "#FFFFFF",
        trait: "#DCD5C8",
        sombre: "#1B1E3A",
        surSombre: "#F3EEE4",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
