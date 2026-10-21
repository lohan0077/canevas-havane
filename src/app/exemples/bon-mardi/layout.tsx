import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de réservations d'un
// déménageur ». Premier écran inspiré du modèle « Daisy Sweet » de MotionSites (un aplat
// de couleur et sa carte-produit, l'image à côté), transposé en billet de train. Le
// `noindex` vient du layout de /exemples.
export default function BonMardiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Bon Mardi"
      titres="bricolage"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F4F1EA",
        encre: "#14213D",
        doux: "#4B5563",
        accent: "#FFCF33",
        surAccent: "#14213D",
        accentTexte: "#1F3BB3",
        carte: "#FFFFFF",
        trait: "#D9D3C4",
        sombre: "#1F3BB3",
        surSombre: "#FFFFFF",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
