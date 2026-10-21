import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site Patience : Playfair Display, une didone comme sur l'affiche,
// pour les titres ; DM Sans pour le texte. La pénombre de la cave, l'or de la croûte,
// la crème de la pâte. Le `noindex` vient du layout de /exemples.
export default function PatienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Patience"
      titres="playfair"
      texte="dmSans"
      couleurs={{
        fond: "#2A1E15",
        encre: "#F4ECD8",
        doux: "#CDBFA4",
        accent: "#D9A441",
        surAccent: "#2A1E15",
        accentTexte: "#E3B85C",
        carte: "#3B2A1E",
        trait: "#5A4636",
        sombre: "#1C140E",
        surSombre: "#F4ECD8",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
