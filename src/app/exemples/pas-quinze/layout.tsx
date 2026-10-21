import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site Pas Quinze : Unbounded pour les titres, Manrope pour le texte.
// Aplats francs — orange brûlé, noir torréfié, crème — comme une affiche.
// Le `noindex` vient du layout de /exemples.
export default function PasQuinzeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pas Quinze"
      titres="unbounded"
      texte="manrope"
      couleurs={{
        fond: "#FBF6EE",
        encre: "#1A1410",
        doux: "#6B5D52",
        accent: "#F26B3A",
        surAccent: "#1A1410",
        accentTexte: "#A63A16",
        carte: "#FFFFFF",
        trait: "#E8DCCB",
        sombre: "#1A1410",
        surSombre: "#FBF6EE",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
