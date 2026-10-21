import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Tel Quel, conciergerie fictive de la vidéo « Si je devais créer une conciergerie de
// zéro ». Les couleurs de la marque (vert sapin, laiton, terre cuite, crème) ; mise en
// page transposée du modèle « Interior Features » de MotionSites (grandes cartes photo
// arrondies, notes épinglées sur les pièces, pastilles rondes), passé du sombre au
// clair, sans texte ni code repris. La carte professionnelle est sur chaque page.
// Le `noindex` vient du layout de /exemples.
export default function TelQuelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tel Quel"
      titres="dmSerif"
      texte="workSans"
      couleurs={{
        fond: "#F6F1E7",
        encre: "#1F3A33",
        doux: "#4E5D57",
        accent: "#B0532D",
        surAccent: "#FFFFFF",
        accentTexte: "#A04A26",
        carte: "#FFFDF8",
        trait: "#E1D8C6",
        sombre: "#23413A",
        surSombre: "#F6F1E7",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
