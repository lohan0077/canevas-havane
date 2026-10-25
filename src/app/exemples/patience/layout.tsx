import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Patience, la fromagerie imaginaire des deux vidéos des fromagers.
// Playfair Display, une didone comme l'affiche de la marque, pour les titres ; DM Sans
// pour lire. La pénombre de la cave, l'or de la croûte, la crème de la pâte. Chaque
// page s'ouvre sur la cave, sombre : l'en-tête flottant part en clair.
export default function PatienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Patience"
      titres="playfair"
      texte="dmSans"
      couleurs={{
        fond: "#F4ECD8",
        encre: "#2A1E15",
        doux: "#5C4A38",
        accent: "#D9A441",
        surAccent: "#2A1E15",
        accentTexte: "#7A5410",
        carte: "#FBF6EA",
        trait: "#DCCCAA",
        sombre: "#1C140E",
        surSombre: "#F4ECD8",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#plateau`, libelle: "Composer un plateau" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
