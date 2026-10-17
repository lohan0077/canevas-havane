import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Rayon Frais, cabinet de diététique imaginé dans la vidéo « Si je
// devais créer un cabinet de diététique de zéro ». Zilla Slab pour la machine à écrire
// de la marque (chiffres alignés sur les prix), Space Grotesk pour lire ; vert, tomate,
// jaune et crème, comme un étiquetage de marché.
export default function RayonFraisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Rayon Frais"
      titres="zilla"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#FFF7E6",
        encre: "#1F3B24",
        doux: "#55604F",
        accent: "#C2402A",
        surAccent: "#FFFFFF",
        accentTexte: "#A8321E",
        carte: "#FFFFFF",
        trait: "#EADFC8",
        sombre: "#234F2B",
        surSombre: "#FFF7E6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
