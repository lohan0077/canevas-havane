import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Moins le Quart, la marque de café imaginaire des deux vidéos des
// torréfacteurs. Sora, géométrique et fine comme un cadran (la Futura de la marque),
// pour les titres et les heures ; Lora pour lire, et pour l'italique. Crème, espresso,
// caramel, et le bleu de la nuit. Chaque page s'ouvre sur un écran sombre : l'en-tête
// flottant part en clair.
export default function MoinsLeQuartLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Moins le Quart"
      titres="sora"
      texte="lora"
      couleurs={{
        fond: "#F2E3C9",
        encre: "#2B1B12",
        doux: "#6B5340",
        accent: "#C8742F",
        surAccent: "#2B1B12",
        accentTexte: "#8A4A16",
        carte: "#FBF4E7",
        trait: "#E2CFAE",
        sombre: "#2B1B12",
        surSombre: "#F2E3C9",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#cafetiere`, libelle: "Ta cafetière" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
