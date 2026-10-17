import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Capot Ouvert : le jaune signal de la marque, le graphite, le rouge ;
// Zilla Slab pour les titres (l'égyptienne Rockwell de la vidéo), Work Sans pour le texte.
export default function CapotOuvertLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Capot Ouvert"
      titres="zilla"
      texte="workSans"
      couleurs={{
        fond: "#F2C230",
        encre: "#23262B",
        doux: "#45412F",
        accent: "#C8372D",
        surAccent: "#FFFFFF",
        accentTexte: "#8E2A21",
        carte: "#FFFFFF",
        trait: "#23262B",
        sombre: "#23262B",
        surSombre: "#FFFFFF",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
