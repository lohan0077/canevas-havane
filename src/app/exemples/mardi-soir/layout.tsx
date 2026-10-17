import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Mardi Soir, cabinet de diététique imaginé dans la vidéo « Si je
// devais remplir l'agenda d'une diététicienne ». Vert bouteille, crème et jaune de la
// lumière du frigo ; Young Serif pour les titres (chiffres alignés sur les prix et les
// heures), DM Sans pour lire.
export default function MardiSoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Mardi Soir"
      titres="youngSerif"
      texte="dmSans"
      couleurs={{
        fond: "#FBF4E6",
        encre: "#173B33",
        doux: "#4D5F58",
        accent: "#F2C14E",
        surAccent: "#173B33",
        accentTexte: "#7A4E00",
        carte: "#FFFFFF",
        trait: "#E9DDC5",
        sombre: "#173B33",
        surSombre: "#FBF4E6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
