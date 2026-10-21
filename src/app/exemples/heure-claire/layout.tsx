import Cadre from "../_kit/Cadre";
import EnTete, { BarreDuDelai } from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Heure Claire, cabinet d'expertise comptable fictif de la vidéo « Si je devais remplir
// l'agenda d'un expert-comptable ». Mise en page réglée comme un registre (filets,
// cases), transposée du modèle « Data Relay » de MotionSites. Vouvoiement et retenue
// (décret n° 2012-432, art. 152). Le `noindex` vient du layout de /exemples.
export default function HeureClaireLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Heure Claire"
      titres="newsreader"
      texte="archivo"
      couleurs={{
        fond: "#F6F5F1",
        encre: "#141B24",
        doux: "#4A5361",
        accent: "#F2D049",
        surAccent: "#141B24",
        accentTexte: "#1D5C6B",
        carte: "#FFFFFF",
        trait: "#D9D6CE",
        sombre: "#141B24",
        surSombre: "#F6F5F1",
      }}
    >
      <BarreDuDelai />
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
