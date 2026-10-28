import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site de la marque imaginée dans la vidéo « Si je devais créer un cabinet de
// coaching ». Mise en page inspirée du modèle « Camper Overnight » de MotionSites (nuit
// bleue, une lueur chaude au centre, un grand titre à empattements), transposée à un
// cabinet qui vend trois heures pour une question. Le `noindex` vient de /exemples.
export default function DimancheSoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Dimanche Soir"
      titres="instrument"
      texte="outfit"
      couleurs={{
        fond: "#1E2A44",
        encre: "#F4EFE6",
        doux: "#C9C3B5",
        accent: "#F2C14E",
        surAccent: "#1E2A44",
        accentTexte: "#F2C14E",
        carte: "#26344F",
        trait: "#3A4A68",
        sombre: "#141C2E",
        surSombre: "#F4EFE6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
