import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Sans Soupir : la crème, l'ardoise et le jaune de la marque, et de
// gros caractères partout (le texte courant est en 18 px). Sora pour les titres,
// Figtree pour le texte, deux sans-serif très lisibles.
export default function SansSoupirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sans Soupir"
      titres="sora"
      texte="figtree"
      couleurs={{
        fond: "#FDF6EC",
        encre: "#22323D",
        doux: "#4A5A66",
        accent: "#F6AE2D",
        surAccent: "#22323D",
        accentTexte: "#8A5A00",
        carte: "#FFFFFF",
        trait: "#EADFCC",
        sombre: "#2F4858",
        surSombre: "#FDF6EC",
      }}
    >
      <div className="text-[18px]">
        <EnTete />
        {children}
        <PiedDuSite />
      </div>
    </Cadre>
  );
}
