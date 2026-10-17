import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Le Pourquoi, cabinet d'ostéopathie imaginé dans la vidéo « Si je
// devais créer un cabinet d'ostéopathie de zéro ». Polices : Outfit (géométrique, la
// cousine libre de la Futura de la marque) et Newsreader pour lire.
export default function LePourquoiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Pourquoi"
      titres="outfit"
      texte="newsreader"
      couleurs={{
        fond: "#F3EBDD",
        encre: "#1E3A34",
        doux: "#4A5E57",
        accent: "#E07A4B",
        surAccent: "#14261F",
        accentTexte: "#9C4420",
        carte: "#FBF6EE",
        trait: "#DCCFBC",
        sombre: "#1E3A34",
        surSombre: "#F3EBDD",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
