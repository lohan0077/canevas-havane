import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit d'« Et s'il pleut » : l'ivoire, l'ardoise d'un ciel couvert et le jaune
// d'un parapluie. Bodoni Moda pour les titres (le Didot de la marque, dans la vidéo),
// Outfit pour le texte.
export default function EtSilPleutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Et s'il pleut"
      titres="bodoni"
      texte="outfit"
      couleurs={{
        fond: "#FBF6EC",
        encre: "#2F3B4C",
        doux: "#56616F",
        accent: "#F2C230",
        surAccent: "#2F3B4C",
        accentTexte: "#7A5A00",
        carte: "#FFFFFF",
        trait: "#E3DCCB",
        sombre: "#2F3B4C",
        surSombre: "#FBF6EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
