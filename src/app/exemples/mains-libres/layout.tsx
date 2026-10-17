import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Mains Libres : un atelier la nuit, graphite et orange de sécurité ;
// Space Grotesk pour les titres, Figtree pour le texte. Le `noindex` vient de /exemples.
export default function MainsLibresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Mains Libres"
      titres="spaceGrotesk"
      texte="figtree"
      couleurs={{
        fond: "#111316",
        encre: "#EEECE7",
        doux: "#A9AEB4",
        accent: "#FF7A30",
        surAccent: "#111316",
        accentTexte: "#FF9257",
        carte: "#1B1E22",
        trait: "#30353B",
        sombre: "#EEECE7",
        surSombre: "#111316",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
