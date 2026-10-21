import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site Moins le Quart : Outfit, géométrique comme un cadran, pour les
// titres ; Lora pour le texte. Crème, espresso, caramel, et le bleu de la nuit.
// Le `noindex` vient du layout de /exemples.
export default function MoinsLeQuartLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Moins le Quart"
      titres="outfit"
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
        sombre: "#26384A",
        surSombre: "#F2E3C9",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
